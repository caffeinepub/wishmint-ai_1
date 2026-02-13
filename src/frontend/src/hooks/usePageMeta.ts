import { useEffect } from 'react';

interface PageMetaOptions {
  title: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
}

export function usePageMeta(options: PageMetaOptions) {
  useEffect(() => {
    document.title = options.title;

    const updateMetaTag = (name: string, content: string) => {
      let element = document.querySelector(`meta[name="${name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    const updateOgTag = (property: string, content: string) => {
      let element = document.querySelector(`meta[property="${property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    if (options.description) {
      updateMetaTag('description', options.description);
    }

    if (options.ogTitle) {
      updateOgTag('og:title', options.ogTitle);
    }

    if (options.ogDescription) {
      updateOgTag('og:description', options.ogDescription);
    }

    if (options.ogImage) {
      updateOgTag('og:image', options.ogImage);
    }
  }, [options]);
}
