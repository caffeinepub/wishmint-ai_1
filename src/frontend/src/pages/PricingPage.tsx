import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Check } from 'lucide-react';
import { pricingCopy } from '../content/copy';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function PricingPage() {
  usePageMeta({
    title: 'Pricing - WishMint AI',
    description: 'Choose the perfect plan for your needs. Start free, upgrade anytime.',
  });

  const [isYearly, setIsYearly] = useState(false);
  const navigate = useNavigate();
  const { identity, login } = useInternetIdentity();

  const handleUpgrade = (plan: string) => {
    if (!identity) {
      login();
      return;
    }
    navigate({ to: '/billing' });
  };

  return (
    <div className="container py-16">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold">{pricingCopy.headline}</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {pricingCopy.subtext}
          </p>
          <div className="flex items-center justify-center gap-3 pt-4">
            <Label htmlFor="billing-toggle" className={!isYearly ? 'font-semibold' : ''}>
              Monthly
            </Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className={isYearly ? 'font-semibold' : ''}>
              Yearly
              <Badge variant="secondary" className="ml-2">Save 17%</Badge>
            </Label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Free Plan */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{pricingCopy.plans.free.name}</CardTitle>
              <CardDescription>{pricingCopy.plans.free.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">₹0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {pricingCopy.plans.free.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button variant="outline" className="w-full" onClick={() => navigate({ to: '/create' })}>
                Get Started
              </Button>
            </CardFooter>
          </Card>

          {/* Pro Plan */}
          <Card className="border-2 border-primary shadow-lg relative">
            <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
            <CardHeader>
              <CardTitle className="text-2xl">{pricingCopy.plans.pro.name}</CardTitle>
              <CardDescription>{pricingCopy.plans.pro.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">
                  ₹{isYearly ? Math.floor(pricingCopy.plans.pro.price.yearly / 12) : pricingCopy.plans.pro.price.monthly}
                </span>
                <span className="text-muted-foreground">/month</span>
                {isYearly && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed ₹{pricingCopy.plans.pro.price.yearly} yearly
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {pricingCopy.plans.pro.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade('pro')}>
                Upgrade to Pro
              </Button>
            </CardFooter>
          </Card>

          {/* Business Plan */}
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl">{pricingCopy.plans.business.name}</CardTitle>
              <CardDescription>{pricingCopy.plans.business.description}</CardDescription>
              <div className="pt-4">
                <span className="text-4xl font-bold">
                  ₹{isYearly ? Math.floor(pricingCopy.plans.business.price.yearly / 12) : pricingCopy.plans.business.price.monthly}
                </span>
                <span className="text-muted-foreground">/month</span>
                {isYearly && (
                  <p className="text-sm text-muted-foreground mt-1">
                    Billed ₹{pricingCopy.plans.business.price.yearly} yearly
                  </p>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <ul className="space-y-3">
                {pricingCopy.plans.business.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleUpgrade('business')}>
                Upgrade to Business
              </Button>
            </CardFooter>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Why upgrade?</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {pricingCopy.whyUpgrade.map((reason, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <div className="text-center text-sm text-muted-foreground">
          <p>{pricingCopy.refundPolicy}</p>
        </div>
      </div>
    </div>
  );
}
