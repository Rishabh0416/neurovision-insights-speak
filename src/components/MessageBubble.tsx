
import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface MessageBubbleProps {
  isUser?: boolean;
  message: string;
  className?: string;
  isPending?: boolean;
  timestamp?: string;
  sender?: string;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ 
  isUser = false,
  message, 
  className,
  isPending = false,
  timestamp,
  sender
}) => {
  return (
    <div className={cn(
      "flex flex-col max-w-[80%] animate-fade-in",
      isUser ? "ml-auto items-end" : "mr-auto items-start",
      className
    )}>
      {sender && !isUser && (
        <span className="text-xs text-muted-foreground mb-1">{sender}</span>
      )}
      <div className={cn(
        "rounded-lg p-3 shadow-sm",
        isUser 
          ? "bg-neurodark-accent text-white rounded-tr-none" 
          : "bg-neurodark-secondary border border-border text-foreground rounded-tl-none",
        isPending && "opacity-70"
      )}>
        {isPending ? (
          <div className="flex items-center gap-2">
            <Loader2 className="size-4 animate-spin" />
            <span>{message}</span>
          </div>
        ) : (
          <span>{message}</span>
        )}
      </div>
      {timestamp && (
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      )}
    </div>
  );
};

export default MessageBubble;
