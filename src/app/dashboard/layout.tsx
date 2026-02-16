import SideNav from '@/app/ui/dashboard/sidenav';
import Header from '@/app/ui/dashboard/header';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-whitedark:bg-white">
      <div className="w-full flex-none md:w-64">
        <SideNav />
      </div>
      <div className="flex-grow flex flex-col md:overflow-y-auto">
        <Header />
        <div className="flex-grow p-6 md:p-12">{children}</div>
      </div>
    </div>
  );
}
