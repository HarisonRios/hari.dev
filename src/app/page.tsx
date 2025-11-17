import Background from "../components/Background"
import Link from 'next/link';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import NavigationMenuDemo from '@/components/NavigationMenuDemo';

export default function Home() {
  return (
    <main className="min-h-screen relative font-poppins">
      <Background />

      <div className="fixed top-10 md:top-14 lg:top-16 left-1/2 transform -translate-x-1/2 z-50">
        <div className="bg-white/12 backdrop-blur-md px-8 py-3 rounded-lg shadow-lg ring-1 ring-white/10">
          <NavigationMenuDemo />
        </div>
      </div>
      
    </main>
  );
}
    
