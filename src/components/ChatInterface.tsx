
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMedicalContext } from '@/context/MedicalContext';

interface Message {
  id: string;
  isUser: boolean;
  text: string;
  isPending?: boolean;
  timestamp?: string;
  sender?: string;
}

interface ChatInterfaceProps {
  className?: string;
  onImageSelect: (imageIndex: number) => void;
  contextRegion?: string;
}

// Mock API call - replace this with your actual API integration
const mockApiCall = async (message: string, contextRegion: string): Promise<string> => {
  console.log("API call with message:", message);
  console.log("Context region:", contextRegion);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Pre-saved responses based on brain regions
  const regionResponses: Record<string, string[]> = {
    frontal_lobe: [
      "The frontal lobe shows abnormal activity patterns that require attention.",
      "Analysis indicates a potential mass in the frontal region with significant contrast.",
      "The highlighted area in the frontal lobe suggests possible tumor development."
    ],
    temporal_lobe: [
      "The temporal lobe region displays unusual signal characteristics worth investigating.",
      "Analysis reveals potential anomalies in the temporal region requiring further examination.",
      "The highlighted area in the temporal lobe indicates possible lesion formation."
    ],
    parietal_lobe: [
      "The parietal lobe shows distinct abnormalities that merit immediate attention.",
      "Analysis suggests a developing mass in the parietal region with concerning features.",
      "The highlighted area in the parietal cortex indicates potential malignant growth."
    ],
    occipital_lobe: [
      "The occipital region displays irregular patterns consistent with possible tumor formation.",
      "Analysis indicates unusual density variations in the occipital lobe that need investigation.",
      "The highlighted area in the visual cortex shows concerning abnormal growth."
    ],
    cerebellum: [
      "The cerebellum shows distinct structural abnormalities requiring specialized analysis.",
      "Analysis suggests potential cerebellar lesions that may affect motor coordination.",
      "The highlighted area in the cerebellum indicates possible malignant development."
    ],
    default: [
      "The highlighted abnormality appears to be a potential tumor formation.",
      "Analysis complete. This region displays patterns consistent with possible malignancy.",
      "The scan reveals distinct neural patterns that merit immediate clinical attention."
    ]
  };

  // Get responses for the specified region or use default
  const responses = regionResponses[contextRegion] || regionResponses.default;
  
  // Choose a random response from the region-specific or default responses
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  className,
  onImageSelect,
  contextRegion = "default"
}) => {
  const { uploadedImage } = useMedicalContext();
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', isUser: false, text: "Welcome to Neurovision! Upload a brain scan or ask a question about visual data.", sender: "Neurovision AI" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const sampleQuestions = [
    "What does this scan show?",
    "Analyze the highlighted area",
    "Is this pattern abnormal?",
    "What type of tumor is this?"
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Add a special message when new image is uploaded
  useEffect(() => {
    if (uploadedImage) {
      const newMessage: Message = {
        id: Date.now().toString(),
        isUser: false,
        text: "New MRI scan received. What would you like to know about this scan?",
        sender: "Neurovision AI",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      
      setMessages(prev => [...prev, newMessage]);
    }
  }, [uploadedImage]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;
    
    if (!uploadedImage) {
      toast({
        variant: "destructive",
        title: "No scan uploaded",
        description: "Please upload an MRI scan first"
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    // Add a pending message to show loading state
    const pendingMessage: Message = {
      id: (Date.now() + 1).toString(),
      isUser: false,
      text: "Analyzing scan...",
      isPending: true,
      sender: "Neurovision AI"
    };
    
    setMessages(prev => [...prev, userMessage, pendingMessage]);
    setInputValue('');
    
    try {
      // Using mock API for now, in production this would call your backend
      const aiResponse = await mockApiCall(text, contextRegion);
      
      // Replace pending message with actual response
      setMessages(prev => 
        prev.map(msg => 
          msg.isPending 
            ? {
                id: msg.id,
                isUser: false,
                text: aiResponse,
                sender: "Neurovision AI",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            : msg
        )
      );
    } catch (error) {
      console.error("Error processing message:", error);
      
      // Handle error case
      setMessages(prev => 
        prev.map(msg => 
          msg.isPending 
            ? {
                id: msg.id,
                isUser: false,
                text: "Sorry, I couldn't process your request. Please try again.",
                sender: "Neurovision AI",
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
              }
            : msg
        )
      );
      
      toast({
        variant: "destructive",
        title: "Analysis Error",
        description: "Failed to analyze the scan. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className={cn("flex-1 flex flex-col", className)}>
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            isUser={msg.isUser} 
            message={msg.text}
            isPending={msg.isPending}
            timestamp={msg.timestamp}
            sender={msg.sender}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-3 border-t border-border space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sampleQuestions.map((question, idx) => (
            <Button
              key={idx}
              variant="secondary"
              size="sm"
              onClick={() => handleSendMessage(question)}
              className="whitespace-nowrap"
              disabled={isProcessing || !uploadedImage}
            >
              <Search className="w-4 h-4 mr-1" /> {question}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about the scan..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="bg-secondary border-border"
            disabled={isProcessing || !uploadedImage}
          />
          <Button 
            onClick={() => handleSendMessage()} 
            disabled={!inputValue.trim() || isProcessing || !uploadedImage}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Send className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
