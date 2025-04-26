import React from 'react';
import { cn } from '@/lib/utils';
import ChatInterface from './ChatInterface';
import { motion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useMedicalContext } from '@/context/MedicalContext';

interface VQAPanelProps {
  className?: string;
}

const VQAPanel: React.FC<VQAPanelProps> = ({ className }) => {
  const { uploadedImage, selectedRegion } = useMedicalContext();

  // Configure VQA with specific image and region context
  const handleImageSelect = (imageIndex: number) => {
    // This is handled by the ImageUploadPanel now, but we keep the interface compatible
    console.log("Image selected in VQA:", imageIndex);
  };

  return (
    <motion.div 
      className={cn("h-[500px]", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <div className="neural-card h-full flex flex-col">
        <div className="flex items-center justify-between border-b border-border p-3">
          <div className="flex items-center gap-2">
            <Brain className="size-5 text-neurodark-accent" />
            <h3 className="font-semibold">Neurovision Assistant</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className={cn(
              "h-2 w-2 rounded-full",
              uploadedImage ? "bg-green-500" : "bg-yellow-500"
            )}></span>
            <span className="text-xs text-muted-foreground">
              {uploadedImage ? "Ready" : "Waiting for scan"}
            </span>
          </div>
        </div>
        
        <ChatInterface 
          onImageSelect={handleImageSelect} 
          className="h-full"
          contextRegion={selectedRegion}
        />
      </div>
    </motion.div>
  );
};

export default VQAPanel;
