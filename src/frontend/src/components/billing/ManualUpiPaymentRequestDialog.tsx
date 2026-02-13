import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSubmitPaymentRequest } from '../../hooks/useQueries';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { ExternalBlob } from '../../backend';
import { toast } from 'sonner';
import { Loader2, Upload, CheckCircle2 } from 'lucide-react';

interface ManualUpiPaymentRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedPlan?: { tier: string; billingPeriod: string; amount: number };
}

export default function ManualUpiPaymentRequestDialog({
  open,
  onOpenChange,
  selectedPlan,
}: ManualUpiPaymentRequestDialogProps) {
  const { identity, login } = useInternetIdentity();
  const [transactionId, setTransactionId] = useState('');
  const [screenshot, setScreenshot] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const submitRequest = useSubmitPaymentRequest();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }
      setScreenshot(file);
    }
  };

  const handleSubmit = async () => {
    if (!identity) {
      toast.error('Please login to submit a payment request');
      await login();
      return;
    }

    if (!transactionId.trim()) {
      toast.error('Please enter a transaction ID');
      return;
    }

    try {
      let screenshotBlob: ExternalBlob | undefined;

      if (screenshot) {
        const arrayBuffer = await screenshot.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        screenshotBlob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
          setUploadProgress(percentage);
        });
      }

      const planId = selectedPlan 
        ? `${selectedPlan.tier}-${selectedPlan.billingPeriod}`
        : 'pro-monthly';

      await submitRequest.mutateAsync({
        transactionId: transactionId.trim(),
        screenshot: screenshotBlob,
        planId,
      });

      setIsSubmitted(true);
      toast.success('Payment request submitted successfully');
    } catch (error: any) {
      toast.error(error.message || 'Failed to submit payment request');
      console.error(error);
    }
  };

  const handleClose = () => {
    setTransactionId('');
    setScreenshot(null);
    setUploadProgress(0);
    setIsSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        {isSubmitted ? (
          <>
            <DialogHeader>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <CheckCircle2 className="h-12 w-12 text-primary" />
                </div>
              </div>
              <DialogTitle className="text-center">Request Submitted</DialogTitle>
              <DialogDescription className="text-center">
                Your payment request is now pending and awaiting admin approval. You will be notified once it has been reviewed.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={handleClose} className="w-full">
                Close
              </Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Submit Payment Proof</DialogTitle>
              <DialogDescription>
                Enter your UPI transaction ID and optionally upload a screenshot of the payment confirmation.
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4 py-4">
              {selectedPlan && (
                <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Selected Plan:</span>
                    <span className="font-medium">
                      {selectedPlan.tier.charAt(0).toUpperCase() + selectedPlan.tier.slice(1)} - ₹{selectedPlan.amount}
                    </span>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="transactionId">
                  Transaction ID <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="transactionId"
                  placeholder="Enter UPI transaction ID"
                  value={transactionId}
                  onChange={(e) => setTransactionId(e.target.value)}
                  disabled={submitRequest.isPending}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="screenshot">Payment Screenshot (Optional)</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="screenshot"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    disabled={submitRequest.isPending}
                    className="cursor-pointer"
                  />
                  {screenshot && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setScreenshot(null)}
                      disabled={submitRequest.isPending}
                    >
                      Remove
                    </Button>
                  )}
                </div>
                {screenshot && (
                  <p className="text-sm text-muted-foreground">
                    Selected: {screenshot.name}
                  </p>
                )}
              </div>

              {submitRequest.isPending && uploadProgress > 0 && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Uploading...</span>
                    <span className="text-muted-foreground">{uploadProgress}%</span>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={handleClose}
                disabled={submitRequest.isPending}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitRequest.isPending || !transactionId.trim()}
              >
                {submitRequest.isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Submit Request
                  </>
                )}
              </Button>
            </DialogFooter>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
