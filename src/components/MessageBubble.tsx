
import React from 'react';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  isUser?: boolean;
  message: string;
  className?: string;
  isPending?: boolean;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  isUser = false,
  message, 
  className,
  isPending = false
}) => {
  return (
    <div className={cn(
      "max-w-[80%] animate-fade-in",
      isUser ? "user-bubble" : "system-bubble",
      isPending && "opacity-70",
      className
    )}>
      {message}
    </div>
  );
};

export default MessageBubble;
