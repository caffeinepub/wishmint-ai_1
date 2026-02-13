# Specification

## Summary
**Goal:** Make Billing upgrades use the exact selected plan amount via UPI deep-links, and auto-unlock the plan within ~1 minute after initiating a UPI payment, while keeping manual proof upload as fallback.

**Planned changes:**
- Update /pricing → /billing navigation to include the selected plan tier (Pro/Business) and billing period (Monthly/Yearly) in the URL, using English user-facing text.
- Update BillingPage to read tier/period from URL params, display the exact INR amount from existing `pricingCopy`, and fall back to a safe default when params are missing/invalid.
- Update the UPI deep-link on BillingPage to open installed UPI apps with the exact plan amount (am), INR currency, UPI ID `6205684456@axl`, and an English transaction note including plan and period.
- Implement an automatic upgrade flow: on “Pay with UPI”, create a backend upgrade payment request (user, tier, period, expected amount, status, timestamp, reference), include the reference in the UPI intent, and auto-approve/upgrade after ~60 seconds.
- Add backend persistence for the user’s current plan and a frontend React Query hook to fetch it; sync UI gating/planStore from backend plan state (including after the payment flow completes).
- Update backend stable state and conditional migrations to preserve new upgrade-payment-request fields and persisted user-plan data across canister upgrades.

**User-visible outcome:** Users can select a plan on Pricing, go to Billing with that exact plan selection, tap “Pay with UPI” to open their UPI app with the exact amount prefilled, and have their plan automatically activated within about a minute (with an English “checking payment status” flow), while still being able to upload proof for manual review if needed.
