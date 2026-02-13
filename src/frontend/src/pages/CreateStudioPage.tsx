import { usePageMeta } from '../hooks/usePageMeta';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sparkles, Wand2, Smile, Frown, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { toast } from 'sonner';
import { generateDesignPreview } from '../utils/designPreview';

const occasions = [
  'Birthday', 'Anniversary', 'Wedding', 'Engagement', 'Festival', 
  'Farewell', 'Congrats', 'Thank You', 'Sorry', 'Love', 'Friendship', 
  'Invitation', 'Custom'
];

const tones = ['Emotional', 'Funny', 'Formal', 'Cute', 'Romantic', 'Professional'];
const languages = ['English', 'Hindi', 'Hinglish'];

interface DesignPreview {
  id: string;
  imageUrl: string;
  title: string;
}

export default function CreateStudioPage() {
  usePageMeta({
    title: 'Create Studio - WishMint AI',
    description: 'Design beautiful wish cards and invitations with AI',
  });

  const { identity, login } = useInternetIdentity();
  const [occasion, setOccasion] = useState('Birthday');
  const [tone, setTone] = useState('Emotional');
  const [language, setLanguage] = useState('English');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [prompt, setPrompt] = useState('');
  const [extraDetails, setExtraDetails] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedPreviews, setGeneratedPreviews] = useState<DesignPreview[]>([]);

  const handleGenerate = async () => {
    if (!identity) {
      toast.error('Please login to create designs');
      login();
      return;
    }

    if (!prompt.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setIsGenerating(true);
    toast.success('Generating designs...');

    // Simulate generation delay
    setTimeout(() => {
      const previews = generateDesignPreview({
        occasion,
        tone,
        language,
        recipientName,
        senderName,
        prompt,
        extraDetails,
      });

      setGeneratedPreviews(previews);
      setIsGenerating(false);
      toast.success('Designs generated successfully!');
    }, 2000);
  };

  return (
    <div className="container py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <Sparkles className="h-8 w-8 text-primary" />
            Create Studio
          </h1>
          <p className="text-muted-foreground">
            Design beautiful wishes and invitations with AI
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Design Details</CardTitle>
            <CardDescription>Tell us about your design and we'll create something amazing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="occasion">Occasion</Label>
                <Select value={occasion} onValueChange={setOccasion}>
                  <SelectTrigger id="occasion">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {occasions.map((occ) => (
                      <SelectItem key={occ} value={occ}>
                        {occ}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="tone">Tone</Label>
                <Select value={tone} onValueChange={setTone}>
                  <SelectTrigger id="tone">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {tones.map((t) => (
                      <SelectItem key={t} value={t}>
                        {t}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger id="language">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang} value={lang}>
                        {lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="recipient">Recipient Name (Optional)</Label>
                <Input
                  id="recipient"
                  value={recipientName}
                  onChange={(e) => setRecipientName(e.target.value)}
                  placeholder="Who is this for?"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sender">Sender Name (Optional)</Label>
                <Input
                  id="sender"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  placeholder="From whom?"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prompt">Your Message *</Label>
              <Textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your wish message or invitation details..."
                rows={4}
                className="resize-none"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="details">Extra Details (Optional)</Label>
              <Textarea
                id="details"
                value={extraDetails}
                onChange={(e) => setExtraDetails(e.target.value)}
                placeholder="Age, date, venue, theme colors, etc."
                rows={2}
                className="resize-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 pt-4">
              <Button onClick={handleGenerate} size="lg" disabled={isGenerating}>
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Generate Designs
                  </>
                )}
              </Button>
              <Button variant="outline" size="lg" disabled={isGenerating}>
                <Wand2 className="mr-2 h-4 w-4" />
                Improve Prompt
              </Button>
              <Button variant="outline" disabled={isGenerating}>More Formal</Button>
              <Button variant="outline" disabled={isGenerating}>More Funny</Button>
              <Button variant="outline" disabled={isGenerating}>
                <Smile className="mr-2 h-4 w-4" />
                Add Emoji
              </Button>
              <Button variant="outline" disabled={isGenerating}>
                <Frown className="mr-2 h-4 w-4" />
                Remove Emoji
              </Button>
            </div>
          </CardContent>
        </Card>

        {generatedPreviews.length === 0 ? (
          <Card className="bg-muted/50">
            <CardContent className="p-12 text-center">
              {isGenerating ? (
                <div className="space-y-4">
                  <Loader2 className="h-12 w-12 mx-auto animate-spin text-primary" />
                  <p className="text-muted-foreground">
                    Creating your beautiful designs...
                  </p>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  Your generated designs will appear here. Click "Generate Designs" to start creating!
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Generated Designs</CardTitle>
              <CardDescription>
                {generatedPreviews.length} design{generatedPreviews.length > 1 ? 's' : ''} created
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {generatedPreviews.map((preview) => (
                  <div
                    key={preview.id}
                    className="group relative overflow-hidden rounded-lg border bg-card hover:shadow-lg transition-all"
                  >
                    <div className="aspect-[3/4] relative">
                      <img
                        src={preview.imageUrl}
                        alt={preview.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform">
                        <p className="font-medium text-sm">{preview.title}</p>
                        <div className="flex gap-2 mt-2">
                          <Button size="sm" variant="secondary" className="flex-1">
                            Edit
                          </Button>
                          <Button size="sm" variant="secondary" className="flex-1">
                            Download
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
