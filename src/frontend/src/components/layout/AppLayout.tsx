import { Outlet } from '@tanstack/react-router';
import Navbar from '../navigation/Navbar';
import Footer from './Footer';
import BackToTopButton from '../common/BackToTopButton';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from 'next-themes';

export default function AppLayout() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <BackToTopButton />
        <Toaster />
      </div>
    </ThemeProvider>
  );
}
