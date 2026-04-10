function generateId(): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let hash = '';
  for (let i = 0; i < 6; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return `astro-sauce-${hash}`;
}

function processStyles(strings: TemplateStringsArray, values: any[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
}

export interface StyledResult {
  className: string;
  css: string;
}

function createStyledResult(cssString: string): StyledResult {
  const className = generateId();
  return {
    className,
    css: `.${className} { ${cssString} }`
  };
}

export function css(strings: TemplateStringsArray, ...values: any[]): StyledResult {
  const cssString = processStyles(strings, values);
  return createStyledResult(cssString);
}

export function styled(tag: string) {
  return (strings: TemplateStringsArray, ...values: any[]): StyledResult => {
    const cssString = processStyles(strings, values);
    return createStyledResult(cssString);
  };
}

export function globalStyles(strings: TemplateStringsArray, ...values: any[]) {
  const cssString = processStyles(strings, values);
  
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssString;
    document.head.appendChild(styleEl);
  }
  
  return null;
}

export function injectStyles(cssList: string[]) {
  if (typeof document !== 'undefined') {
    const styleEl = document.createElement('style');
    styleEl.textContent = cssList.join('\n');
    document.head.appendChild(styleEl);
  }
  return null;
}