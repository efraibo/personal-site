import React from 'react';

// A simple Link component to replace Next.js's Link component
export default function Link({ href, as, replace, scroll, shallow, passHref, prefetch, locale, legacyBehavior, children, ...rest }) {
  // For external links
  if (href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('tel:')) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </a>
    );
  }
  
  // For internal links
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}
