const STYLE_CACHE = new Map<string, string>();
const STYLE_SHEET_ID = 'astro-sauce-styles';

function generateHash(content: string): string {
  let hash = 0;
  for (let i = 0; i < content.length; i++) {
    const char = content.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(36);
}

function generateClassName(hash: string): string {
  return `astro-sauce-${hash}`;
}

function injectStyles(css: string): void {
  if (STYLE_CACHE.has(css)) return;
  
  STYLE_CACHE.set(css, css);
  
  let styleSheet = document.getElementById(STYLE_SHEET_ID) as HTMLStyleElement | null;
  
  if (!styleSheet) {
    styleSheet = document.createElement('style');
    styleSheet.id = STYLE_SHEET_ID;
    styleSheet.type = 'text/css';
    document.head.appendChild(styleSheet);
  }
  
  const existingStyles = styleSheet.textContent || '';
  if (!existingStyles.includes(css)) {
    styleSheet.textContent = existingStyles + '\n' + css;
  }
}

export type CSSResult = string;

export interface CSSOptions {
  hash?: boolean;
}

export function css(strings: TemplateStringsArray, ...values: unknown[]): CSSResult {
  let cssContent = '';
  
  for (let i = 0; i < strings.length; i++) {
    cssContent += strings[i];
    
    if (i < values.length) {
      const value = values[i];
      
      if (typeof value === 'string') {
        if (value.startsWith('astro-sauce-')) {
          cssContent += value;
        } else {
          cssContent += String(value);
        }
      } else if (Array.isArray(value)) {
        cssContent += value.map(v => {
          if (typeof v === 'string' && v.startsWith('astro-sauce-')) {
            return v;
          }
          return String(v);
        }).join(' ');
      } else if (typeof value === 'string') {
        cssContent += value;
      } else {
        cssContent += String(value);
      }
    }
  }
  
  const hash = generateHash(cssContent);
  const className = generateClassName(hash);
  
  if (typeof window !== 'undefined') {
    injectStyles(`.${className} { ${cssContent} }`);
  }
  
  return className;
}

export function keyframes(strings: TemplateStringsArray, ...values: unknown[]): string {
  let keyframesContent = '';
  
  for (let i = 0; i < strings.length; i++) {
    keyframesContent += strings[i];
    
    if (i < values.length) {
      const value = values[i];
      keyframesContent += typeof value === 'string' ? value : String(value);
    }
  }
  
  const hash = generateHash(keyframesContent);
  const animationName = `astro-sauce-keyframe-${hash}`;
  
  if (typeof window !== 'undefined') {
    injectStyles(`@keyframes ${animationName} { ${keyframesContent} }`);
  }
  
  return animationName;
}

export function global(strings: TemplateStringsArray, ...values: unknown[]): void {
  let cssContent = '';
  
  for (let i = 0; i < strings.length; i++) {
    cssContent += strings[i];
    
    if (i < values.length) {
      const value = values[i];
      cssContent += typeof value === 'string' ? value : String(value);
    }
  }
  
  if (typeof window !== 'undefined') {
    injectStyles(cssContent);
  }
}

export function reset(): void {
  STYLE_CACHE.clear();
  const styleSheet = document.getElementById(STYLE_SHEET_ID);
  if (styleSheet) {
    styleSheet.remove();
  }
}

export const _internal = {
  injectStyles,
  STYLE_CACHE,
  STYLE_SHEET_ID
};

export const style = css;
export const keyframe = keyframes;
export const globalStyle = global;