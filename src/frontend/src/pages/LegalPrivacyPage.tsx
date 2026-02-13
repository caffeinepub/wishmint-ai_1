import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LegalPrivacyPage() {
  usePageMeta({
    title: 'Privacy Policy - WishMint AI',
    description: 'Privacy policy and data protection information',
  });

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">Privacy Policy</h1>
          <p className="text-muted-foreground">Last updated: February 13, 2026</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Introduction</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              WishMint AI ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none space-y-4">
            <div>
              <h3 className="font-semibold">Personal Information</h3>
              <p>We collect information you provide directly, including your name, email address, username, and profile information.</p>
            </div>
            <div>
              <h3 className="font-semibold">Usage Data</h3>
              <p>We automatically collect information about your interactions with our platform, including designs created, templates viewed, and feature usage.</p>
            </div>
            <div>
              <h3 className="font-semibold">Payment Information</h3>
              <p>Payment processing is handled securely. We do not store complete payment card details on our servers.</p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <ul className="list-disc pl-6 space-y-2">
              <li>To provide and maintain our services</li>
              <li>To process your transactions and manage your account</li>
              <li>To send you updates, newsletters, and promotional materials</li>
              <li>To improve our platform and develop new features</li>
              <li>To detect and prevent fraud or abuse</li>
              <li>To comply with legal obligations</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Data Security</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              We implement appropriate technical and organizational measures to protect your personal information. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal information</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Export your data</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Contact Us</CardTitle>
          </CardHeader>
          <CardContent className="prose prose-sm max-w-none">
            <p>
              If you have questions about this Privacy Policy, please contact us at privacy@wishmint.ai
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
