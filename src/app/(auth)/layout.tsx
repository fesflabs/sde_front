'use client';
import Image from 'next/image';

import backgroundImageLogin from '../../../public/assets/images/background_login.jpg';
import backgroundImageRegister from '../../../public/assets/images/background_register.jpg';
import fesf_logo from '../../../public/assets/images/logo.png';
import { usePathname } from 'next/navigation';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isRegisterPage = pathname === '/change password' || pathname === '/register';

  return (
    <div className="grid min-h-screen w-full lg:grid-cols-2">
      {/* Left side - Background image (only on desktop) */}
      <div className="relative hidden lg:block">
        <div className="bg-background absolute top-4 left-10 z-10 rounded-b-lg py-2">
          <Image src={fesf_logo} alt="FESF Logo" className="w-44 object-contain" />
        </div>
        <Image
          src={isRegisterPage ? backgroundImageRegister : backgroundImageLogin}
          alt={isRegisterPage ? 'SRS Background Register' : 'SRS Background Login'}
          priority
          fill
          className="rounded-r-3xl object-cover"
          quality={100}
        />
      </div>

      {/* Right side - Content (form) - Full width on mobile, half on desktop */}
      <div className="flex items-center justify-center p-8">
        {/* Mobile logo (only visible on mobile) */}
        <div className="absolute top-4 left-4 lg:hidden">
          <Image src={fesf_logo} alt="FESF Logo" className="w-32 object-contain" />
        </div>

        {/* Content container */}
        <div className="w-full max-w-md">{children}</div>
      </div>
    </div>
  );
}
