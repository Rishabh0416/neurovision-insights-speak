
import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Image, Send, Loader2, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

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
  imageData?: File | null;
  apiEndpoint?: string;
}

// Mock API call - replace this with your actual API integration
const mockApiCall = async (message: string, imageData?: File | null): Promise<string> => {
  // This would be replaced with your actual API call
  console.log("API call with message:", message);
  console.log("Image data:", imageData);
  
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock response
  const responses = [
    "The highlighted area suggests potential anomalous activity requiring further analysis.",
    "This scan reveals distinct neural patterns in the temporal lobe region that merit attention.",
    "The frontal cortex shows unusual activity patterns that should be investigated further.",
    "Analysis complete. The occipital region displays patterns consistent with our reference models.",
    "The highlighted abnormality appears to be a potential tumor formation in the parietal lobe."
  ];
  
  return responses[Math.floor(Math.random() * responses.length)];
};

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  className,
  onImageSelect,
  imageData,
  apiEndpoint = '/api/neurovision/analyze' // Default API endpoint
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', isUser: false, text: "Welcome to Neurovision! Select a sample image or ask a question about visual data.", sender: "Neurovision AI" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Pre-saved responses - these would come from the backend in a real implementation
  const preSavedResponses = {
    brainScan: [
      "This brain scan reveals distinct neural activity patterns in the highlighted regions.",
      "The highlighted area shows significant contrast, suggesting potential anomalies.",
      "Great capture! The neural pathways are clearly visualized in this scan."
    ],
    neuralNetwork: [
      "This neural network visualization shows active nodes in the highlighted sections.",
      "The pattern indicates optimal model convergence with strong feature detection.",
      "You're on track! The network layers show proper activation sequences."
    ],
    dataVisualization: [
      "This data visualization highlights key clusters that merit further analysis.",
      "The highlighted patterns suggest a correlation that aligns with our hypothesis.",
      "Great work! The visualization reveals insight-rich anomalies worth investigating."
    ],
    general: [
      "This image reveals interesting patterns worth exploring further.",
      "The visual data shows promising results that align with Neurovision's analysis.",
      "You're on the right path. Try using Neurovision's enhancement tools for more detail."
    ]
  };

  const sampleQuestions = [
    "What does this image show?",
    "Analyze the highlighted area",
    "Why is this region significant?",
    "Is this pattern normal?"
  ];

  const sampleImages = [
    { name: "Brain Scan", category: "brainScan" },
    { name: "Neural Network", category: "neuralNetwork" },
    { name: "Data Patterns", category: "dataVisualization" }
  ];

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = async (text: string = inputValue) => {
    if (!text.trim() || isProcessing) return;
    
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
      text: "Processing your request...",
      isPending: true,
      sender: "Neurovision AI"
    };
    
    setMessages(prev => [...prev, userMessage, pendingMessage]);
    setInputValue('');
    
    try {
      // In a real implementation, this would be an API call to your backend
      // const response = await fetch(apiEndpoint, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ message: text, image: imageData ? true : false })
      // });
      // const data = await response.json();
      // const aiResponse = data.message;
      
      // Using mock API for now
      const aiResponse = await mockApiCall(text, imageData);
      
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
        title: "Error",
        description: "Failed to process your message. Please try again."
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSelectImage = (index: number) => {
    const selectedCategory = sampleImages[index].category;
    localStorage.setItem('currentImageCategory', selectedCategory);
    onImageSelect(index);
    
    // Add a system message about the selected image
    const systemMessage: Message = {
      id: Date.now().toString(),
      isUser: false,
      text: `${sampleImages[index].name} loaded for analysis. What would you like to know about this image?`,
      sender: "Neurovision AI",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className={cn("neural-card h-full flex flex-col", className)}>
      <div className="flex items-center justify-between border-b border-border p-3">
        <div className="flex items-center gap-2">
          <Brain className="size-5 text-neurodark-accent" />
          <h2 className="font-semibold">Neurovision Assistant</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
      
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
          {sampleImages.map((img, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleSelectImage(idx)}
              className="whitespace-nowrap"
              disabled={isProcessing}
            >
              <Image className="w-4 h-4 mr-1" /> {img.name}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sampleQuestions.map((question, idx) => (
            <Button
              key={idx}
              variant="secondary"
              size="sm"
              onClick={() => handleSendMessage(question)}
              className="whitespace-nowrap"
              disabled={isProcessing}
            >
              <Search className="w-4 h-4 mr-1" /> {question}
            </Button>
          ))}
        </div>
        
        <div className="flex gap-2">
          <Input
            placeholder="Ask about the visual data..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSendMessage();
              }
            }}
            className="bg-secondary border-border"
            disabled={isProcessing}
          />
          <Button 
            onClick={() => handleSendMessage()} 
            disabled={!inputValue.trim() || isProcessing}
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
