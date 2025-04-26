
import React, { useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, FileImage } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMedicalContext } from '@/context/MedicalContext';
import { useToast } from '@/hooks/use-toast';

const ImageUploadPanel: React.FC = () => {
  const { setUploadedImage, setIsProcessing, resetAnalysis } = useMedicalContext();
  const { toast } = useToast();
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.match('image.*')) {
      toast({
        variant: "destructive",
        title: "Invalid file",
        description: "Please upload an image file (PNG, JPEG)."
      });
      return;
    }

    setIsProcessing(true);
    
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target && typeof e.target.result === 'string') {
        setUploadedImage(e.target.result);
        resetAnalysis(); // Reset analysis and set a new random region
        
        // Simulate processing time
        setTimeout(() => {
          setIsProcessing(false);
        }, 2000);
        
        toast({
          title: "Image uploaded",
          description: "MRI scan uploaded successfully"
        });
      }
    };
    
    reader.onerror = () => {
      setIsProcessing(false);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to read the image file"
      });
    };
    
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <motion.div 
      className="neural-card p-4"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center gap-2 mb-4">
        <FileImage className="size-5 text-neurodark-accent" />
        <h3 className="font-semibold">MRI Scan Upload</h3>
      </div>
      
      <motion.div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 flex flex-col items-center justify-center text-center h-60",
          isDragging ? "border-neurodark-accent bg-neurodark-accent/5" : "border-border",
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
        <h3 className="text-lg font-medium mb-2">Drag & Drop MRI Scan</h3>
        <p className="text-sm text-muted-foreground mb-4">
          Support for PNG, JPEG (max 10MB)
        </p>
        <Button onClick={handleBrowseClick} variant="secondary" className="relative">
          <ImageIcon className="mr-2 h-4 w-4" /> Browse Files
          <input 
            ref={fileInputRef}
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
            onChange={handleFileInput}
            accept="image/png,image/jpeg,image/jpg"
          />
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default ImageUploadPanel;
