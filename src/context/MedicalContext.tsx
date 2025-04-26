
import React, { createContext, useState, useContext, ReactNode } from 'react';

interface MedicalContextProps {
  uploadedImage: string | null;
  setUploadedImage: (image: string | null) => void;
  generatedReport: Report | null;
  setGeneratedReport: (report: Report | null) => void;
  isProcessing: boolean;
  setIsProcessing: (isProcessing: boolean) => void;
  selectedRegion: string;
  setSelectedRegion: (region: string) => void;
  resetAnalysis: () => void;
}

export interface Report {
  deformityType: string;
  symptoms: string[];
  tumorType: string;
  severity: string;
  recommendations: string[];
}

const MedicalContext = createContext<MedicalContextProps | undefined>(undefined);

export const MedicalContextProvider = ({ children }: { children: ReactNode }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [generatedReport, setGeneratedReport] = useState<Report | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  // Brain regions for random flagging
  const brainRegions = [
    'frontal_lobe', 
    'temporal_lobe', 
    'parietal_lobe',
    'occipital_lobe',
    'cerebellum',
    'brain_stem',
    'hypothalamus',
    'amygdala',
    'hippocampus',
    'thalamus'
  ];

  const resetAnalysis = () => {
    setGeneratedReport(null);
    // Set a random brain region when analysis is reset
    const randomRegion = brainRegions[Math.floor(Math.random() * brainRegions.length)];
    setSelectedRegion(randomRegion);
  };

  return (
    <MedicalContext.Provider 
      value={{
        uploadedImage,
        setUploadedImage,
        generatedReport,
        setGeneratedReport,
        isProcessing,
        setIsProcessing,
        selectedRegion,
        setSelectedRegion,
        resetAnalysis
      }}
    >
      {children}
    </MedicalContext.Provider>
  );
};

export const useMedicalContext = () => {
  const context = useContext(MedicalContext);
  if (context === undefined) {
    throw new Error('useMedicalContext must be used within a MedicalContextProvider');
  }
  return context;
};
