# Specification

## Summary
**Goal:** Improve the upgrade payment experience by deep-linking to a UPI app, and show actual generated design image previews after running “Generate Designs”.

**Planned changes:**
- Add a “Pay with UPI app” action on `/billing` that opens a UPI deep-link (upi://pay...) using the payee address `6205684456@axl`.
- Handle cases where UPI deep-links are blocked by showing an English error/toast and guidance to use QR/manual UPI ID instead.
- Ensure returning to `/billing` keeps the existing proof upload / pending approval flow available and unchanged.
- Update `/create` so “Generate Designs” shows a loading state, then renders generated design image previews in the results area (replacing the placeholder text once previews exist) while keeping existing login gating and validation behavior.

**User-visible outcome:** Users can tap a UPI payment button during plan upgrade to open their installed UPI app and then return to Billing to upload proof as before, and users who generate designs in Create Studio will see at least one generated image preview displayed after generation completes.
