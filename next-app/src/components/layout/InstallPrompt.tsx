'use client';
import { useState, useEffect } from 'react';
import { Download } from 'lucide-react';

const InstallPrompt = () => {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [isAppInstalled, setIsAppInstalled] = useState(false);

  useEffect(() => {
    const handleBeforeInstall = (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      setPromptEvent(e);
    };

    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setPromptEvent(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    window.addEventListener('appinstalled', handleAppInstalled);

    const checkInstalled = () => {
      if (window.matchMedia('(display-mode: standalone)').matches) {
        setIsAppInstalled(true);
      }
    };

    checkInstalled();

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!promptEvent) return;

    await promptEvent.prompt();

    try {
      const choiceResult = await promptEvent.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setIsAppInstalled(true);
      }
    } finally {
      setPromptEvent(null);
    }
  };

  if (!promptEvent || isAppInstalled) return null;

  return (
    <button
      onClick={handleInstall}
      className="fixed bottom-4 left-4 z-50 bg-cyan-600 text-white p-3 rounded-full shadow-lg hover:bg-cyan-700 transition-colors animate-bounce"
      title="Install App"
    >
      <Download size={24} />
    </button>
  );
};

export default InstallPrompt;
