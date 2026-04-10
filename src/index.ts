export function css(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
}

export function styled(tag: string) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    return strings.reduce((result, str, i) => {
      return result + str + (values[i] ?? '');
    }, '');
  };
}

export function globalStyles(strings: TemplateStringsArray, ...values: any[]) {
  const cssString = strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
  
  if (typeof document !== 'undefined') {
    const styleId = 'astro-sauce-global-styles';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = styleId;
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = cssString;
  }
  return null;
}