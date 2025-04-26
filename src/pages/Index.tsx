
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ImageUploadPanel from '@/components/ImageUploadPanel';
import VQAPanel from '@/components/VQAPanel';
import ReportPanel from '@/components/ReportPanel';
import BrainVisualizationPanel from '@/components/BrainVisualizationPanel';
import { MedicalContextProvider } from '@/context/MedicalContext';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-neurodark">
      <Header />
      <MedicalContextProvider>
        <main className="flex-1 container px-4 py-6 mx-auto">
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-2">Neurovision Insights - Medical Analysis Platform</h2>
            <p className="text-muted-foreground">
              Upload MRI scans, analyze visual data, generate reports, and visualize in 3D.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-6">
              {/* Panel 1: Image Upload */}
              <ImageUploadPanel />
              
              {/* Panel 2: VQA System */}
              <VQAPanel />
            </div>
            
            <div className="space-y-6">
              {/* Panel 3: 3D Brain Visualization */}
              <BrainVisualizationPanel />
              
              {/* Panel 4: AI Report */}
              <ReportPanel />
            </div>
          </div>
        </main>
      </MedicalContextProvider>
      <Footer />
    </div>
  );
};

export default Index;
