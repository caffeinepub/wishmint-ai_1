import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useSaveCallerUserProfile } from '../../hooks/useQueries';
import { toast } from 'sonner';

interface ProfileSetupModalProps {
  open: boolean;
  onClose: () => void;
}

export default function ProfileSetupModal({ open, onClose }: ProfileSetupModalProps) {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [bio, setBio] = useState('');
  const [category, setCategory] = useState('');
  const saveProfile = useSaveCallerUserProfile();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      toast.error('Please enter your name');
      return;
    }

    try {
      await saveProfile.mutateAsync({
        name: name.trim(),
        username: username.trim() || name.trim().toLowerCase().replace(/\s+/g, ''),
        bio: bio.trim(),
        category: category.trim() || undefined,
      });
      toast.success('Profile created successfully!');
      onClose();
    } catch (error) {
      toast.error('Failed to create profile. Please try again.');
      console.error('Profile creation error:', error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Welcome to WishMint AI!</DialogTitle>
          <DialogDescription>
            Let's set up your profile to get started. You can always update this later.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="@username (optional)"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell us about yourself (optional)"
              rows={3}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="category">Category Focus</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              placeholder="e.g., Weddings, Birthdays (optional)"
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <Button type="submit" disabled={saveProfile.isPending}>
              {saveProfile.isPending ? 'Creating...' : 'Create Profile'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
