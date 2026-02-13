import { usePageMeta } from '../hooks/usePageMeta';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { Home, Search } from 'lucide-react';

export default function NotFoundPage() {
  usePageMeta({
    title: '404 - Page Not Found - WishMint AI',
    description: 'The page you are looking for does not exist',
  });

  return (
    <div className="container flex items-center justify-center min-h-[70vh]">
      <div className="text-center space-y-6 max-w-md">
        <div className="space-y-2">
          <h1 className="text-9xl font-bold text-primary">404</h1>
          <h2 className="text-3xl font-bold">Page Not Found</h2>
          <p className="text-muted-foreground">
            Sorry, we could not find the page you are looking for. It might have been moved or deleted.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <Link to="/">
              <Home className="mr-2 h-4 w-4" />
              Go Home
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/marketplace">
              <Search className="mr-2 h-4 w-4" />
              Browse Marketplace
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
