let styleId = 0;

function injectStyles(css: string): string {
  if (typeof document === 'undefined') return css;
  
  const id = `astro-sauce-${styleId++}`;
  const styleEl = document.createElement('style');
  styleEl.id = id;
  styleEl.textContent = css;
  document.head.appendChild(styleEl);
  return id;
}

export function css(strings: TemplateStringsArray, ...values: any[]) {
  const cssString = strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
  
  injectStyles(cssString);
  return null;
}

export function styled(tag: string) {
  return (strings: TemplateStringsArray, ...values: any[]) => {
    const cssString = strings.reduce((result, str, i) => {
      return result + str + (values[i] ?? '');
    }, '');
    
    const className = `astro-sauce-${styleId++}`;
    const styleEl = document.createElement('style');
    styleEl.className = className;
    styleEl.textContent = `.${className} { ${cssString} }`;
    document.head.appendChild(styleEl);
    
    return (props: Record<string, string> = {}) => {
      const attrs = Object.entries(props)
        .map(([k, v]) => `${k}="${v}"`)
        .join(' ');
      return `<${tag} class="${className}" ${attrs} />`;
    };
  };
}

export function globalStyles(strings: TemplateStringsArray, ...values: any[]) {
  const cssString = strings.reduce((result, str, i) => {
    return result + str + (values[i] ?? '');
  }, '');
  
  injectStyles(cssString);
  return null;
}