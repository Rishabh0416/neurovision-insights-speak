
import React from 'react';
import { cn } from '@/lib/utils';
import { Image } from 'lucide-react';

interface ImageDisplayProps {
  className?: string;
  imageUrl?: string;
  alt?: string;
}

const ImageDisplay: React.FC<ImageDisplayProps> = ({ 
  className,
  imageUrl,
  alt = "Visual analysis image"
}) => {
  return (
    <div className={cn("neural-card p-1 overflow-hidden flex justify-center items-center", className)}>
      {imageUrl ? (
        <img 
          src={imageUrl} 
          alt={alt}
          className="max-w-full h-auto rounded object-cover"
        />
      ) : (
        <div className="h-full w-full min-h-[240px] flex flex-col items-center justify-center text-muted-foreground">
          <Image className="w-12 h-12 mb-2 opacity-50" />
          <p>Sample image will appear here</p>
        </div>
      )}
    </div>
  );
};

export default ImageDisplay;
