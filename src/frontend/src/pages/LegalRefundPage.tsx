import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalRefundPage() {
  usePageMeta({
    title: 'Refund Policy - WishMint AI',
    description: 'Refund and cancellation policy',
  });

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Refund Policy</h1>
          <p className="text-muted-foreground">Last updated: February 13, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>7-Day Money-Back Guarantee</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We offer a 7-day money-back guarantee on all paid subscription plans. If you are not satisfied with WishMint AI for any reason, you can request a full refund within 7 days of your initial purchase.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eligibility for Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>To be eligible for a refund, you must:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Request the refund within 7 days of your initial subscription purchase</li>
              <li>Provide a valid reason for the refund request</li>
              <li>Not have violated our Terms of Service</li>
            </ul>
            <p className="mt-4">
              Please note that refunds are only available for subscription fees. Marketplace purchases of individual templates are generally non-refundable unless the template is defective or significantly different from its description.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Request a Refund</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>To request a refund:</p>
            <ol className="list-decimal pl-6 space-y-2">
              <li>Contact our support team at support@wishmint.ai</li>
              <li>Include your account email and subscription details</li>
              <li>Provide a brief explanation of why you are requesting a refund</li>
            </ol>
            <p className="mt-4">
              We will process your refund request within 3-5 business days. Refunds will be issued to the original payment method.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscription Cancellations</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              You can cancel your subscription at any time from your billing settings. When you cancel:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>You will retain access to paid features until the end of your current billing period</li>
              <li>No further charges will be made after the current period ends</li>
              <li>Your account will automatically downgrade to the free plan</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Marketplace Template Refunds</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Refunds for marketplace template purchases are handled on a case-by-case basis. We may issue a refund if:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The template is defective or does not work as described</li>
              <li>The template is significantly different from its preview</li>
              <li>You accidentally purchased the wrong template (within 24 hours)</li>
            </ul>
            <p className="mt-4">
              To request a template refund, contact support@wishmint.ai with your purchase details and reason for the refund.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have questions about our refund policy, please contact us at support@wishmint.ai or visit our support center.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
