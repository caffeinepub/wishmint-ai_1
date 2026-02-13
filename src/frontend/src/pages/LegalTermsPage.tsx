import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalTermsPage() {
  usePageMeta({
    title: 'Terms of Service - WishMint AI',
    description: 'Terms and conditions for using WishMint AI',
  });

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-muted-foreground">Last updated: February 13, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Agreement to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              By accessing or using WishMint AI, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access the service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Use of Service</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-4">
            <div>
              <h3 className="font-semibold">Permitted Use</h3>
              <p>You may use WishMint AI to create wish cards, invitations, and related designs for personal or commercial purposes in accordance with your subscription plan.</p>
            </div>
            <div>
              <h3 className="font-semibold">Prohibited Activities</h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on intellectual property rights</li>
                <li>Uploading malicious code or harmful content</li>
                <li>Attempting to gain unauthorized access to our systems</li>
                <li>Using the service for spam or harassment</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Intellectual Property</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              You retain ownership of designs you create using WishMint AI. By publishing templates on our marketplace, you grant us a license to display and distribute your work. The WishMint AI platform, including its software, design, and content, is protected by copyright and other intellectual property laws.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Subscriptions and Payments</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              Paid subscriptions are billed in advance on a monthly or yearly basis. You may cancel your subscription at any time. Refunds are provided in accordance with our refund policy.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              WishMint AI is provided "as is" without warranties of any kind. We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use of the service.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Changes to Terms</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We reserve the right to modify these terms at any time. We will notify users of any material changes. Your continued use of the service after such modifications constitutes acceptance of the updated terms.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              For questions about these Terms of Service, please contact us at legal@wishmint.ai
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
