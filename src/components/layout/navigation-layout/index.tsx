"use client";

import Image from "next/image";
import { navigationItems } from "./navigation-items";
import { NavigationButton } from "./navigation-button";
import { usePathname } from "next/navigation";
import { routes } from "@/lib/routes";

export default function NavigationLayout() {
  const pathname = usePathname();

  if (pathname === routes.LOGIN) return null;

  return (
    <aside className="fixed flex h-screen w-[76px] flex-col items-center justify-start gap-1 border-r border-gray-100 bg-white">
      <div className="p-6">
        <Image src="/assets/svg/logo.svg" alt="Logo" width={28} height={28} />
      </div>
      <div className="flex w-full flex-col items-center">
        {navigationItems.map((item) => (
          <NavigationButton
            key={item.label}
            to={item.to}
            defaultIcon={item.defaultIcon}
            label={item.label}
          />
        ))}
      </div>
      <div className="flex h-[92px] items-center">
        <Image
          src="/assets/svg/navigation/default-icons/profile.svg"
          alt="Logo"
          width={24}
          height={24}
        />
      </div>
    </aside>
  );
}
