import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Switch } from '@/components/ui/switch';
import { useInternetIdentity } from '../../hooks/useInternetIdentity';
import { useCreatePost } from '../../hooks/useCommunityPosts';
import { toast } from 'sonner';
import { Loader2, Image as ImageIcon, X } from 'lucide-react';

interface CreatePostDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function CreatePostDialog({ open, onOpenChange }: CreatePostDialogProps) {
  const { identity, login, isLoggingIn } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const [postType, setPostType] = useState<'template' | 'sticker'>('template');
  const [title, setTitle] = useState('');
  const [caption, setCaption] = useState('');
  const [professional, setProfessional] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const createPostMutation = useCreatePost();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast.error('Image size must be less than 5MB');
        return;
      }
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setImagePreview(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast.info('Please login to create a post');
      try {
        await login();
      } catch (error) {
        console.error('Login error:', error);
      }
      return;
    }

    if (!caption.trim()) {
      toast.error('Please add a caption');
      return;
    }

    try {
      await createPostMutation.mutateAsync({
        content: caption,
        title: title.trim() || undefined,
        tags: [postType],
        profileCategory: undefined,
        professional,
      });

      toast.success('Post created successfully!');
      
      // Reset form
      setTitle('');
      setCaption('');
      setPostType('template');
      setProfessional(false);
      setImageFile(null);
      setImagePreview(null);
      
      onOpenChange(false);
    } catch (error: any) {
      console.error('Create post error:', error);
      toast.error(error.message || 'Failed to create post');
    }
  };

  const handleCancel = () => {
    setTitle('');
    setCaption('');
    setPostType('template');
    setProfessional(false);
    setImageFile(null);
    setImagePreview(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Create Post
          </DialogTitle>
          <DialogDescription>
            Share your template or sticker with the community
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Post Type */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Type</Label>
            <RadioGroup value={postType} onValueChange={(v) => setPostType(v as 'template' | 'sticker')}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="template" id="template" />
                <Label htmlFor="template" className="font-normal cursor-pointer">
                  Template
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sticker" id="sticker" />
                <Label htmlFor="sticker" className="font-normal cursor-pointer">
                  Sticker
                </Label>
              </div>
            </RadioGroup>
          </div>

          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title" className="text-base font-semibold">
              Title <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            <Input
              id="title"
              placeholder="Give your creation a title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={100}
            />
          </div>

          {/* Caption */}
          <div className="space-y-2">
            <Label htmlFor="caption" className="text-base font-semibold">
              Caption <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="caption"
              placeholder="Describe your creation..."
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              rows={4}
              maxLength={500}
              required
            />
            <p className="text-xs text-muted-foreground text-right">{caption.length}/500</p>
          </div>

          {/* Image Upload */}
          <div className="space-y-2">
            <Label className="text-base font-semibold">
              Image <span className="text-muted-foreground font-normal">(optional)</span>
            </Label>
            {imagePreview ? (
              <div className="relative rounded-lg overflow-hidden border-2 border-dashed border-muted-foreground/25">
                <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover" />
                <Button
                  type="button"
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={handleRemoveImage}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-muted-foreground/25 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs text-muted-foreground">PNG, JPG up to 5MB</p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>

          {/* Professional Toggle */}
          <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
            <div className="space-y-0.5">
              <Label htmlFor="professional" className="text-base font-semibold cursor-pointer">
                Professional Post
              </Label>
              <p className="text-sm text-muted-foreground">Mark this as a professional creation</p>
            </div>
            <Switch id="professional" checked={professional} onCheckedChange={setProfessional} />
          </div>

          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="button" variant="outline" onClick={handleCancel} disabled={createPostMutation.isPending}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={createPostMutation.isPending || isLoggingIn || !caption.trim()}
              className="bg-gradient-to-r from-primary to-accent"
            >
              {createPostMutation.isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : isLoggingIn ? (
                'Logging in...'
              ) : (
                'Create Post'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
