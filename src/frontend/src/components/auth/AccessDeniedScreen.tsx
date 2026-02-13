import { Link } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';

export default function AccessDeniedScreen() {
  return (
    <div className="container flex items-center justify-center min-h-[60vh]">
      <div className="text-center space-y-6 max-w-md">
        <div className="flex justify-center">
          <div className="rounded-full bg-destructive/10 p-6">
            <ShieldAlert className="h-12 w-12 text-destructive" />
          </div>
        </div>
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Access Denied</h1>
          <p className="text-muted-foreground">
            You don't have permission to access this page. This area is restricted to administrators only.
          </p>
        </div>
        <div className="flex gap-3 justify-center">
          <Button asChild variant="outline">
            <Link to="/">Go Home</Link>
          </Button>
          <Button asChild>
            <Link to="/dashboard">Go to Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
