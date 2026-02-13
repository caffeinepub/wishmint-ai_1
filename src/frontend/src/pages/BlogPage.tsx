import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock } from 'lucide-react';

export default function BlogPage() {
  usePageMeta({
    title: 'Blog - WishMint AI',
    description: 'Latest news, tips, and updates from WishMint AI',
  });

  const posts = [
    {
      title: 'Getting Started with WishMint AI',
      excerpt: 'Learn how to create your first stunning wish card in minutes',
      category: 'Tutorial',
      date: '2026-02-10',
      readTime: '5 min read',
    },
    {
      title: '10 Tips for Better Design Results',
      excerpt: 'Maximize your AI-generated designs with these expert tips',
      category: 'Tips',
      date: '2026-02-08',
      readTime: '7 min read',
    },
    {
      title: 'Introducing Pro Plan Features',
      excerpt: 'Discover the powerful new features available in our Pro plan',
      category: 'Product',
      date: '2026-02-05',
      readTime: '4 min read',
    },
  ];

  return (
    <div className="container py-8">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Blog</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Latest news, tips, and updates from the WishMint AI team
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 rounded-t-lg" />
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Read More
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
