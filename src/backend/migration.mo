import Map "mo:core/Map";
import Nat "mo:core/Nat";
import Text "mo:core/Text";
import Principal "mo:core/Principal";
import Storage "blob-storage/Storage";
import Time "mo:core/Time";
import Auth "authorization/access-control";
import UserApproval "user-approval/approval";

module {
  // Payment Status
  type PaymentStatus = {
    #pending;
    #approved;
    #rejected;
  };

  // Old Payment Request
  type OldPaymentRequest = {
    requestId : Nat;
    user : Principal;
    transactionId : Text;
    screenshot : ?Storage.ExternalBlob;
    status : PaymentStatus;
    timestamp : Time.Time;
  };

  // New Plan
  type NewPlan = {
    planId : Text;
    name : Text;
    price : Nat;
    validityDays : Nat;
    features : [Text];
  };

  // New Payment Request
  type NewPaymentRequest = {
    requestId : Nat;
    user : Principal;
    transactionId : Text;
    screenshot : ?Storage.ExternalBlob;
    status : PaymentStatus;
    timestamp : Time.Time;
    planId : Text;
  };

  // New User Plan
  type NewUserPlan = {
    plan : NewPlan;
    purchaseDate : Time.Time;
    expiryDate : Time.Time;
    isActive : Bool;
  };

  // Old Actor State
  type OldActor = {
    accessControlState : Auth.AccessControlState;
    approvalState : { var approvalStatus : Map.Map<Principal, UserApproval.ApprovalStatus> };
    userProfiles : Map.Map<Principal, { name : Text; bio : Text; username : Text; category : ?Text }>;
    posts : Map.Map<Nat, {
      postId : Nat;
      author : Principal;
      authorProfile : { name : Text; bio : Text; username : Text; category : ?Text };
      content : Text;
      title : ?Text;
      tags : [Text];
      profileCategory : ?Text;
      professional : Bool;
      timestamp : Time.Time;
    }>;
    postCounter : Nat;
    paymentRequests : Map.Map<Nat, OldPaymentRequest>;
    nextRequestId : Nat;
  };

  // New Actor State
  type NewActor = {
    accessControlState : Auth.AccessControlState;
    approvalState : { var approvalStatus : Map.Map<Principal, UserApproval.ApprovalStatus> };
    userProfiles : Map.Map<Principal, { name : Text; bio : Text; username : Text; category : ?Text }>;
    posts : Map.Map<Nat, {
      postId : Nat;
      author : Principal;
      authorProfile : { name : Text; bio : Text; username : Text; category : ?Text };
      content : Text;
      title : ?Text;
      tags : [Text];
      profileCategory : ?Text;
      professional : Bool;
      timestamp : Time.Time;
    }>;
    postCounter : Nat;
    paymentRequests : Map.Map<Nat, NewPaymentRequest>;
    nextRequestId : Nat;
    plans : Map.Map<Text, NewPlan>;
    userPlans : Map.Map<Principal, NewUserPlan>;
  };

  public func run(old : OldActor) : NewActor {
    let newPaymentRequests = old.paymentRequests.map<Nat, OldPaymentRequest, NewPaymentRequest>(
      func(_id, oldRequest) {
        {
          oldRequest with
          planId = "";
        };
      }
    );
    {
      old with
      paymentRequests = newPaymentRequests;
      plans = Map.empty<Text, NewPlan>();
      userPlans = Map.empty<Principal, NewUserPlan>();
    };
  };
};
