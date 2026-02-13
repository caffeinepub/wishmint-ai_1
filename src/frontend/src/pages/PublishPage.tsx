import { usePageMeta } from '../hooks/usePageMeta';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function PublishPage() {
  usePageMeta({
    title: 'Publish - WishMint AI',
    description: 'Share your designs with the world',
  });

  const { identity, login } = useInternetIdentity();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('free');

  const handlePublish = () => {
    if (!identity) {
      toast.error('Please login to publish');
      login();
      return;
    }

    if (!title.trim()) {
      toast.error('Please enter a title');
      return;
    }

    toast.success('Template published successfully!');
  };

  return (
    <div className="container py-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold">Publish Template</h1>
          <p className="text-muted-foreground">
            Share your designs with the community or sell premium templates
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Template Details</CardTitle>
            <CardDescription>Provide information about your template</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="type">Template Type</Label>
              <Select value={type} onValueChange={setType}>
                <SelectTrigger id="type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="free">Free Template</SelectItem>
                  <SelectItem value="paid">Paid Premium Template</SelectItem>
                  <SelectItem value="prompt">AI Prompt Pack</SelectItem>
                  <SelectItem value="custom">Custom Order Listing</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="preview">Preview Image</Label>
              <div className="border-2 border-dashed rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">Click to upload preview image</p>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your template a catchy title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your template and what makes it special"
                rows={4}
              />
            </div>

            {type === 'paid' && (
              <div className="space-y-2">
                <Label htmlFor="price">Price (₹)</Label>
                <Input
                  id="price"
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="299"
                />
              </div>
            )}

            <div className="flex gap-3 pt-4">
              <Button onClick={handlePublish} size="lg">
                Publish Template
              </Button>
              <Button variant="outline" size="lg">
                Save Draft
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
