import Header from './Header';
import Footer from './Footer';
import InstallPrompt from './InstallPrompt';
import { ReactNode } from 'react';

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout = ({ children }: UserLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
      <InstallPrompt />
    </div>
  );
};

export default UserLayout;