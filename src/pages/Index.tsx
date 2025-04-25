
import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import VQASystem from '@/components/VQASystem';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container px-4 py-6 mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Neurovision Insights - Visual Question Answering</h2>
          <p className="text-muted-foreground">
            Analyze visual data with precision. Select a sample image or ask questions about visual elements.
          </p>
        </div>
        
        <VQASystem />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
