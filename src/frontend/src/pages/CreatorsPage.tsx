import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';
import { Users, Eye, DollarSign } from 'lucide-react';

export default function CreatorsPage() {
  usePageMeta({
    title: 'Creators - WishMint AI',
    description: 'Discover talented creators and their amazing templates',
  });

  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Creators Directory</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover talented creators and follow them to see their latest work
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 9 }).map((_, i) => (
            <Card key={i} className="hover:shadow-lg transition-shadow">
              <CardHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl">C{i + 1}</AvatarFallback>
                  </Avatar>
                </div>
                <CardTitle>Creator {i + 1}</CardTitle>
                <CardDescription>@creator{i + 1}</CardDescription>
                <div className="pt-2">
                  <Badge variant="secondary">Pro Creator</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>1.2k followers</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Eye className="h-4 w-4" />
                    <span>45k views</span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-4 w-4" />
                    <span>234 sales</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button 
                  className="flex-1"
                  onClick={() => navigate({ to: `/creator/creator${i + 1}` })}
                >
                  View Profile
                </Button>
                <Button variant="outline" className="flex-1">
                  Follow
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
