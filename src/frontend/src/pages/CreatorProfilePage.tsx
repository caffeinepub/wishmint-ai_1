import { useParams } from '@tanstack/react-router';
import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Users, Eye, DollarSign, Star } from 'lucide-react';

export default function CreatorProfilePage() {
  const { username } = useParams({ strict: false });

  usePageMeta({
    title: `${username} - Creator Profile - WishMint AI`,
    description: `View ${username}'s profile and templates`,
  });

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
              <Avatar className="h-24 w-24">
                <AvatarFallback className="text-3xl">
                  {username?.slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">Creator Name</h1>
                  <Badge>Pro Creator</Badge>
                </div>
                <p className="text-muted-foreground">@{username}</p>
                <p className="text-sm">
                  Passionate designer creating beautiful templates for special occasions. 
                  Specializing in weddings and celebrations.
                </p>
              </div>
              <div className="flex gap-2">
                <Button>Follow</Button>
                <Button variant="outline">Hire Me</Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <Users className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">1.2k</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Eye className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">45k</p>
                <p className="text-sm text-muted-foreground">Total Views</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <DollarSign className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">234</p>
                <p className="text-sm text-muted-foreground">Sales</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <Star className="h-5 w-5 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">4.9</p>
                <p className="text-sm text-muted-foreground">Rating</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="portfolio" className="w-full">
          <TabsList>
            <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="portfolio" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                    <p className="text-4xl">✨</p>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">Template {i + 1}</CardTitle>
                    <CardDescription>Beautiful design</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button className="w-full">View Details</Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="reviews" className="mt-6">
            <p className="text-center text-muted-foreground py-12">Reviews coming soon...</p>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
