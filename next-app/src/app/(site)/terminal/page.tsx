import TerminalSection from '../../../components/sections/TerminalSection';

export const metadata = {
  title: 'Terminal | Ashif E.K',
  description: 'Interactive developer terminal for discovering profile information and active deployments.',
};

export default function TerminalPage() {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-20">
      <div className="w-full">
        <TerminalSection isStandalone />
      </div>
    </div>
  );
}
