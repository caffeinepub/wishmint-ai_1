import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Check } from 'lucide-react';
import { DesignPreview, DesignCustomization } from './types';
import { templatePresets, styleOptions, textureOptions, defaultEmojis } from './editorPresets';

interface DesignEditorPanelProps {
  design: DesignPreview;
  onClose: () => void;
  onApply: (customization: DesignCustomization) => void;
}

export default function DesignEditorPanel({ design, onClose, onApply }: DesignEditorPanelProps) {
  const [customization, setCustomization] = useState<DesignCustomization>(
    design.customization || {
      template: 'classic',
      style: 'bold',
      texture: 'none',
      emojis: [],
    }
  );

  const [newEmoji, setNewEmoji] = useState('');

  const handleTemplateChange = (templateId: string) => {
    setCustomization({ ...customization, template: templateId });
  };

  const handleStyleChange = (styleId: string) => {
    setCustomization({ ...customization, style: styleId });
  };

  const handleTextureChange = (textureId: string) => {
    setCustomization({ ...customization, texture: textureId });
  };

  const handleAddEmoji = () => {
    if (newEmoji.trim() && !customization.emojis.includes(newEmoji.trim())) {
      setCustomization({
        ...customization,
        emojis: [...customization.emojis, newEmoji.trim()],
      });
      setNewEmoji('');
    }
  };

  const handleRemoveEmoji = (emoji: string) => {
    setCustomization({
      ...customization,
      emojis: customization.emojis.filter((e) => e !== emoji),
    });
  };

  const handleAddDefaultEmoji = (emoji: string) => {
    if (!customization.emojis.includes(emoji)) {
      setCustomization({
        ...customization,
        emojis: [...customization.emojis, emoji],
      });
    }
  };

  const handleApply = () => {
    onApply(customization);
  };

  return (
    <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm">
      <div className="fixed inset-4 md:inset-8 lg:inset-16 bg-background border rounded-lg shadow-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h2 className="text-2xl font-bold">Edit Design</h2>
            <p className="text-sm text-muted-foreground">{design.title}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden flex flex-col lg:flex-row">
          {/* Preview */}
          <div className="lg:w-1/2 p-6 border-b lg:border-b-0 lg:border-r flex items-center justify-center bg-muted/30">
            <div className="max-w-md w-full">
              <img
                src={design.imageUrl}
                alt={design.title}
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>

          {/* Editor Controls */}
          <div className="lg:w-1/2 flex flex-col">
            <ScrollArea className="flex-1">
              <div className="p-6">
                <Tabs defaultValue="templates" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="texture">Texture</TabsTrigger>
                    <TabsTrigger value="emojis">Emojis</TabsTrigger>
                  </TabsList>

                  {/* Templates Tab */}
                  <TabsContent value="templates" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Choose a Template</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {templatePresets.map((preset) => (
                          <Card
                            key={preset.id}
                            className={`cursor-pointer transition-all hover:shadow-md ${
                              customization.template === preset.id
                                ? 'ring-2 ring-primary'
                                : ''
                            }`}
                            onClick={() => handleTemplateChange(preset.id)}
                          >
                            <CardHeader className="p-4">
                              <div className="flex items-center justify-between">
                                <div>
                                  <CardTitle className="text-base">{preset.name}</CardTitle>
                                  <CardDescription className="text-sm">
                                    {preset.description}
                                  </CardDescription>
                                </div>
                                {customization.template === preset.id && (
                                  <Check className="h-5 w-5 text-primary" />
                                )}
                              </div>
                            </CardHeader>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Style Tab */}
                  <TabsContent value="style" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Text Style</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {styleOptions.map((style) => (
                          <Button
                            key={style.id}
                            variant={customization.style === style.id ? 'default' : 'outline'}
                            className="h-auto py-4"
                            onClick={() => handleStyleChange(style.id)}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-semibold">{style.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Texture Tab */}
                  <TabsContent value="texture" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Background Texture</h3>
                      <div className="grid grid-cols-2 gap-3">
                        {textureOptions.map((texture) => (
                          <Button
                            key={texture.id}
                            variant={customization.texture === texture.id ? 'default' : 'outline'}
                            className="h-auto py-4"
                            onClick={() => handleTextureChange(texture.id)}
                          >
                            <div className="flex flex-col items-center gap-1">
                              <span className="font-semibold">{texture.name}</span>
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  {/* Emojis Tab */}
                  <TabsContent value="emojis" className="space-y-4 mt-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Add Emojis</h3>
                      
                      {/* Current Emojis */}
                      {customization.emojis.length > 0 && (
                        <div className="mb-4">
                          <Label className="text-sm text-muted-foreground mb-2 block">
                            Current Emojis
                          </Label>
                          <div className="flex flex-wrap gap-2">
                            {customization.emojis.map((emoji, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-lg px-3 py-1 cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
                                onClick={() => handleRemoveEmoji(emoji)}
                              >
                                {emoji}
                                <X className="ml-1 h-3 w-3" />
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Add Custom Emoji */}
                      <div className="space-y-2">
                        <Label htmlFor="emoji-input">Add Custom Emoji</Label>
                        <div className="flex gap-2">
                          <Input
                            id="emoji-input"
                            value={newEmoji}
                            onChange={(e) => setNewEmoji(e.target.value)}
                            placeholder="Type or paste emoji..."
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') {
                                e.preventDefault();
                                handleAddEmoji();
                              }
                            }}
                          />
                          <Button onClick={handleAddEmoji} size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Quick Add Emojis */}
                      <div className="mt-4">
                        <Label className="text-sm text-muted-foreground mb-2 block">
                          Quick Add
                        </Label>
                        <div className="flex flex-wrap gap-2">
                          {defaultEmojis.map((emoji, index) => (
                            <Button
                              key={index}
                              variant="outline"
                              size="sm"
                              className="text-xl px-3 py-2 h-auto"
                              onClick={() => handleAddDefaultEmoji(emoji)}
                              disabled={customization.emojis.includes(emoji)}
                            >
                              {emoji}
                            </Button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-4 border-t flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleApply}>
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
