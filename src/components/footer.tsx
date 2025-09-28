"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Camera, ShoppingBag, User } from "lucide-react";

export default function Footer() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home", icon: <Home size={22} /> },
    { href: "/scan", label: "Scan", icon: <Camera size={22} /> },
    { href: "/bag", label: "Bag", icon: <ShoppingBag size={22} /> },
    { href: "/profile", label: "Profile", icon: <User size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 w-full bg-white border-t border-gray-200 flex justify-around items-center h-14">
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className={`flex flex-col items-center text-xs ${
            pathname === link.href ? "text-black" : "text-gray-500"
          }`}
        >
          {link.icon}
          <span>{link.label}</span>
        </Link>
      ))}
    </div>
  );
}
