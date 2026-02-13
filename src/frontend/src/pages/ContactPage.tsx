import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Mail, MessageCircle } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function ContactPage() {
  usePageMeta({
    title: 'Contact - WishMint AI',
    description: 'Get in touch with the WishMint AI team',
  });

  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>
                Get help via email. We typically respond within 24 hours.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm font-medium">support@wishmint.ai</p>
              <Button onClick={() => navigate({ to: '/support' })} className="w-full">
                Submit Support Ticket
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader className="text-center">
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>
                Chat with our team in real-time for immediate assistance.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-sm font-medium">Available Mon-Fri, 9am-6pm IST</p>
              <Button variant="outline" className="w-full">
                Start Live Chat
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Other Ways to Reach Us</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">General Inquiries</h3>
              <p className="text-sm text-muted-foreground">hello@wishmint.ai</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Business & Partnerships</h3>
              <p className="text-sm text-muted-foreground">business@wishmint.ai</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Creator Support</h3>
              <p className="text-sm text-muted-foreground">creators@wishmint.ai</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
