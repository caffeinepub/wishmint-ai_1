import { EditorPreset, StyleOption, TextureOption, FontOption, ColorOption, BorderOption } from './types';

export const templatePresets: EditorPreset[] = [
  { id: 'classic', name: 'Classic', description: 'Traditional centered layout' },
  { id: 'modern', name: 'Modern', description: 'Contemporary side design' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated top banner' },
  { id: 'minimal', name: 'Minimal', description: 'Clean and simple' },
  { id: 'vibrant', name: 'Vibrant', description: 'Bold and colorful' },
  { id: 'artistic', name: 'Artistic', description: 'Creative asymmetric layout' },
  { id: 'vintage', name: 'Vintage', description: 'Classic retro style' },
  { id: 'geometric', name: 'Geometric', description: 'Modern shapes and patterns' },
  { id: 'floral', name: 'Floral', description: 'Nature-inspired design' },
  { id: 'luxury', name: 'Luxury', description: 'Premium elegant look' },
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
  { id: 'sparkles', name: 'Sparkles', pattern: 'sparkles' },
  { id: 'hearts', name: 'Hearts', pattern: 'hearts' },
  { id: 'stars', name: 'Stars', pattern: 'stars' },
  { id: 'bubbles', name: 'Bubbles', pattern: 'bubbles' },
  { id: 'floral', name: 'Floral', pattern: 'floral' },
  { id: 'geometric', name: 'Geometric', pattern: 'geometric' },
];

export const fontOptions: FontOption[] = [
  { id: 'arial', name: 'Arial', family: 'Arial, sans-serif' },
  { id: 'georgia', name: 'Georgia', family: 'Georgia, serif' },
  { id: 'times', name: 'Times New Roman', family: '"Times New Roman", serif' },
  { id: 'courier', name: 'Courier', family: '"Courier New", monospace' },
  { id: 'verdana', name: 'Verdana', family: 'Verdana, sans-serif' },
  { id: 'trebuchet', name: 'Trebuchet', family: '"Trebuchet MS", sans-serif' },
  { id: 'palatino', name: 'Palatino', family: '"Palatino Linotype", serif' },
  { id: 'impact', name: 'Impact', family: 'Impact, sans-serif' },
];

export const accentColorOptions: ColorOption[] = [
  { id: 'default', name: 'Default', value: 'default' },
  { id: 'rose', name: 'Rose', value: '#FF6B9D' },
  { id: 'purple', name: 'Purple', value: '#9B59B6' },
  { id: 'blue', name: 'Blue', value: '#3498DB' },
  { id: 'green', name: 'Green', value: '#2ECC71' },
  { id: 'orange', name: 'Orange', value: '#F39C12' },
  { id: 'red', name: 'Red', value: '#E74C3C' },
  { id: 'teal', name: 'Teal', value: '#1ABC9C' },
  { id: 'gold', name: 'Gold', value: '#F8B500' },
];

export const borderStyleOptions: BorderOption[] = [
  { id: 'none', name: 'None', value: 'none' },
  { id: 'solid', name: 'Solid', value: 'solid' },
  { id: 'dashed', name: 'Dashed', value: 'dashed' },
  { id: 'dotted', name: 'Dotted', value: 'dotted' },
  { id: 'double', name: 'Double', value: 'double' },
  { id: 'rounded', name: 'Rounded', value: 'rounded' },
  { id: 'shadow', name: 'Shadow', value: 'shadow' },
];

export const defaultEmojis = ['🎉', '🎊', '🎈', '🎁', '✨', '💝', '🌟', '🎂', '🥳', '💐', '🌺', '🎵'];
