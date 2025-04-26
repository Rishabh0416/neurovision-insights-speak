
import React, { useRef, useState, Suspense, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Brain, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMedicalContext } from '@/context/MedicalContext';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';

// Define a simple brain model since we don't have the actual GLTF
const BrainModel = ({ brainRegion }: { brainRegion: string }) => {
  // Define colors for different brain regions
  const colorMap: Record<string, string> = {
    frontal_lobe: '#ff0000',      // Red
    temporal_lobe: '#ff3d00',     // Red-Orange
    parietal_lobe: '#ff9100',     // Orange
    occipital_lobe: '#ffea00',    // Yellow
    cerebellum: '#64dd17',        // Light Green
    brain_stem: '#00c853',        // Green
    hypothalamus: '#00b8d4',      // Teal
    amygdala: '#304ffe',          // Blue
    hippocampus: '#6200ea',       // Purple
    thalamus: '#aa00ff',          // Violet
    default: '#d50000',           // Default Red
  };

  // Base brain geometry
  return (
    <group>
      {/* Base brain model - simplified shapes for demo */}
      <mesh castShadow>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial color="#444" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Cerebellum */}
      <mesh position={[0, -1.5, -0.5]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'cerebellum' ? colorMap.cerebellum : "#555"}
          emissive={brainRegion === 'cerebellum' ? colorMap.cerebellum : "#000"}
          emissiveIntensity={brainRegion === 'cerebellum' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Brain stem */}
      <mesh position={[0, -2, 0]} castShadow>
        <cylinderGeometry args={[0.5, 0.3, 1.5, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'brain_stem' ? colorMap.brain_stem : "#666"}
          emissive={brainRegion === 'brain_stem' ? colorMap.brain_stem : "#000"}
          emissiveIntensity={brainRegion === 'brain_stem' ? 0.5 : 0}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Frontal lobe */}
      <mesh position={[0, 0.8, 1.5]} castShadow>
        <sphereGeometry args={[1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={brainRegion === 'frontal_lobe' ? colorMap.frontal_lobe : "#555"}
          emissive={brainRegion === 'frontal_lobe' ? colorMap.frontal_lobe : "#000"}
          emissiveIntensity={brainRegion === 'frontal_lobe' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Temporal lobe - left */}
      <mesh position={[-1.5, 0, 0.5]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'temporal_lobe' ? colorMap.temporal_lobe : "#555"}
          emissive={brainRegion === 'temporal_lobe' ? colorMap.temporal_lobe : "#000"}
          emissiveIntensity={brainRegion === 'temporal_lobe' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Temporal lobe - right */}
      <mesh position={[1.5, 0, 0.5]} castShadow>
        <sphereGeometry args={[1, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'temporal_lobe' ? colorMap.temporal_lobe : "#555"}
          emissive={brainRegion === 'temporal_lobe' ? colorMap.temporal_lobe : "#000"}
          emissiveIntensity={brainRegion === 'temporal_lobe' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Parietal lobe */}
      <mesh position={[0, 1, 0]} castShadow>
        <sphereGeometry args={[1.2, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={brainRegion === 'parietal_lobe' ? colorMap.parietal_lobe : "#555"}
          emissive={brainRegion === 'parietal_lobe' ? colorMap.parietal_lobe : "#000"}
          emissiveIntensity={brainRegion === 'parietal_lobe' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>

      {/* Occipital lobe */}
      <mesh position={[0, 0.8, -1.5]} castShadow>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial 
          color={brainRegion === 'occipital_lobe' ? colorMap.occipital_lobe : "#555"}
          emissive={brainRegion === 'occipital_lobe' ? colorMap.occipital_lobe : "#000"}
          emissiveIntensity={brainRegion === 'occipital_lobe' ? 0.5 : 0}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Hypothalamus */}
      <mesh position={[0, -0.5, 0.5]} castShadow>
        <sphereGeometry args={[0.4, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'hypothalamus' ? colorMap.hypothalamus : "#777"}
          emissive={brainRegion === 'hypothalamus' ? colorMap.hypothalamus : "#000"}
          emissiveIntensity={brainRegion === 'hypothalamus' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>

      {/* Thalamus */}
      <mesh position={[0, 0, 0]} castShadow>
        <sphereGeometry args={[0.6, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'thalamus' ? colorMap.thalamus : "#666"}
          emissive={brainRegion === 'thalamus' ? colorMap.thalamus : "#000"}
          emissiveIntensity={brainRegion === 'thalamus' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.2}
        />
      </mesh>
      
      {/* Amygdala - left */}
      <mesh position={[-0.8, -0.3, 0.3]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'amygdala' ? colorMap.amygdala : "#777"}
          emissive={brainRegion === 'amygdala' ? colorMap.amygdala : "#000"}
          emissiveIntensity={brainRegion === 'amygdala' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
      
      {/* Amygdala - right */}
      <mesh position={[0.8, -0.3, 0.3]} castShadow>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshStandardMaterial 
          color={brainRegion === 'amygdala' ? colorMap.amygdala : "#777"}
          emissive={brainRegion === 'amygdala' ? colorMap.amygdala : "#000"}
          emissiveIntensity={brainRegion === 'amygdala' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
      
      {/* Hippocampus - left */}
      <mesh position={[-1, -0.5, -0.2]} castShadow>
        <torusGeometry args={[0.3, 0.1, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color={brainRegion === 'hippocampus' ? colorMap.hippocampus : "#777"}
          emissive={brainRegion === 'hippocampus' ? colorMap.hippocampus : "#000"}
          emissiveIntensity={brainRegion === 'hippocampus' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
      
      {/* Hippocampus - right */}
      <mesh position={[1, -0.5, -0.2]} castShadow>
        <torusGeometry args={[0.3, 0.1, 8, 16, Math.PI]} />
        <meshStandardMaterial 
          color={brainRegion === 'hippocampus' ? colorMap.hippocampus : "#777"}
          emissive={brainRegion === 'hippocampus' ? colorMap.hippocampus : "#000"}
          emissiveIntensity={brainRegion === 'hippocampus' ? 0.5 : 0}
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
      
      {/* Brain defect indicator - visible when a region is selected */}
      <mesh position={[0, 2.5, 0]} castShadow visible={brainRegion !== ''}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color="#ff0000" 
          emissive="#ff0000"
          emissiveIntensity={1}
          roughness={0.6} 
          metalness={0.3} 
        />
      </mesh>
    </group>
  );
};

interface BrainVisualizationPanelProps {
  className?: string;
}

const BrainVisualizationPanel: React.FC<BrainVisualizationPanelProps> = ({ className }) => {
  const { uploadedImage, selectedRegion } = useMedicalContext();
  const [zoom, setZoom] = useState(5);
  const controlsRef = useRef<any>(null);
  
  return (
    <motion.div 
      className={cn("neural-card overflow-hidden", className)}
      style={{ height: '500px' }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.2 }}
    >
      <div className="flex items-center justify-between p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="size-5 text-neurodark-accent" />
          <h3 className="font-semibold">3D Brain Visualization</h3>
        </div>
        <div className="flex items-center gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setZoom(Math.min(zoom + 1, 10))}
          >
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => setZoom(Math.max(zoom - 1, 2))}
          >
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={() => {
              if (controlsRef.current) {
                controlsRef.current.reset();
              }
            }}
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="relative h-[calc(100%-57px)]">
        {!uploadedImage ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <Brain className="size-16 mb-4 text-muted-foreground opacity-20" />
            <p className="text-muted-foreground">
              Upload an MRI scan to generate a 3D brain model
            </p>
          </div>
        ) : (
          <>
            <Canvas shadows camera={{ position: [0, 0, zoom], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.15} 
                penumbra={1} 
                intensity={1} 
                castShadow 
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              
              <Suspense fallback={null}>
                <BrainModel brainRegion={selectedRegion} />
                <Environment preset="city" />
              </Suspense>
              
              <OrbitControls 
                ref={controlsRef}
                enablePan={false}
                minDistance={3}
                maxDistance={10}
              />
            </Canvas>
            
            {selectedRegion && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded p-2 text-sm">
                <p>
                  <span className="font-semibold text-neurodark-accent">Region:</span>{' '}
                  {selectedRegion.replace('_', ' ')}
                </p>
                <p className="text-xs text-muted-foreground">
                  Rotate: click + drag | Zoom: mouse wheel
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
};

export default BrainVisualizationPanel;
