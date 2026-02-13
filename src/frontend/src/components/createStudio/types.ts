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
