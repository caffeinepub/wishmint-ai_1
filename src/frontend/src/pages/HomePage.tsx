import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { usePageMeta } from '../hooks/usePageMeta';
import { homeCopy } from '../content/copy';
import { 
  Sparkles, 
  Layout, 
  Palette, 
  Store, 
  DollarSign, 
  Download, 
  Smartphone, 
  Zap,
  Star,
  ArrowRight
} from 'lucide-react';
import { useState } from 'react';

const iconMap = {
  sparkles: Sparkles,
  layout: Layout,
  palette: Palette,
  store: Store,
  'dollar-sign': DollarSign,
  download: Download,
  smartphone: Smartphone,
  zap: Zap,
};

export default function HomePage() {
  usePageMeta({
    title: 'WishMint AI - Create Stunning Wishes & Invitations with AI',
    description: 'Design beautiful wish cards and invitations in seconds with AI. Share your creations or sell premium templates in our marketplace.',
    ogTitle: 'WishMint AI - AI-Powered Wish Cards & Invitations',
    ogDescription: 'Create stunning wishes & invitations with AI — then share or sell your best designs.',
  });

  const navigate = useNavigate();
  const [demoPrompt, setDemoPrompt] = useState('');
  const [demoPreview, setDemoPreview] = useState('');

  const handleDemoInput = (value: string) => {
    setDemoPrompt(value);
    if (value.length > 10) {
      setDemoPreview(`✨ ${value} ✨`);
    } else {
      setDemoPreview('');
    }
  };

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <Badge variant="secondary" className="mb-4">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Design Platform
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            {homeCopy.hero.headline}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {homeCopy.hero.subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate({ to: '/create' })} className="text-lg">
              {homeCopy.hero.ctaPrimary}
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => navigate({ to: '/marketplace' })} className="text-lg">
              {homeCopy.hero.ctaSecondary}
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Demo */}
      <section className="container py-16 border-t">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Try it now</h2>
            <p className="text-muted-foreground">Type a message and see instant preview</p>
          </div>
          <Card>
            <CardContent className="p-6 space-y-4">
              <input
                type="text"
                value={demoPrompt}
                onChange={(e) => handleDemoInput(e.target.value)}
                placeholder="Type your wish message here..."
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
              {demoPreview && (
                <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-8 text-center min-h-[200px] flex items-center justify-center">
                  <p className="text-2xl font-semibold">{demoPreview}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Features */}
      <section className="container py-16 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Powerful features to create, customize, and share your designs
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homeCopy.features.map((feature, index) => {
            const Icon = iconMap[feature.icon as keyof typeof iconMap] || Sparkles;
            return (
              <Card key={index} className="border-2 hover:border-primary/50 transition-colors">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-lg">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Testimonials */}
      <section className="container py-16 border-t">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Loved by creators</h2>
          <p className="text-muted-foreground">See what our users have to say</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {homeCopy.testimonials.map((testimonial, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <CardDescription className="text-base">{testimonial.content}</CardDescription>
              </CardHeader>
              <CardContent>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="container py-20 border-t">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl font-bold">Ready to create something amazing?</h2>
          <p className="text-xl text-muted-foreground">
            Join thousands of creators using WishMint AI to design stunning wishes and invitations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" onClick={() => navigate({ to: '/create' })}>
              Start Creating Free
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link to="/pricing">View Pricing</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
