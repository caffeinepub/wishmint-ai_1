import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useNavigate } from '@tanstack/react-router';

export default function TemplatesPage() {
  usePageMeta({
    title: 'Templates - WishMint AI',
    description: 'Browse beautiful templates for your wishes and invitations',
  });

  const navigate = useNavigate();

  return (
    <div className="container py-8">
      <div className="space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Templates</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse our collection of beautiful templates. Click any template to customize it in Create Studio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-[3/4] bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <p className="text-4xl">🎉</p>
              </div>
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <CardTitle className="text-lg">Birthday Template {i + 1}</CardTitle>
                  <Badge variant="secondary">Free</Badge>
                </div>
                <CardDescription>Perfect for birthday celebrations</CardDescription>
              </CardHeader>
              <CardFooter>
                <Button 
                  className="w-full" 
                  onClick={() => navigate({ to: '/create' })}
                >
                  Use Template
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
