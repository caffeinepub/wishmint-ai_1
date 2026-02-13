import { EditorPreset, StyleOption, TextureOption } from './types';

export const templatePresets: EditorPreset[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional centered layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary side design' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated top banner' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
  { id: 'vibrant', name: 'Vibrant', description: 'Bold and colorful' },
];

export const styleOptions: StyleOption[] = [
  { id: 'bold', name: 'Bold', value: 'bold' },
  { id: 'light', name: 'Light', value: 'light' },
  { id: 'italic', name: 'Italic', value: 'italic' },
  { id: 'underline', name: 'Underline', value: 'underline' },
  { id: 'shadow', name: 'Shadow', value: 'shadow' },
];

export const textureOptions: TextureOption[] = [
  { id: 'none', name: 'None', pattern: 'none' },
  { id: 'gradient', name: 'Gradient', pattern: 'gradient' },
  { id: 'dots', name: 'Dots', pattern: 'dots' },
  { id: 'stripes', name: 'Stripes', pattern: 'stripes' },
  { id: 'waves', name: 'Waves', pattern: 'waves' },
  { id: 'confetti', name: 'Confetti', pattern: 'confetti' },
];

export const defaultEmojis = ['🎉', '🎊', '🎈', '🎁', '✨', '💝', '🌟', '🎂', '🥳', '💐', '🌺', '🎵'];
