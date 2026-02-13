import { useState } from 'react';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Menu, Sparkles } from 'lucide-react';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import ProfileMenu from './ProfileMenu';

const navItems = [
  { label: 'Home', path: '/' },
  { label: 'Create', path: '/create' },
  { label: 'Templates', path: '/templates' },
  { label: 'Marketplace', path: '/marketplace' },
  { label: 'Community', path: '/community' },
  { label: 'Pricing', path: '/pricing' },
  { label: 'Creators', path: '/creators' },
  { label: 'FAQ', path: '/faq' },
  { label: 'Blog', path: '/blog' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const navigate = useNavigate();
  const isAuthenticated = !!identity;

  const handleLogin = () => {
    login();
  };

  const handleUpgrade = () => {
    navigate({ to: '/pricing' });
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link to="/" className="flex items-center gap-2 font-bold text-xl">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              WishMint AI
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors focus-ring rounded-sm px-1"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={handleUpgrade}
                className="hidden sm:inline-flex"
              >
                Upgrade
              </Button>
              <ProfileMenu />
            </>
          ) : (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="hidden sm:inline-flex"
              >
                {isLoggingIn ? 'Logging in...' : 'Login'}
              </Button>
              <Button
                size="sm"
                onClick={handleLogin}
                disabled={isLoggingIn}
                className="hidden sm:inline-flex"
              >
                Sign up
              </Button>
            </>
          )}

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg font-medium hover:text-primary transition-colors focus-ring rounded-sm px-2 py-1"
                  >
                    {item.label}
                  </Link>
                ))}
                <div className="border-t pt-4 mt-4 space-y-2">
                  {isAuthenticated ? (
                    <Button onClick={handleUpgrade} className="w-full">
                      Upgrade
                    </Button>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className="w-full"
                      >
                        {isLoggingIn ? 'Logging in...' : 'Login'}
                      </Button>
                      <Button
                        onClick={handleLogin}
                        disabled={isLoggingIn}
                        className="w-full"
                      >
                        Sign up
                      </Button>
                    </>
                  )}
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
