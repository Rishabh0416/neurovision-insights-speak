import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { FileText, ChevronDown, ChevronUp, Download, Loader2 } from 'lucide-react';
import { useMedicalContext } from '@/context/MedicalContext';
import { useToast } from '@/hooks/use-toast';
import { reportTemplates } from '@/utils/reportTemplates';

interface ReportPanelProps {
  className?: string;
}

const ReportPanel: React.FC<ReportPanelProps> = ({ className }) => {
  const { uploadedImage, isProcessing, selectedRegion, generatedReport, setGeneratedReport } = useMedicalContext();
  const [isExpanded, setIsExpanded] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();

  const handleGenerateReport = async () => {
    if (!uploadedImage) {
      toast({
        variant: "destructive",
        title: "No scan uploaded",
        description: "Please upload an MRI scan first"
      });
      return;
    }

    setIsGenerating(true);
    await new Promise(resolve => setTimeout(resolve, 2500));
    
    // Get report based on the currently selected brain region
    const report = reportTemplates[selectedRegion] || reportTemplates.default;
    setGeneratedReport(report);
    setIsGenerating(false);

    toast({
      title: "Report Generated",
      description: "AI analysis complete"
    });
  };

  const handleDownloadReport = () => {
    if (!generatedReport) return;
    
    // Create report text
    const reportText = `
NEUROVISION INSIGHTS - MEDICAL ANALYSIS REPORT
==============================================
Date: ${new Date().toLocaleDateString()}
Time: ${new Date().toLocaleTimeString()}

FINDINGS
--------
Deformity Type: ${generatedReport.deformityType}
Tumor Classification: ${generatedReport.tumorType}
Severity: ${generatedReport.severity}

SYMPTOMS
--------
${generatedReport.symptoms.map((s: string) => `- ${s}`).join('\n')}

RECOMMENDATIONS
--------------
${generatedReport.recommendations.map((r: string) => `- ${r}`).join('\n')}

==============================================
This is an AI-generated report and should be reviewed by a qualified medical professional.
Neurovision Insights is not a substitute for professional medical advice, diagnosis, or treatment.
`;

    // Create download link
    const element = document.createElement('a');
    const file = new Blob([reportText], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `neurovision-report-${Date.now()}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    toast({
      title: "Report Downloaded",
      description: "Text file saved to your device"
    });
  };

  return (
    <motion.div 
      className={cn("neural-card overflow-hidden", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div 
        className="flex items-center justify-between p-4 border-b border-border cursor-pointer"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          <FileText className="size-5 text-neurodark-accent" />
          <h3 className="font-semibold">AI Medical Report</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
        </Button>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="p-4 space-y-4">
              {!generatedReport ? (
                <div className="text-center p-6 space-y-4">
                  <p className="text-muted-foreground">
                    {uploadedImage
                      ? "MRI scan uploaded. Click Generate Report for AI analysis."
                      : "Upload an MRI scan first to generate a report."}
                  </p>
                  <Button 
                    onClick={handleGenerateReport} 
                    disabled={!uploadedImage || isProcessing || isGenerating}
                    className="w-full"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> 
                        Analyzing Scan...
                      </>
                    ) : (
                      <>Generate Report</>
                    )}
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Deformity Type</h4>
                    <p className="text-lg font-semibold">{generatedReport.deformityType}</p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Tumor Classification</h4>
                    <p className="text-md">
                      <span className={cn(
                        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium mr-2",
                        generatedReport.tumorType.includes("Malignant") 
                          ? "bg-red-500/20 text-red-500" 
                          : generatedReport.tumorType.includes("Benign")
                          ? "bg-green-500/20 text-green-500"
                          : "bg-yellow-500/20 text-yellow-500"
                      )}>
                        {generatedReport.severity} Severity
                      </span>
                      {generatedReport.tumorType}
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Potential Symptoms</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {generatedReport.symptoms.map((symptom: string, idx: number) => (
                        <li key={idx}>{symptom}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground mb-1">Recommendations</h4>
                    <ul className="list-disc pl-5 space-y-1">
                      {generatedReport.recommendations.map((rec: string, idx: number) => (
                        <li key={idx}>{rec}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-2 flex justify-between items-center">
                    <p className="text-xs text-muted-foreground">
                      Generated on {new Date().toLocaleString()}
                    </p>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={handleDownloadReport}
                    >
                      <Download className="mr-2 h-3 w-3" /> Download Report
                    </Button>
                  </div>
                  
                  <p className="text-xs text-muted-foreground border-t border-border pt-2">
                    This is an AI-generated report and should be reviewed by a qualified medical professional.
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ReportPanel;
