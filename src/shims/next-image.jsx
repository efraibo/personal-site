// This is a shim to replace Next.js's Image component with a plain img element
import React from 'react';

const Image = ({ 
  src, 
  alt, 
  width, 
  height, 
  layout, 
  objectFit, 
  objectPosition,
  quality,
  priority,
  loading,
  ...props 
}) => {
  const imgStyle = {
    width: width ? `${width}px` : '100%',
    height: height ? `${height}px` : 'auto',
    objectFit: objectFit || 'cover',
    objectPosition: objectPosition || 'center',
  };

  return (
    <img 
      src={src} 
      alt={alt || ''} 
      style={imgStyle} 
      loading={(loading || priority) ? 'eager' : 'lazy'}
      {...props} 
    />
  );
};

export default Image;
