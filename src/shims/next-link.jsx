// Enhanced shim to replace Next.js's Link component with a plain anchor element
import React from 'react';

// Handle all possible Next.js Link props
const Link = ({ 
  href = '', 
  as,
  replace,
  scroll,
  shallow,
  passHref,
  prefetch,
  locale,
  legacyBehavior,
  children,
  className,
  target,
  rel,
  onClick,
  ...props
}) => {
  // Handle relative, absolute, and external URLs properly
  const isExternal = href?.toString().startsWith('http') || 
                    href?.toString().startsWith('//') || 
                    href?.toString().startsWith('mailto:') || 
                    href?.toString().startsWith('tel:');
  
  // Always add noreferrer and noopener for external links
  const finalRel = isExternal ? `${rel || ''} noreferrer noopener`.trim() : rel;
  const finalTarget = isExternal ? target || '_blank' : target;
  
  const handleClick = (e) => {
    // Call the original onClick if it exists
    if (onClick) onClick(e);
    
    // If default is prevented or it's an external link, do nothing else
    if (e.defaultPrevented || isExternal) return;
    
    // Handle replacement and scrolling behavior
    if (replace) {
      e.preventDefault();
      window.location.replace(href);
    }
  };
  
  // For legacyBehavior, return the anchor directly
  if (legacyBehavior) {
    return (
      <a 
        href={href}
        target={finalTarget}
        rel={finalRel}
        className={className}
        onClick={handleClick}
        {...props}
      >
        {children}
      </a>
    );
  }

  // Normal behavior - wrap the child or use anchor
  return (
    <a 
      href={href}
      target={finalTarget}
      rel={finalRel}
      className={className}
      onClick={handleClick}
      {...props}
    >
      {children}
    </a>
  );
}

export default Link;
