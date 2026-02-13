export interface DesignPreview {
  id: string;
  imageUrl: string;
  title: string;
  customization?: DesignCustomization;
}

export interface DesignCustomization {
  template: string;
  style: string;
  texture: string;
  emojis: string[];
  fontFamily?: string;
  accentColor?: string;
  borderStyle?: string;
}

export interface EditorPreset {
  id: string;
  name: string;
  description: string;
}

export interface StyleOption {
  id: string;
  name: string;
  value: string;
}

export interface TextureOption {
  id: string;
  name: string;
  pattern: string;
}

export interface FontOption {
  id: string;
  name: string;
  family: string;
}

export interface ColorOption {
  id: string;
  name: string;
  value: string;
}

export interface BorderOption {
  id: string;
  name: string;
  value: string;
}
