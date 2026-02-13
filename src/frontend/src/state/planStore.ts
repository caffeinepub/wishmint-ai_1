import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type PlanTier = 'free' | 'pro' | 'business';
export type BillingPeriod = 'monthly' | 'yearly';

interface PlanState {
  tier: PlanTier;
  billingPeriod: BillingPeriod;
  setPlan: (tier: PlanTier) => void;
  setBillingPeriod: (period: BillingPeriod) => void;
}

export const usePlanStore = create<PlanState>()(
  persist(
    (set) => ({
      tier: 'free',
      billingPeriod: 'monthly',
      setPlan: (tier) => set({ tier }),
      setBillingPeriod: (period) => set({ billingPeriod: period }),
    }),
    {
      name: 'wishmint-plan-storage',
    }
  )
);

export function canExportHD(tier: PlanTier): boolean {
  return tier === 'pro' || tier === 'business';
}

export function canUploadImage(tier: PlanTier): boolean {
  return tier === 'pro' || tier === 'business';
}

export function canExportPDF(tier: PlanTier): boolean {
  return tier === 'pro' || tier === 'business';
}

export function canUseBrandKit(tier: PlanTier): boolean {
  return tier === 'business';
}

export function canBulkExport(tier: PlanTier): boolean {
  return tier === 'business';
}
