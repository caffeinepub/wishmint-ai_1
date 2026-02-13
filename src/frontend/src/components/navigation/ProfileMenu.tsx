import { useNavigate } from '@tanstack/react-router';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useQueryClient } from '@tanstack/react-query';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, CreditCard, FileText, BarChart3, LogOut } from 'lucide-react';
import { useGetCallerUserProfile } from '../../hooks/useQueries';

export default function ProfileMenu() {
  const { clear } = useInternetIdentity();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: profile } = useGetCallerUserProfile();

  const handleLogout = async () => {
    await clear();
    queryClient.clear();
    navigate({ to: '/' });
  };

  const initials = profile?.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : 'U';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuLabel>
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium">{profile?.name || 'User'}</p>
            {profile?.username && (
              <p className="text-xs text-muted-foreground">@{profile.username}</p>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => navigate({ to: '/dashboard' })}>
          <User className="mr-2 h-4 w-4" />
          <span>Account</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/billing' })}>
          <CreditCard className="mr-2 h-4 w-4" />
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/dashboard' })}>
          <FileText className="mr-2 h-4 w-4" />
          <span>My Designs</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => navigate({ to: '/dashboard' })}>
          <BarChart3 className="mr-2 h-4 w-4" />
          <span>Creator Dashboard</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Logout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
