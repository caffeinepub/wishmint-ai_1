import Map "mo:core/Map";
import Array "mo:core/Array";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Runtime "mo:core/Runtime";
import Auth "authorization/access-control";
import UserApproval "user-approval/approval";
import MixinAuthorization "authorization/MixinAuthorization";
import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Migration "migration";

// Contains all state, needs with clause to initialize new field on upgrade.
(with migration = Migration.run)
actor {
  // Initialize access control state.
  let accessControlState = Auth.initState();
  include MixinAuthorization(accessControlState);
  include MixinStorage();

  // User approval state.
  let approvalState = UserApproval.initState(accessControlState);

  // User roles and approval.
  public shared ({ caller }) func upgradeRole(user : Principal, role : Auth.UserRole) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can upgrade roles");
    };
    Auth.assignRole(accessControlState, caller, user, role);
  };

  public shared ({ caller }) func requestApproval() : async () {
    UserApproval.requestApproval(approvalState, caller);
  };

  public shared ({ caller }) func setApproval(user : Principal, status : UserApproval.ApprovalStatus) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can set approval status");
    };
    UserApproval.setApproval(approvalState, user, status);
  };

  // User profiles
  type Profile = {
    name : Text;
    bio : Text;
    username : Text;
    category : ?Text;
  };

  let userProfiles = Map.empty<Principal, Profile>();

  public query ({ caller }) func getCallerUserProfile() : async ?Profile {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?Profile {
    if (caller != user and not Auth.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : Profile) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  public query ({ caller }) func getAllUserProfiles() : async [Profile] {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all profiles");
    };
    userProfiles.values().toArray();
  };

  public query ({ caller }) func isCallerApproved() : async Bool {
    Auth.hasPermission(accessControlState, caller, #admin) or UserApproval.isApproved(approvalState, caller);
  };

  public query ({ caller }) func listApprovals() : async [UserApproval.UserApprovalInfo] {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view approval status");
    };
    UserApproval.listApprovals(approvalState);
  };

  // Community Posts
  public type CommunityPost = {
    postId : Nat;
    author : Principal;
    authorProfile : Profile;
    content : Text;
    title : ?Text;
    tags : [Text];
    profileCategory : ?Text;
    professional : Bool;
    timestamp : Time.Time;
  };

  public type CreatePostRequest = {
    content : Text;
    title : ?Text;
    tags : [Text];
    profileCategory : ?Text;
    professional : Bool;
  };

  let posts = Map.empty<Nat, CommunityPost>();
  var postCounter = 0;

  public shared ({ caller }) func createPost(request : CreatePostRequest) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can create posts");
    };

    let authorProfile = switch (userProfiles.get(caller)) {
      case (?profile) { profile };
      case null {
        Runtime.trap("User profile not found. Please create a profile first.");
      };
    };

    postCounter += 1;
    let newPost : CommunityPost = {
      postId = postCounter;
      author = caller;
      authorProfile = authorProfile;
      content = request.content;
      title = request.title;
      tags = request.tags;
      profileCategory = request.profileCategory;
      professional = request.professional;
      timestamp = Time.now();
    };
    posts.add(postCounter, newPost);
  };

  public query ({ caller }) func getAllPosts() : async [CommunityPost] {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view posts");
    };
    posts.values().toArray();
  };

  public query ({ caller }) func getFollowingPosts() : async [CommunityPost] {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can view following posts");
    };
    [];
  };

  // Payment Request Functionality
  public type PaymentStatus = {
    #pending;
    #approved;
    #rejected;
  };

  public type Plan = {
    planId : Text;
    name : Text;
    price : Nat;
    validityDays : Nat;
    features : [Text];
  };

  public type UserPlan = {
    plan : Plan;
    purchaseDate : Time.Time;
    expiryDate : Time.Time;
    isActive : Bool;
  };

  public type PaymentRequest = {
    requestId : Nat;
    user : Principal;
    transactionId : Text;
    screenshot : ?Storage.ExternalBlob;
    status : PaymentStatus;
    timestamp : Time.Time;
    planId : Text;
  };

  public type PaymentRequestInput = {
    transactionId : Text;
    screenshot : ?Storage.ExternalBlob;
    planId : Text;
  };

  public type PaymentStatusUpdate = {
    requestId : Nat;
    newStatus : PaymentStatus;
  };

  let paymentRequests = Map.empty<Nat, PaymentRequest>();
  var nextRequestId = 1;

  public shared ({ caller }) func submitPaymentRequest(input : PaymentRequestInput) : async Nat {
    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can submit payment requests");
    };

    let requestId = nextRequestId;
    nextRequestId += 1;

    let newRequest : PaymentRequest = {
      requestId;
      user = caller;
      transactionId = input.transactionId;
      screenshot = input.screenshot;
      status = #pending;
      timestamp = Time.now();
      planId = input.planId;
    };

    paymentRequests.add(requestId, newRequest);
    requestId;
  };

  public query ({ caller }) func getAllPaymentRequests() : async [PaymentRequest] {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can view all payment requests");
    };

    paymentRequests.values().toArray();
  };

  public shared ({ caller }) func updatePaymentStatus(update : PaymentStatusUpdate) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update payment status");
    };

    switch (paymentRequests.get(update.requestId)) {
      case (null) {
        Runtime.trap("Payment request not found. Please check the request ID.");
      };
      case (?existingRequest) {
        if (existingRequest.status == update.newStatus) {
          Runtime.trap("Payment request already has the specified status. Please choose a different status.");
        };

        let updatedRequest : PaymentRequest = {
          existingRequest with
          status = update.newStatus;
        };
        paymentRequests.add(update.requestId, updatedRequest);
      };
    };
  };

  // Plan management
  public type PlanInput = {
    planId : Text;
    name : Text;
    price : Nat;
    validityDays : Nat;
    features : [Text];
  };

  public type PlanUpdateInput = {
    planId : Text;
    name : ?Text;
    price : ?Nat;
    validityDays : ?Nat;
    features : ?[Text];
  };

  let plans = Map.empty<Text, Plan>();

  public shared ({ caller }) func createPlan(input : PlanInput) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can create plans");
    };

    let newPlan : Plan = {
      planId = input.planId;
      name = input.name;
      price = input.price;
      validityDays = input.validityDays;
      features = input.features;
    };

    plans.add(input.planId, newPlan);
  };

  public shared ({ caller }) func updatePlan(input : PlanUpdateInput) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can update plans");
    };

    switch (plans.get(input.planId)) {
      case (null) {
        Runtime.trap("Plan not found. Please check the plan ID.");
      };
      case (?existingPlan) {
        let updatedPlan : Plan = {
          planId = existingPlan.planId;
          name = switch (input.name) {
            case (?newName) { newName };
            case null { existingPlan.name };
          };
          price = switch (input.price) {
            case (?newPrice) { newPrice };
            case null { existingPlan.price };
          };
          validityDays = switch (input.validityDays) {
            case (?newValidity) { newValidity };
            case null { existingPlan.validityDays };
          };
          features = switch (input.features) {
            case (?newFeatures) { newFeatures };
            case null { existingPlan.features };
          };
        };
        plans.add(input.planId, updatedPlan);
      };
    };
  };

  public query func getAllPlans() : async [Plan] {
    plans.values().toArray();
  };

  public query func getPlan(planId : Text) : async ?Plan {
    plans.get(planId);
  };

  // User Plan activation & UPI auto-approval
  let userPlans = Map.empty<Principal, UserPlan>();

  public shared ({ caller }) func activateUserPlan(user : Principal, planId : Text) : async () {
    if (not (Auth.hasPermission(accessControlState, caller, #admin))) {
      Runtime.trap("Unauthorized: Only admins can activate plans");
    };
    switch (plans.get(planId)) {
      case (null) {
        Runtime.trap("Plan not found. Please check the plan ID.");
      };
      case (?plan) {
        let now = Time.now();
        assert(plan.validityDays != 0);
        let expiry = now + plan.validityDays * 24 * 60 * 60 * 1_000_000_000;
        let userPlan : UserPlan = {
          plan;
          purchaseDate = now;
          expiryDate = expiry;
          isActive = true;
        };
        userPlans.add(user, userPlan);
      };
    };
  };

  public query ({ caller }) func getUserPlan(user : Principal) : async ?UserPlan {
    if (caller != user and not Auth.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own plan");
    };
    userPlans.get(user);
  };

  public shared ({ caller }) func upiAutoApprove(user : Principal, planId : Text) : async () {
    if (caller != user) {
      Runtime.trap("Unauthorized: Can only auto-approve your own plan");
    };

    if (not (Auth.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can auto-approve plans");
    };

    switch (plans.get(planId)) {
      case (null) {
        Runtime.trap("Plan not found. Please check the plan ID.");
      };
      case (?plan) {
        let now = Time.now();
        assert(plan.validityDays != 0);
        let expiry = now + plan.validityDays * 24 * 60 * 60 * 1_000_000_000;
        let userPlan : UserPlan = {
          plan;
          purchaseDate = now;
          expiryDate = expiry;
          isActive = true;
        };
        userPlans.add(user, userPlan);
      };
    };
  };
};
