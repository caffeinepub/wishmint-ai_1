import { usePageMeta } from '../hooks/usePageMeta';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Bookmark, Share2, Eye } from 'lucide-react';

export default function MarketplacePage() {
  usePageMeta({
    title: 'Marketplace - WishMint AI',
    description: 'Discover and purchase premium templates from talented creators',
  });

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Marketplace</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover premium templates from talented creators around the world
          </p>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-6">
            <TabsTrigger value="trending">Trending</TabsTrigger>
            <TabsTrigger value="new">New</TabsTrigger>
            <TabsTrigger value="top">Top Rated</TabsTrigger>
            <TabsTrigger value="foryou">For You</TabsTrigger>
            <TabsTrigger value="categories">Categories</TabsTrigger>
            <TabsTrigger value="following">Following</TabsTrigger>
          </TabsList>

          <TabsContent value="trending" className="mt-8">
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
                    <Button className="flex-1">Buy Template</Button>
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
          </TabsContent>

          <TabsContent value="new">
            <p className="text-center text-muted-foreground py-12">New templates coming soon...</p>
          </TabsContent>

          <TabsContent value="top">
            <p className="text-center text-muted-foreground py-12">Top rated templates coming soon...</p>
          </TabsContent>

          <TabsContent value="foryou">
            <p className="text-center text-muted-foreground py-12">Personalized recommendations coming soon...</p>
          </TabsContent>

          <TabsContent value="categories">
            <p className="text-center text-muted-foreground py-12">Browse by category coming soon...</p>
          </TabsContent>

          <TabsContent value="following">
            <p className="text-center text-muted-foreground py-12">Follow creators to see their latest work here...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
