import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Send, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useMedicalContext } from '@/context/MedicalContext';
import { reportTemplates } from './ReportPanel';

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

const mockApiCall = async (message: string, contextRegion: string): Promise<string> => {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  // Get the report data for the current region
  const regionData = reportTemplates[contextRegion] || reportTemplates.default;
  
  // Define response patterns based on the question and report data
  const responsePatterns: Record<string, (data: any) => string> = {
    'show': (data) => `The scan shows ${data.deformityType} in the ${contextRegion.replace('_', ' ')} region.`,
    'analysis': (data) => `Analysis indicates a ${data.tumorType} with ${data.severity} severity.`,
    'symptoms': (data) => `Common symptoms include: ${data.symptoms.join(', ')}.`,
    'recommendations': (data) => `Key recommendations: ${data.recommendations.join(', ')}.`,
    'default': (data) => `The ${contextRegion.replace('_', ' ')} shows ${data.deformityType} patterns that require attention.`
  };

  // Match the question type with keywords
  const lowerMessage = message.toLowerCase();
  let response = '';

  if (lowerMessage.includes('show') || lowerMessage.includes('see') || lowerMessage.includes('scan')) {
    response = responsePatterns.show(regionData);
  } else if (lowerMessage.includes('analysis') || lowerMessage.includes('result')) {
    response = responsePatterns.analysis(regionData);
  } else if (lowerMessage.includes('symptoms') || lowerMessage.includes('effects')) {
    response = responsePatterns.symptoms(regionData);
  } else if (lowerMessage.includes('recommend') || lowerMessage.includes('treatment')) {
    response = responsePatterns.recommendations(regionData);
  } else {
    response = responsePatterns.default(regionData);
  }

  return response;
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
    
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      text: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
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
      const aiResponse = await mockApiCall(text, contextRegion);
      
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
