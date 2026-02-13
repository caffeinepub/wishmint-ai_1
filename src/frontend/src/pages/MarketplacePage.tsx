import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Heart, MessageCircle, Bookmark, Share2, Eye, Lock, Crown, Search, Store } from 'lucide-react';
import { usePlanStore } from '../state/planStore';
import { useNavigate } from '@tanstack/react-router';

export default function MarketplacePage() {
  usePageMeta({
    title: 'Marketplace - WishMint AI',
    description: 'Discover and purchase exclusive templates from talented creators',
  });

  const { tier } = usePlanStore();
  const navigate = useNavigate();
  const isPremiumUser = tier === 'pro' || tier === 'business';

  const handleUpgradeClick = () => {
    navigate({ to: '/pricing' });
  };

  const handleBuyTemplate = () => {
    if (!isPremiumUser) {
      navigate({ to: '/pricing' });
    } else {
      // Handle actual purchase
    }
  };

  return (
    <div className="container py-8">
      <div className="space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Store className="h-4 w-4" />
            <span className="text-sm font-medium">Creator Marketplace</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Buy Premium Templates
          </h1>
          
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            Discover and purchase exclusive templates from talented creators
          </p>
        </div>

        {/* Upgrade Lock Card - Only shown for free tier */}
        {!isPremiumUser && (
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10">
                  <Lock className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <CardTitle className="text-xl">Unlock Marketplace Purchases</CardTitle>
                  <CardDescription className="mt-2">
                    Upgrade to Pro or Creator plan to purchase premium templates from our marketplace
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={handleUpgradeClick}
                size="lg"
                className="w-full sm:w-auto"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Search and Filter Section */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search templates..." 
              className="pl-10"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-full sm:w-[180px]">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="wedding">Wedding</SelectItem>
              <SelectItem value="birthday">Birthday</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="festival">Festival</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                <p className="text-5xl">✨</p>
                <Badge className="absolute top-2 right-2">₹299</Badge>
              </div>
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">CR</AvatarFallback>
                  </Avatar>
                  <span className="text-sm text-muted-foreground">@creator{i + 1}</span>
                </div>
                <CardTitle className="text-lg">Premium Wedding Template</CardTitle>
                <CardDescription>Elegant design for wedding invitations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>1.2k</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>234</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>45</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button 
                  className="flex-1" 
                  onClick={handleBuyTemplate}
                  disabled={!isPremiumUser}
                >
                  {isPremiumUser ? (
                    'Buy Template'
                  ) : (
                    <>
                      <Lock className="h-4 w-4 mr-2" />
                      Upgrade to Buy
                    </>
                  )}
                </Button>
                <Button variant="outline" size="icon">
                  <Bookmark className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Bottom Upgrade CTA for free users */}
        {!isPremiumUser && (
          <Card className="border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5">
            <CardContent className="py-8 text-center">
              <h3 className="text-xl font-semibold mb-2">Ready to unlock premium templates?</h3>
              <p className="text-muted-foreground mb-4">
                Upgrade now to access thousands of exclusive designs
              </p>
              <Button onClick={handleUpgradeClick} size="lg">
                <Crown className="h-4 w-4 mr-2" />
                Upgrade to Create
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
