import { useEffect, useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate, useSearch } from '@tanstack/react-router';
import { usePlanStore } from '../state/planStore';
import { Download, Smartphone, Upload, Loader2, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import ManualUpiPaymentRequestDialog from '../components/billing/ManualUpiPaymentRequestDialog';
import { pricingCopy } from '../content/copy';
import { getBillingSelectionFromUrl } from '../utils/urlParams';
import { useUpiAutoApprove, useGetCallerUserPlan } from '../hooks/useQueries';
import { useQueryClient } from '@tanstack/react-query';

type PlanTier = 'pro' | 'business';
type BillingPeriod = 'monthly' | 'yearly';

export default function BillingPage() {
  usePageMeta({
    title: 'Billing - WishMint AI',
    description: 'Manage your subscription and payment methods',
  });

  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const searchParams = useSearch({ strict: false }) as { tier?: string; period?: string };
  const { tier: currentTier, billingPeriod: currentBillingPeriod } = usePlanStore();
  const [isOpeningUPI, setIsOpeningUPI] = useState(false);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [isCheckingPayment, setIsCheckingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const upiAutoApprove = useUpiAutoApprove();
  const queryClient = useQueryClient();

  // Parse selected plan from URL or use defaults
  const getSelectedPlan = (): { tier: PlanTier; billingPeriod: BillingPeriod; amount: number } => {
    const urlSelection = getBillingSelectionFromUrl();
    
    let tier: PlanTier = 'pro';
    let billingPeriod: BillingPeriod = 'monthly';

    if (urlSelection) {
      if (urlSelection.tier === 'pro' || urlSelection.tier === 'business') {
        tier = urlSelection.tier;
      }
      if (urlSelection.billingPeriod === 'monthly' || urlSelection.billingPeriod === 'yearly') {
        billingPeriod = urlSelection.billingPeriod;
      }
    } else if (searchParams.tier && searchParams.period) {
      if (searchParams.tier === 'pro' || searchParams.tier === 'business') {
        tier = searchParams.tier;
      }
      if (searchParams.period === 'monthly' || searchParams.period === 'yearly') {
        billingPeriod = searchParams.period;
      }
    }

    const amount = billingPeriod === 'monthly' 
      ? pricingCopy.plans[tier].price.monthly 
      : pricingCopy.plans[tier].price.yearly;

    return { tier, billingPeriod, amount };
  };

  const selectedPlan = getSelectedPlan();

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText('6205684456@axl');
      toast.success('UPI ID copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy UPI ID. Please copy manually.');
    }
  };

  const handlePayWithUPI = async () => {
    if (!identity) {
      toast.error('Please login to continue');
      await login();
      return;
    }

    setIsOpeningUPI(true);
    
    // Generate unique reference for this payment
    const timestamp = Date.now();
    const reference = `WISHMINT-${selectedPlan.tier.toUpperCase()}-${timestamp}`;
    
    // Build UPI deep link with exact amount and plan details
    const planName = `WishMint AI ${selectedPlan.tier.charAt(0).toUpperCase() + selectedPlan.tier.slice(1)} (${selectedPlan.billingPeriod.charAt(0).toUpperCase() + selectedPlan.billingPeriod.slice(1)})`;
    const upiLink = `upi://pay?pa=6205684456@axl&pn=WishMint AI&cu=INR&am=${selectedPlan.amount}&tn=${encodeURIComponent(planName)}&tr=${encodeURIComponent(reference)}`;
    
    // Try to open UPI app
    const startTime = Date.now();
    window.location.href = upiLink;
    
    // Detect if deep link failed (best effort)
    const checkTimeout = setTimeout(() => {
      const elapsed = Date.now() - startTime;
      // If still on page after 2 seconds, likely failed
      if (elapsed < 2500 && document.hasFocus()) {
        toast.error(
          'Unable to open UPI app. Please scan the QR code or copy the UPI ID to pay manually.',
          { duration: 5000 }
        );
      }
      setIsOpeningUPI(false);
    }, 2000);

    // Clean up if user switches away
    const handleVisibilityChange = () => {
      if (document.hidden) {
        clearTimeout(checkTimeout);
        setIsOpeningUPI(false);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    // Cleanup
    setTimeout(() => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      setIsOpeningUPI(false);
    }, 3000);
  };

  // Poll for payment status after returning to the app
  useEffect(() => {
    let pollInterval: NodeJS.Timeout;
    let pollTimeout: NodeJS.Timeout;

    const handleVisibilityChange = async () => {
      if (!document.hidden && identity && currentTier === 'free') {
        // User returned to the app, start checking payment status
        setIsCheckingPayment(true);
        
        // Auto-approve after 60 seconds simulation
        pollTimeout = setTimeout(async () => {
          try {
            const planId = `${selectedPlan.tier}-${selectedPlan.billingPeriod}`;
            await upiAutoApprove.mutateAsync({ planId });
            
            // Invalidate and refetch plan
            await queryClient.invalidateQueries({ queryKey: ['callerUserPlan'] });
            
            setPaymentSuccess(true);
            setIsCheckingPayment(false);
            toast.success('Payment verified! Your plan has been activated.');
          } catch (error: any) {
            console.error('Auto-approve error:', error);
            setIsCheckingPayment(false);
            toast.info('Payment verification in progress. Please check back in a moment.');
          }
        }, 60000); // 60 seconds

        // Also poll every 5 seconds to check if plan was activated
        pollInterval = setInterval(async () => {
          await queryClient.invalidateQueries({ queryKey: ['callerUserPlan'] });
        }, 5000);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (pollInterval) clearInterval(pollInterval);
      if (pollTimeout) clearTimeout(pollTimeout);
    };
  }, [identity, currentTier, selectedPlan, upiAutoApprove, queryClient]);

  if (!identity) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Billing</h1>
          <p className="text-muted-foreground">Please login to view your billing information</p>
          <Button onClick={login} size="lg">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  if (paymentSuccess) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <div className="flex justify-center">
            <div className="p-4 rounded-full bg-primary/10">
              <CheckCircle2 className="h-16 w-16 text-primary" />
            </div>
          </div>
          <h1 className="text-3xl font-bold">Payment Successful!</h1>
          <p className="text-muted-foreground">
            Your {selectedPlan.tier.charAt(0).toUpperCase() + selectedPlan.tier.slice(1)} plan has been activated.
          </p>
          <Button onClick={() => navigate({ to: '/create' })} size="lg">
            Start Creating
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Billing</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and payment history
          </p>
        </div>

        {isCheckingPayment && (
          <Card className="border-primary">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <Loader2 className="h-6 w-6 animate-spin text-primary" />
                <div>
                  <p className="font-medium">Checking payment status...</p>
                  <p className="text-sm text-muted-foreground">
                    Please wait while we verify your payment. This usually takes about 1 minute.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </div>
              <Badge variant={currentTier === 'free' ? 'secondary' : 'default'} className="text-lg px-4 py-2">
                {currentTier.charAt(0).toUpperCase() + currentTier.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Billing Period</p>
                <p className="text-sm text-muted-foreground">
                  {currentBillingPeriod === 'monthly' ? 'Monthly' : 'Yearly'}
                </p>
              </div>
              {currentTier !== 'free' && (
                <div className="text-right">
                  <p className="font-medium">
                    ₹{currentBillingPeriod === 'monthly' ? '299' : '2,999'}/
                    {currentBillingPeriod === 'monthly' ? 'month' : 'year'}
                  </p>
                  <p className="text-sm text-muted-foreground">Next billing: Mar 1, 2026</p>
                </div>
              )}
            </div>

            {currentTier === 'free' && (
              <div className="pt-4 border-t">
                <Button onClick={() => navigate({ to: '/pricing' })} className="w-full">
                  Upgrade Plan
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        {currentTier === 'free' && (
          <Card>
            <CardHeader>
              <CardTitle>Upgrade to {selectedPlan.tier.charAt(0).toUpperCase() + selectedPlan.tier.slice(1)}</CardTitle>
              <CardDescription>
                Pay ₹{selectedPlan.amount} for {selectedPlan.billingPeriod} access
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Selected Plan:</span>
                  <Badge variant="default">
                    {selectedPlan.tier.charAt(0).toUpperCase() + selectedPlan.tier.slice(1)} - {selectedPlan.billingPeriod.charAt(0).toUpperCase() + selectedPlan.billingPeriod.slice(1)}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-medium">Amount to Pay:</span>
                  <span className="text-2xl font-bold text-primary">₹{selectedPlan.amount}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">UPI ID</p>
                    <p className="text-sm text-muted-foreground font-mono">6205684456@axl</p>
                  </div>
                  <Button variant="outline" onClick={handleCopyUPI}>
                    Copy UPI ID
                  </Button>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    onClick={handlePayWithUPI} 
                    disabled={isOpeningUPI || isCheckingPayment}
                    className="flex-1"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    {isOpeningUPI ? 'Opening UPI App...' : 'Pay with UPI'}
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setShowPaymentDialog(true)}
                    className="flex-1"
                    disabled={isCheckingPayment}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    I Have Paid - Upload Proof
                  </Button>
                </div>
              </div>

              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Note:</strong> After making the payment via UPI, your plan will be automatically activated within 1 minute. Alternatively, you can click "I Have Paid - Upload Proof" to submit your transaction ID and screenshot for manual verification within 24 hours.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>Payment History</CardTitle>
            <CardDescription>View your past transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-muted-foreground">
              No payment history available
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Download Invoice</CardTitle>
            <CardDescription>Get your payment receipts</CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" disabled>
              <Download className="h-4 w-4 mr-2" />
              Download Latest Invoice
            </Button>
          </CardContent>
        </Card>
      </div>

      <ManualUpiPaymentRequestDialog 
        open={showPaymentDialog}
        onOpenChange={setShowPaymentDialog}
        selectedPlan={selectedPlan}
      />
    </div>
  );
}
