
import React from 'react';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={cn("py-4 border-b border-border", className)}>
      <div className="container px-4 mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-full neural-gradient flex items-center justify-center">
            <div className="h-3 w-3 bg-white rounded-full animate-pulse-subtle"></div>
          </div>
          <h1 className="text-2xl font-bold bg-clip-text text-transparent neural-gradient">Neurovision</h1>
        </div>
        <span className="text-sm text-muted-foreground">Visual Question Answering System</span>
      </div>
    </header>
  );
};

export default Header;
