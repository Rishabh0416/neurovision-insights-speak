
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  isUser?: boolean;
  message: string;
  className?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  isUser = false,
  message, 
  className 
}) => {
  return (
    <div className={cn(
      "max-w-[80%] animate-fade-in",
      isUser ? "user-bubble" : "system-bubble",
      className
    )}>
      {message}
    </div>
  );
};

export default MessageBubble;
