
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import ImageDisplay from './ImageDisplay';
import ChatInterface from './ChatInterface';

interface VQASystemProps {
  className?: string;
}

const VQASystem: React.FC<VQASystemProps> = ({ className }) => {
  // Sample image URLs - these would be replaced with actual images in a real app
  const sampleImageUrls = [
    "https://placehold.co/600x400/1A1F2C/22D3EE?text=Brain+Scan&font=playfair",
    "https://placehold.co/600x400/1A1F2C/0EA5E9?text=Neural+Network&font=playfair",
    "https://placehold.co/600x400/1A1F2C/38BDF8?text=Data+Visualization&font=playfair"
  ];

  const [currentImage, setCurrentImage] = useState<string | undefined>(undefined);

  const handleImageSelect = (imageIndex: number) => {
    setCurrentImage(sampleImageUrls[imageIndex]);
  };

  return (
    <div className={cn("grid gap-6 w-full md:grid-cols-2", className)}>
      <ImageDisplay imageUrl={currentImage} className="aspect-video h-auto md:h-full" />
      <ChatInterface onImageSelect={handleImageSelect} />
    </div>
  );
};

export default VQASystem;
