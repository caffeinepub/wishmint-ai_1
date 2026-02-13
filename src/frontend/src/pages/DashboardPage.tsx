import { usePageMeta } from '../hooks/usePageMeta';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile } from '../hooks/useQueries';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Sparkles, FileText, TrendingUp, CreditCard } from 'lucide-react';
import ProfileSetupModal from '../components/auth/ProfileSetupModal';
import { usePlanStore } from '../state/planStore';

export default function DashboardPage() {
  usePageMeta({
    title: 'Dashboard - WishMint AI',
    description: 'Manage your account and view your designs',
  });

  const { identity, login } = useInternetIdentity();
  const { data: profile, isLoading: profileLoading, isFetched } = useGetCallerUserProfile();
  const navigate = useNavigate();
  const { tier } = usePlanStore();

  const isAuthenticated = !!identity;
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && profile === null;

  if (!isAuthenticated) {
    return (
      <div className="container py-16">
        <div className="max-w-md mx-auto text-center space-y-6">
          <h1 className="text-3xl font-bold">Welcome to WishMint AI</h1>
          <p className="text-muted-foreground">Please login to access your dashboard</p>
          <Button onClick={login} size="lg">
            Login to Continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold">Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Welcome back, {profile?.name || 'User'}!
              </p>
            </div>
            <Badge variant={tier === 'free' ? 'secondary' : 'default'} className="text-sm px-4 py-2">
              {tier.charAt(0).toUpperCase() + tier.slice(1)} Plan
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: '/create' })}>
              <CardHeader>
                <Sparkles className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Create New</CardTitle>
                <CardDescription>Start a new design</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <FileText className="h-8 w-8 text-primary mb-2" />
                <CardTitle>My Designs</CardTitle>
                <CardDescription>View saved designs</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <TrendingUp className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Usage</CardTitle>
                <CardDescription>Today's generations</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold">0 / {tier === 'free' ? '5' : tier === 'pro' ? '100' : '∞'}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate({ to: '/billing' })}>
              <CardHeader>
                <CreditCard className="h-8 w-8 text-primary mb-2" />
                <CardTitle>Billing</CardTitle>
                <CardDescription>Manage subscription</CardDescription>
              </CardHeader>
            </Card>
          </div>

          {tier === 'free' && (
            <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
              <CardHeader>
                <CardTitle>Upgrade to unlock more features</CardTitle>
                <CardDescription>
                  Get unlimited generations, HD exports, and remove watermarks
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={() => navigate({ to: '/pricing' })}>
                  View Plans
                </Button>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Recent Designs</CardTitle>
              <CardDescription>Your latest creations</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-center text-muted-foreground py-8">
                No designs yet. Create your first design to get started!
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {showProfileSetup && (
        <ProfileSetupModal open={showProfileSetup} onClose={() => {}} />
      )}
    </>
  );
}
