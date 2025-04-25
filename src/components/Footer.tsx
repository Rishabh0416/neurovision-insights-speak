
import React from 'react';
import { cn } from '@/lib/utils';

interface FooterProps {
  className?: string;
}

const Footer: React.FC<FooterProps> = ({ className }) => {
  return (
    <footer className={cn("py-4 border-t border-border mt-auto", className)}>
      <div className="container px-4 mx-auto flex items-center justify-center">
        <p className="text-sm text-muted-foreground">
          Neurovision Insights &copy; {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
