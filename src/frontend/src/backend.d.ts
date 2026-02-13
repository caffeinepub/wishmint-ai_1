import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export interface Plan {
    features: Array<string>;
    planId: string;
    name: string;
    validityDays: bigint;
    price: bigint;
}
export type Time = bigint;
export interface PaymentStatusUpdate {
    requestId: bigint;
    newStatus: PaymentStatus;
}
export interface PlanUpdateInput {
    features?: Array<string>;
    planId: string;
    name?: string;
    validityDays?: bigint;
    price?: bigint;
}
export interface Profile {
    bio: string;
    username: string;
    name: string;
    category?: string;
}
export interface CommunityPost {
    profileCategory?: string;
    title?: string;
    content: string;
    tags: Array<string>;
    author: Principal;
    professional: boolean;
    timestamp: Time;
    authorProfile: Profile;
    postId: bigint;
}
export interface UserApprovalInfo {
    status: ApprovalStatus;
    principal: Principal;
}
export interface UserPlan {
    purchaseDate: Time;
    expiryDate: Time;
    plan: Plan;
    isActive: boolean;
}
export interface PlanInput {
    features: Array<string>;
    planId: string;
    name: string;
    validityDays: bigint;
    price: bigint;
}
export interface CreatePostRequest {
    profileCategory?: string;
    title?: string;
    content: string;
    tags: Array<string>;
    professional: boolean;
}
export interface PaymentRequest {
    status: PaymentStatus;
    requestId: bigint;
    planId: string;
    user: Principal;
    timestamp: Time;
    screenshot?: ExternalBlob;
    transactionId: string;
}
export interface PaymentRequestInput {
    planId: string;
    screenshot?: ExternalBlob;
    transactionId: string;
}
export enum ApprovalStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum PaymentStatus {
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    activateUserPlan(user: Principal, planId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    createPlan(input: PlanInput): Promise<void>;
    createPost(request: CreatePostRequest): Promise<void>;
    getAllPaymentRequests(): Promise<Array<PaymentRequest>>;
    getAllPlans(): Promise<Array<Plan>>;
    getAllPosts(): Promise<Array<CommunityPost>>;
    getAllUserProfiles(): Promise<Array<Profile>>;
    getCallerUserProfile(): Promise<Profile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getFollowingPosts(): Promise<Array<CommunityPost>>;
    getPlan(planId: string): Promise<Plan | null>;
    getUserPlan(user: Principal): Promise<UserPlan | null>;
    getUserProfile(user: Principal): Promise<Profile | null>;
    isCallerAdmin(): Promise<boolean>;
    isCallerApproved(): Promise<boolean>;
    listApprovals(): Promise<Array<UserApprovalInfo>>;
    requestApproval(): Promise<void>;
    saveCallerUserProfile(profile: Profile): Promise<void>;
    setApproval(user: Principal, status: ApprovalStatus): Promise<void>;
    submitPaymentRequest(input: PaymentRequestInput): Promise<bigint>;
    updatePaymentStatus(update: PaymentStatusUpdate): Promise<void>;
    updatePlan(input: PlanUpdateInput): Promise<void>;
    upgradeRole(user: Principal, role: UserRole): Promise<void>;
    upiAutoApprove(user: Principal, planId: string): Promise<void>;
}
