import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import TerminalSection from '../../components/sections/TerminalSection';
import { ThemeToggle } from '../../components/ui/ThemeToggle';

export const metadata = {
  title: 'Terminal | Ashif E.K',
  description: 'Interactive developer terminal for discovering profile information and active deployments.',
};

export default function TerminalPage() {
  return (
    <div className="min-h-screen flex flex-col p-4 md:p-8">
      <div className="flex justify-between items-center mb-8 w-full max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-academic-muted hover:text-academic-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Back to Home</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="w-full">
          <TerminalSection isStandalone />
        </div>
      </div>

      <div className="flex justify-center mt-8 w-full max-w-4xl mx-auto">
        <Link 
          href="/" 
          className="flex items-center gap-2 text-academic-muted hover:text-academic-primary transition-colors duration-300"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="font-mono text-sm">Back to Home</span>
        </Link>
      </div>
    </div>
  );
}
