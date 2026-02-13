import { useState } from 'react';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { Mail, MessageCircle, HelpCircle } from 'lucide-react';

export default function SupportPage() {
  usePageMeta({
    title: 'Support - WishMint AI',
    description: 'Get help and contact our support team',
  });

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !subject || !message) {
      toast.error('Please fill in all fields');
      return;
    }
    toast.success('Support ticket submitted successfully!');
    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Support Center</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Need help? We're here for you. Submit a ticket or browse our help articles.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <Mail className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Email Support</CardTitle>
              <CardDescription>Get help via email</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">support@wishmint.ai</p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <MessageCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Live Chat</CardTitle>
              <CardDescription>Chat with our team</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm">Start Chat</Button>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader>
              <HelpCircle className="h-12 w-12 mx-auto mb-4 text-primary" />
              <CardTitle>Help Center</CardTitle>
              <CardDescription>Browse articles</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" onClick={() => window.location.href = '/faq'}>
                View FAQ
              </Button>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Submit a Support Ticket</CardTitle>
            <CardDescription>
              Fill out the form below and we'll get back to you within 24 hours
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="subject">Subject *</Label>
                <Input
                  id="subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Brief description of your issue"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message *</Label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your issue in detail..."
                  rows={6}
                  required
                />
              </div>

              <Button type="submit" size="lg">
                Submit Ticket
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
