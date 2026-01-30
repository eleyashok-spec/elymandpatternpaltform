
import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface LogoProps {
  className?: string;
  size?: number;
}

/**
 * Returns the original technical brand icon for Elymand.
 */
export const Logo: React.FC<LogoProps> = ({ className = "", size = 32 }) => {
  return (
    <div className={`flex items-center justify-center text-violet-600 ${className}`}>
      <ShieldCheck size={size} strokeWidth={2.5} />
    </div>
  );
};

/**
 * Returns the original clean, bold brand text for Elymand.
 * Default color is slate-900 if none provided via className.
 */
export const LogoText: React.FC<{ className?: string }> = ({ className = "" }) => {
  const hasColorClass = className.includes('text-');
  return (
    <span className={`font-black tracking-tighter uppercase ${!hasColorClass ? 'text-slate-900' : ''} ${className}`}>
      ELY<span className="text-violet-600">MAND</span>
    </span>
  );
};
