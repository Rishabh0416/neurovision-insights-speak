
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import MessageBubble from './MessageBubble';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Image, Send } from 'lucide-react';

interface Message {
  id: string;
  isUser: boolean;
  text: string;
}

interface ChatInterfaceProps {
  className?: string;
  onImageSelect: (imageIndex: number) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ 
  className,
  onImageSelect 
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', isUser: false, text: "Welcome to Neurovision! Select a sample image or ask a question about visual data." }
  ]);
  const [inputValue, setInputValue] = useState('');

  // Pre-saved responses based on the context
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

  // Sample questions for the quick question buttons
  const sampleQuestions = [
    "What does this image show?",
    "Analyze the highlighted area",
    "Why is this region significant?",
    "Is this pattern normal?"
  ];

  // Sample images that will be shown in the interface
  const sampleImages = [
    { name: "Brain Scan", category: "brainScan" },
    { name: "Neural Network", category: "neuralNetwork" },
    { name: "Data Patterns", category: "dataVisualization" }
  ];

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      isUser: true,
      text: text
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    
    // Simulate response selection from pre-saved responses
    setTimeout(() => {
      const currentImageCategory = localStorage.getItem('currentImageCategory') || 'general';
      const responses = preSavedResponses[currentImageCategory as keyof typeof preSavedResponses];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        isUser: false,
        text: randomResponse
      };
      
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const handleSelectImage = (index: number) => {
    const selectedCategory = sampleImages[index].category;
    localStorage.setItem('currentImageCategory', selectedCategory);
    onImageSelect(index);
    
    // Add a system message about the selected image
    const systemMessage: Message = {
      id: Date.now().toString(),
      isUser: false,
      text: `${sampleImages[index].name} loaded for analysis. What would you like to know about this image?`
    };
    
    setMessages(prev => [...prev, systemMessage]);
  };

  return (
    <div className={cn("neural-card h-full flex flex-col", className)}>
      <div className="flex items-center justify-between border-b border-border p-4">
        <h2 className="font-semibold">Interactive Analysis</h2>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500"></span>
          <span className="text-xs text-muted-foreground">Online</span>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {messages.map((msg) => (
          <MessageBubble 
            key={msg.id} 
            isUser={msg.isUser} 
            message={msg.text} 
          />
        ))}
      </div>
      
      <div className="p-4 border-t border-border space-y-2">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {sampleImages.map((img, idx) => (
            <Button
              key={idx}
              variant="outline"
              size="sm"
              onClick={() => handleSelectImage(idx)}
              className="whitespace-nowrap"
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
          />
          <Button onClick={() => handleSendMessage()} disabled={!inputValue.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
