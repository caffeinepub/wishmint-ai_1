import { usePageMeta } from '../hooks/usePageMeta';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { usePlanStore } from '../state/planStore';
import { CreditCard, Download, Smartphone } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

export default function BillingPage() {
  usePageMeta({
    title: 'Billing - WishMint AI',
    description: 'Manage your subscription and payment methods',
  });

  const { identity, login } = useInternetIdentity();
  const navigate = useNavigate();
  const { tier, billingPeriod } = usePlanStore();
  const [isOpeningUPI, setIsOpeningUPI] = useState(false);

  const handleCopyUPI = async () => {
    try {
      await navigator.clipboard.writeText('6205684456@axl');
      toast.success('UPI ID copied to clipboard');
    } catch (error) {
      toast.error('Failed to copy UPI ID. Please copy manually.');
    }
  };

  const handlePayWithUPI = () => {
    setIsOpeningUPI(true);
    
    // Build UPI deep link
    const upiLink = `upi://pay?pa=6205684456@axl&pn=WishMint AI&cu=INR`;
    
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

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div>
          <h1 className="text-4xl font-bold">Billing</h1>
          <p className="text-muted-foreground mt-2">
            Manage your subscription and payment history
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Current Plan</CardTitle>
                <CardDescription>Your active subscription</CardDescription>
              </div>
              <Badge variant={tier === 'free' ? 'secondary' : 'default'} className="text-lg px-4 py-2">
                {tier.charAt(0).toUpperCase() + tier.slice(1)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Billing Period</p>
                <p className="text-sm text-muted-foreground">
                  {billingPeriod === 'monthly' ? 'Monthly' : 'Yearly'}
                </p>
              </div>
              {tier !== 'free' && (
                <div className="text-right">
                  <p className="font-medium">Next Billing Date</p>
                  <p className="text-sm text-muted-foreground">
                    {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              )}
            </div>
            {tier === 'free' && (
              <Button onClick={() => navigate({ to: '/pricing' })} className="w-full">
                Upgrade Plan
              </Button>
            )}
          </CardContent>
        </Card>

        {tier === 'free' && (
          <Card className="border-2 border-dashed">
            <CardHeader>
              <CardTitle>Manual UPI Payment</CardTitle>
              <CardDescription>Pay via UPI and upload payment proof</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div>
                  <p className="font-medium mb-2">UPI ID</p>
                  <div className="flex items-center gap-2">
                    <code className="flex-1 bg-muted px-4 py-2 rounded-lg font-mono text-sm">
                      6205684456@axl
                    </code>
                    <Button variant="outline" size="sm" onClick={handleCopyUPI}>
                      Copy
                    </Button>
                  </div>
                </div>

                <div>
                  <p className="font-medium mb-2">QR Code</p>
                  <div className="bg-muted rounded-lg p-4 inline-block">
                    <img
                      src="/assets/IMG_20260212_201743.jpg"
                      alt="UPI QR Code"
                      className="w-48 h-48 object-contain"
                    />
                  </div>
                </div>

                <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                  <p className="font-medium">Instructions:</p>
                  <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                    <li>Click "Pay with UPI app" below or scan the QR code</li>
                    <li>Complete the payment in your UPI app</li>
                    <li>Take a screenshot of the payment confirmation</li>
                    <li>Upload the screenshot and enter transaction ID below</li>
                  </ol>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    className="w-full" 
                    variant="default"
                    onClick={handlePayWithUPI}
                    disabled={isOpeningUPI}
                  >
                    <Smartphone className="mr-2 h-4 w-4" />
                    {isOpeningUPI ? 'Opening UPI app...' : 'Pay with UPI app'}
                  </Button>
                  
                  <Button className="w-full" variant="outline">
                    <Download className="mr-2 h-4 w-4" />
                    I Have Paid - Upload Proof
                  </Button>
                </div>
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
              <CreditCard className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No payment history yet</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
