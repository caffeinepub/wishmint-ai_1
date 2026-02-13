import { useEffect } from 'react';
import { Outlet } from '@tanstack/react-router';
import Navbar from '../navigation/Navbar';
import Footer from './Footer';
import BackToTopButton from '../common/BackToTopButton';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';
import { useGetCallerUserPlan } from '../../hooks/useQueries';
import { usePlanStore } from '../../state/planStore';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';

export default function AppLayout() {
  const { identity } = useInternetIdentity();
  const { data: userPlan } = useGetCallerUserPlan();
  const { syncPlanFromBackend } = usePlanStore();

  // Sync plan store from backend when user plan changes
  useEffect(() => {
    if (identity && userPlan?.isActive) {
      // Map backend plan to frontend tier
      const planId = userPlan.plan.planId.toLowerCase();
      let tier: 'free' | 'pro' | 'business' = 'free';
      let billingPeriod: 'monthly' | 'yearly' = 'monthly';

      if (planId.includes('pro')) {
        tier = 'pro';
      } else if (planId.includes('business')) {
        tier = 'business';
      }

      if (planId.includes('yearly')) {
        billingPeriod = 'yearly';
      }

      syncPlanFromBackend(tier, billingPeriod);
    }
  }, [identity, userPlan, syncPlanFromBackend]);

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
