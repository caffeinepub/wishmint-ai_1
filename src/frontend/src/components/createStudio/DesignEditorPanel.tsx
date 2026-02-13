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
import { 
  templatePresets, 
  styleOptions, 
  textureOptions, 
  defaultEmojis,
  fontOptions,
  accentColorOptions,
  borderStyleOptions
} from './editorPresets';

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
      fontFamily: 'Arial, sans-serif',
      accentColor: 'default',
      borderStyle: 'none',
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

  const handleFontChange = (fontFamily: string) => {
    setCustomization({ ...customization, fontFamily });
  };

  const handleAccentColorChange = (accentColor: string) => {
    setCustomization({ ...customization, accentColor });
  };

  const handleBorderStyleChange = (borderStyle: string) => {
    setCustomization({ ...customization, borderStyle });
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
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="templates">Templates</TabsTrigger>
                    <TabsTrigger value="style">Style</TabsTrigger>
                    <TabsTrigger value="customize">Customize</TabsTrigger>
                  </TabsList>

                  {/* Templates Tab */}
                  <TabsContent value="templates" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Choose Template</CardTitle>
                        <CardDescription>Select a layout style for your design</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {templatePresets.map((template) => (
                            <button
                              key={template.id}
                              onClick={() => handleTemplateChange(template.id)}
                              className={`p-4 border rounded-lg text-left transition-all hover:border-primary ${
                                customization.template === template.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <div className="flex items-start justify-between">
                                <div>
                                  <p className="font-medium">{template.name}</p>
                                  <p className="text-xs text-muted-foreground mt-1">
                                    {template.description}
                                  </p>
                                </div>
                                {customization.template === template.id && (
                                  <Check className="h-4 w-4 text-primary" />
                                )}
                              </div>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Texture</CardTitle>
                        <CardDescription>Add background patterns</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          {textureOptions.map((texture) => (
                            <button
                              key={texture.id}
                              onClick={() => handleTextureChange(texture.id)}
                              className={`p-3 border rounded-lg text-center transition-all hover:border-primary ${
                                customization.texture === texture.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <p className="text-sm font-medium">{texture.name}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Style Tab */}
                  <TabsContent value="style" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Text Style</CardTitle>
                        <CardDescription>Customize text appearance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-3">
                          {styleOptions.map((style) => (
                            <button
                              key={style.id}
                              onClick={() => handleStyleChange(style.id)}
                              className={`p-3 border rounded-lg text-center transition-all hover:border-primary ${
                                customization.style === style.id
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <p className="font-medium">{style.name}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Font Family</CardTitle>
                        <CardDescription>Choose a font for your text</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {fontOptions.map((font) => (
                            <button
                              key={font.id}
                              onClick={() => handleFontChange(font.family)}
                              className={`p-3 border rounded-lg text-center transition-all hover:border-primary ${
                                customization.fontFamily === font.family
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                              style={{ fontFamily: font.family }}
                            >
                              <p className="text-sm font-medium">{font.name}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Emojis</CardTitle>
                        <CardDescription>Add decorative emojis</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex gap-2">
                          <Input
                            value={newEmoji}
                            onChange={(e) => setNewEmoji(e.target.value)}
                            placeholder="Add custom emoji"
                            className="flex-1"
                          />
                          <Button onClick={handleAddEmoji} size="icon">
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        {customization.emojis.length > 0 && (
                          <div className="flex flex-wrap gap-2">
                            {customization.emojis.map((emoji, index) => (
                              <Badge
                                key={index}
                                variant="secondary"
                                className="text-lg cursor-pointer hover:bg-destructive/10"
                                onClick={() => handleRemoveEmoji(emoji)}
                              >
                                {emoji} <X className="h-3 w-3 ml-1" />
                              </Badge>
                            ))}
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label>Quick Add</Label>
                          <div className="flex flex-wrap gap-2">
                            {defaultEmojis.map((emoji) => (
                              <button
                                key={emoji}
                                onClick={() => handleAddDefaultEmoji(emoji)}
                                className="text-2xl hover:scale-110 transition-transform"
                                disabled={customization.emojis.includes(emoji)}
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Customize Tab */}
                  <TabsContent value="customize" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle>Accent Color</CardTitle>
                        <CardDescription>Choose a color theme</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-3 gap-2">
                          {accentColorOptions.map((color) => (
                            <button
                              key={color.id}
                              onClick={() => handleAccentColorChange(color.value)}
                              className={`p-3 border rounded-lg text-center transition-all hover:border-primary ${
                                customization.accentColor === color.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <div className="flex items-center justify-center gap-2">
                                {color.value !== 'default' && (
                                  <div
                                    className="w-4 h-4 rounded-full border"
                                    style={{ backgroundColor: color.value }}
                                  />
                                )}
                                <p className="text-sm font-medium">{color.name}</p>
                              </div>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Border Style</CardTitle>
                        <CardDescription>Add decorative borders</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-2">
                          {borderStyleOptions.map((border) => (
                            <button
                              key={border.id}
                              onClick={() => handleBorderStyleChange(border.value)}
                              className={`p-3 border rounded-lg text-center transition-all hover:border-primary ${
                                customization.borderStyle === border.value
                                  ? 'border-primary bg-primary/5'
                                  : 'border-border'
                              }`}
                            >
                              <p className="text-sm font-medium">{border.name}</p>
                            </button>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </ScrollArea>

            {/* Footer Actions */}
            <div className="p-4 border-t flex gap-2">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Cancel
              </Button>
              <Button onClick={handleApply} className="flex-1">
                Apply Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
