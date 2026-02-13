import { DesignCustomization } from '../components/createStudio/types';

interface DesignInputs {
  occasion: string;
  tone: string;
  language: string;
  recipientName: string;
  senderName: string;
  prompt: string;
  extraDetails: string;
}

interface DesignPreview {
  id: string;
  imageUrl: string;
  title: string;
  customization?: DesignCustomization;
}

export function generateDesignPreview(inputs: DesignInputs): DesignPreview[] {
  const { occasion, tone, recipientName, prompt } = inputs;
  
  // Generate deterministic preview images based on inputs
  const previews: DesignPreview[] = [];
  
  // Create 3 different design variations
  for (let i = 0; i < 3; i++) {
    const seed = `${occasion}-${tone}-${prompt}-${i}`.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Generate color based on occasion
    const colors = getOccasionColors(occasion);
    const bgColor = colors[i % colors.length];
    
    // Create SVG preview
    const svg = createDesignSVG({
      occasion,
      tone,
      recipientName,
      prompt: prompt.substring(0, 100),
      bgColor,
      variant: i + 1,
    });
    
    const imageUrl = `data:image/svg+xml;base64,${btoa(svg)}`;
    
    previews.push({
      id: `design-${seed}-${i}`,
      imageUrl,
      title: `${occasion} Design ${i + 1}`,
    });
  }
  
  return previews;
}

export function applyCustomization(
  baseDesign: DesignPreview,
  inputs: DesignInputs,
  customization: DesignCustomization
): string {
  const { occasion, recipientName, prompt } = inputs;
  const colors = getOccasionColors(occasion);
  const bgColor = colors[0];
  
  // Determine variant based on template
  const templateVariantMap: Record<string, number> = {
    classic: 1,
    modern: 2,
    elegant: 3,
    minimal: 1,
    vibrant: 2,
  };
  
  const variant = templateVariantMap[customization.template] || 1;
  
  const svg = createDesignSVG({
    occasion,
    tone: inputs.tone,
    recipientName,
    prompt: prompt.substring(0, 100),
    bgColor,
    variant,
    customization,
  });
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

function getOccasionColors(occasion: string): string[] {
  const colorMap: Record<string, string[]> = {
    Birthday: ['#FF6B9D', '#C44569', '#FFA07A'],
    Anniversary: ['#E74C3C', '#C0392B', '#FF6B81'],
    Wedding: ['#F8B500', '#FFD700', '#FFA500'],
    Engagement: ['#FF69B4', '#FF1493', '#DB7093'],
    Festival: ['#FF6347', '#FFD700', '#FF4500'],
    Farewell: ['#4A90E2', '#5DADE2', '#3498DB'],
    Congrats: ['#2ECC71', '#27AE60', '#52BE80'],
    'Thank You': ['#9B59B6', '#8E44AD', '#AF7AC5'],
    Sorry: ['#95A5A6', '#7F8C8D', '#BDC3C7'],
    Love: ['#E74C3C', '#C0392B', '#EC7063'],
    Friendship: ['#F39C12', '#E67E22', '#F8B500'],
    Invitation: ['#3498DB', '#2980B9', '#5DADE2'],
    Custom: ['#1ABC9C', '#16A085', '#48C9B0'],
  };
  
  return colorMap[occasion] || colorMap.Custom;
}

function createDesignSVG(params: {
  occasion: string;
  tone: string;
  recipientName: string;
  prompt: string;
  bgColor: string;
  variant: number;
  customization?: DesignCustomization;
}): string {
  const { occasion, recipientName, prompt, bgColor, variant, customization } = params;
  
  const displayName = recipientName || 'You';
  const shortPrompt = prompt.length > 80 ? prompt.substring(0, 77) + '...' : prompt;
  
  // Apply style modifications
  let textStyle = 'font-weight: bold;';
  if (customization?.style === 'light') {
    textStyle = 'font-weight: 300;';
  } else if (customization?.style === 'italic') {
    textStyle = 'font-weight: bold; font-style: italic;';
  } else if (customization?.style === 'underline') {
    textStyle = 'font-weight: bold; text-decoration: underline;';
  } else if (customization?.style === 'shadow') {
    textStyle = 'font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.3);';
  }
  
  // Apply texture
  let texturePattern = '';
  if (customization?.texture === 'gradient') {
    texturePattern = `
      <defs>
        <linearGradient id="texGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:0.1" />
          <stop offset="100%" style="stop-color:${adjustColor(bgColor, -30)};stop-opacity:0.2" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#texGrad)"/>
    `;
  } else if (customization?.texture === 'dots') {
    texturePattern = `
      <defs>
        <pattern id="dots" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
          <circle cx="10" cy="10" r="2" fill="${bgColor}" opacity="0.2"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dots)"/>
    `;
  } else if (customization?.texture === 'stripes') {
    texturePattern = `
      <defs>
        <pattern id="stripes" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect x="0" y="0" width="5" height="10" fill="${bgColor}" opacity="0.1"/>
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#stripes)"/>
    `;
  } else if (customization?.texture === 'waves') {
    texturePattern = `
      <path d="M0,300 Q100,250 200,300 T400,300 L400,600 L0,600 Z" fill="${bgColor}" opacity="0.1"/>
      <path d="M0,350 Q100,300 200,350 T400,350 L400,600 L0,600 Z" fill="${bgColor}" opacity="0.08"/>
    `;
  } else if (customization?.texture === 'confetti') {
    const confettiShapes = Array.from({ length: 15 }, (_, i) => {
      const x = (i * 73) % 400;
      const y = (i * 97) % 600;
      const size = 5 + (i % 3) * 3;
      return `<circle cx="${x}" cy="${y}" r="${size}" fill="${bgColor}" opacity="0.15"/>`;
    }).join('');
    texturePattern = confettiShapes;
  }
  
  // Add emojis
  let emojiElements = '';
  if (customization?.emojis && customization.emojis.length > 0) {
    emojiElements = customization.emojis.map((emoji, index) => {
      const positions = [
        { x: '15%', y: '15%' },
        { x: '85%', y: '15%' },
        { x: '15%', y: '85%' },
        { x: '85%', y: '85%' },
        { x: '50%', y: '10%' },
        { x: '10%', y: '50%' },
        { x: '90%', y: '50%' },
        { x: '50%', y: '90%' },
      ];
      const pos = positions[index % positions.length];
      return `<text x="${pos.x}" y="${pos.y}" font-size="32" text-anchor="middle">${emoji}</text>`;
    }).join('');
  }
  
  // Create different layouts for each variant
  const layouts = [
    // Variant 1: Centered text
    `
      <rect width="100%" height="100%" fill="${bgColor}"/>
      ${texturePattern}
      <rect x="10%" y="10%" width="80%" height="80%" fill="white" opacity="0.95" rx="20"/>
      <text x="50%" y="30%" font-family="Arial, sans-serif" font-size="32" fill="${bgColor}" text-anchor="middle" style="${textStyle}">
        ${escapeXml(occasion)}
      </text>
      <text x="50%" y="45%" font-family="Arial, sans-serif" font-size="24" fill="#333" text-anchor="middle">
        Dear ${escapeXml(displayName)}
      </text>
      <foreignObject x="15%" y="50%" width="70%" height="30%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial; font-size: 16px; color: #555; text-align: center; padding: 10px;">
          ${escapeXml(shortPrompt)}
        </div>
      </foreignObject>
      <circle cx="50%" cy="20%" r="30" fill="white" opacity="0.3"/>
      <circle cx="20%" cy="80%" r="40" fill="white" opacity="0.2"/>
      <circle cx="80%" cy="85%" r="35" fill="white" opacity="0.2"/>
      ${emojiElements}
    `,
    // Variant 2: Side design
    `
      <defs>
        <linearGradient id="grad${variant}" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:${bgColor};stop-opacity:1" />
          <stop offset="100%" style="stop-color:${adjustColor(bgColor, -20)};stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad${variant})"/>
      ${texturePattern}
      <rect x="5%" y="5%" width="90%" height="90%" fill="white" opacity="0.95" rx="15"/>
      <rect x="0" y="0" width="30%" height="100%" fill="${bgColor}" opacity="0.8"/>
      <text x="15%" y="50%" font-family="Arial, sans-serif" font-size="28" fill="white" text-anchor="middle" transform="rotate(-90 60 300)" style="${textStyle}">
        ${escapeXml(occasion)}
      </text>
      <text x="60%" y="25%" font-family="Arial, sans-serif" font-size="26" fill="${bgColor}" text-anchor="middle" style="${textStyle}">
        ${escapeXml(displayName)}
      </text>
      <foreignObject x="35%" y="30%" width="60%" height="60%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial; font-size: 18px; color: #444; padding: 20px;">
          ${escapeXml(shortPrompt)}
        </div>
      </foreignObject>
      ${emojiElements}
    `,
    // Variant 3: Top banner
    `
      <rect width="100%" height="100%" fill="white"/>
      ${texturePattern}
      <rect x="0" y="0" width="100%" height="25%" fill="${bgColor}"/>
      <text x="50%" y="15%" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" style="${textStyle}">
        ${escapeXml(occasion)}
      </text>
      <rect x="10%" y="30%" width="80%" height="60%" fill="${bgColor}" opacity="0.05" rx="10"/>
      <text x="50%" y="40%" font-family="Arial, sans-serif" font-size="24" fill="${bgColor}" text-anchor="middle">
        For ${escapeXml(displayName)}
      </text>
      <foreignObject x="15%" y="45%" width="70%" height="40%">
        <div xmlns="http://www.w3.org/1999/xhtml" style="font-family: Arial; font-size: 17px; color: #333; text-align: center; padding: 15px; line-height: 1.6;">
          ${escapeXml(shortPrompt)}
        </div>
      </foreignObject>
      <circle cx="10%" cy="90%" r="25" fill="${bgColor}" opacity="0.3"/>
      <circle cx="90%" cy="90%" r="25" fill="${bgColor}" opacity="0.3"/>
      ${emojiElements}
    `,
  ];
  
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 600" width="400" height="600">
      ${layouts[variant - 1]}
    </svg>
  `;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function adjustColor(color: string, amount: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
