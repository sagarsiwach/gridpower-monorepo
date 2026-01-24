"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// ============================================================================
// TYPES & DATA
// ============================================================================

interface NavItem {
  label: string;
  href: string;
  description?: string;
  hasDropdown?: boolean;
  children?: { label: string; href: string; description: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Energy",
    href: "#energy",
    hasDropdown: true,
    children: [
      { label: "Home Energy", href: "#gridenergy-home", description: "Solar storage solutions for residential homes" },
      { label: "Office Energy", href: "#gridenergy-office", description: "Commercial-grade energy storage systems" },
      { label: "Industrial", href: "#gridenergy-industrial", description: "Container-scale storage for factories" },
      { label: "Power Parks", href: "#gridenergy-powerpark", description: "Grid-scale energy installations" },
    ],
  },
  {
    label: "Charge",
    href: "#charge",
    hasDropdown: true,
    children: [
      { label: "Home Charging", href: "#gridcharge-home", description: "Smart residential EV chargers" },
      { label: "Office Charging", href: "#gridcharge-office", description: "Workplace charging solutions" },
      { label: "Commercial", href: "#gridcharge-commercial", description: "Public charging infrastructure" },
      { label: "Fleet", href: "#gridcharge-enterprise", description: "Depot and fleet charging systems" },
    ],
  },
  {
    label: "Drive",
    href: "#drive",
    hasDropdown: true,
    children: [
      { label: "EV Powertrains", href: "#drive-powertrains", description: "Complete electric drive systems" },
      { label: "Components", href: "#drive-components", description: "Motors, controllers, and inverters" },
    ],
  },
  {
    label: "Why Open",
    href: "#why-open",
    hasDropdown: false,
  },
  {
    label: "Resources",
    href: "#resources",
    hasDropdown: true,
    children: [
      { label: "Documentation", href: "#docs", description: "Technical guides and API references" },
      { label: "Support", href: "#support", description: "Get help from our team" },
      { label: "Blog", href: "#blog", description: "News, updates, and insights" },
    ],
  },
];

// ============================================================================
// LIST ITEM COMPONENT (shadcn pattern)
// ============================================================================

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-lg p-3 leading-none no-underline outline-none transition-colors",
            "hover:bg-gray-50 focus:bg-gray-50",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none text-gray-900">
            {title}
          </div>
          <p className="line-clamp-2 text-sm leading-snug text-gray-500">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// ============================================================================
// MOBILE MENU (Restored proper styling)
// ============================================================================

function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              zIndex: 40,
              backdropFilter: "blur(4px)",
              WebkitBackdropFilter: "blur(4px)",
            }}
            onClick={onClose}
          />

          {/* Menu Panel */}
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              bottom: 0,
              width: "300px",
              maxWidth: "85vw",
              backgroundColor: "#fff",
              zIndex: 50,
              boxShadow: "4px 0 24px rgba(0, 0, 0, 0.15)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Menu Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <Image
                src="/site/Gridpower Logo.svg"
                alt="GridPower"
                width={120}
                height={30}
                priority
              />
              <button
                onClick={onClose}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "36px",
                  height: "36px",
                  borderRadius: "8px",
                  backgroundColor: "#f3f4f6",
                  border: "none",
                  cursor: "pointer",
                }}
                aria-label="Close menu"
              >
                <XMarkIcon style={{ width: "20px", height: "20px", color: "#374151" }} />
              </button>
            </div>

            {/* Menu Items */}
            <nav style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>
              <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
                {navItems.map((item, index) => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      onClick={onClose}
                      style={{
                        display: "block",
                        padding: "16px 16px",
                        marginBottom: index < navItems.length - 1 ? "4px" : 0,
                        borderRadius: "12px",
                        textDecoration: "none",
                        transition: "background-color 0.15s ease",
                        backgroundColor: "transparent",
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = "#f9fafb";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                      }}
                    >
                      <span
                        style={{
                          display: "block",
                          fontSize: "16px",
                          fontWeight: 500,
                          color: "#111827",
                          marginBottom: "4px",
                          fontFamily: "var(--font-sans)",
                        }}
                      >
                        {item.label}
                      </span>
                      {item.children?.[0] && (
                        <span
                          style={{
                            display: "block",
                            fontSize: "14px",
                            color: "#6b7280",
                            fontFamily: "var(--font-sans)",
                            lineHeight: 1.4,
                          }}
                        >
                          {item.children[0].description}
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Menu Footer */}
            <div
              style={{
                padding: "20px 24px",
                borderTop: "1px solid #e5e7eb",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <a
                href="#login"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "14px 24px",
                  borderRadius: "10px",
                  border: "0.5px solid #b91c1c",
                  background: "linear-gradient(180deg, #DC2626 0%, #B91C1C 70%, #DC2626 100%)",
                  boxShadow: "inset 0 0 1px 0 #fef2f2, 0 0.5px 0 0 #ef4444",
                  textDecoration: "none",
                  fontSize: "15px",
                  fontWeight: 500,
                  color: "#fff",
                  fontFamily: "var(--font-sans)",
                }}
              >
                Login
              </a>
              <p
                style={{
                  fontSize: "12px",
                  color: "#9ca3af",
                  textAlign: "center",
                  margin: 0,
                  fontFamily: "var(--font-sans)",
                }}
              >
                Need help? Contact us
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ============================================================================
// MOBILE HEADER (< 768px)
// ============================================================================

function MobileHeader({ onMenuOpen }: { onMenuOpen: () => void }) {
  return (
    <div
      className="flex md:hidden"
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        height: "36px",
        position: "relative",
      }}
    >
      {/* Menu Button */}
      <button
        onClick={onMenuOpen}
        aria-label="Open menu"
        style={{
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          background: "#fff",
          cursor: "pointer",
        }}
      >
        <Bars3Icon style={{ width: "20px", height: "20px", color: "#374151" }} />
      </button>

      {/* Logo - Center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/site/Gridpower Logo.svg"
          alt="GridPower"
          width={128}
          height={32}
          priority
        />
      </div>

      {/* Register Button */}
      <a
        href="#register"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "8px 16px",
          borderRadius: "6px",
          border: "1px solid #d1d5db",
          background: "#fff",
          textDecoration: "none",
          fontSize: "14px",
          fontWeight: 500,
          color: "#374151",
          fontFamily: "var(--font-sans)",
        }}
      >
        Register
      </a>
    </div>
  );
}

// ============================================================================
// TABLET HEADER (768px - 1279px)
// ============================================================================

function TabletHeader() {
  return (
    <div
      className="hidden md:flex lg:hidden"
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "672px",
        margin: "0 auto",
        height: "44px",
        position: "relative",
      }}
    >
      {/* Menu Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "8px 14px",
              borderRadius: "8px",
              border: "1px solid #d1d5db",
              background: "#fff",
              cursor: "pointer",
              fontSize: "15px",
              fontWeight: 500,
              color: "#374151",
              fontFamily: "var(--font-sans)",
            }}
          >
            Menu
            <ChevronDownIcon style={{ width: "16px", height: "16px" }} />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="w-56">
          {navItems.map((item) => (
            <DropdownMenuItem key={item.label} asChild>
              <a href={item.href} className="cursor-pointer">
                {item.label}
              </a>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Logo - Center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <Image
          src="/site/Gridpower Logo.svg"
          alt="GridPower"
          width={142}
          height={40}
          priority
        />
      </div>

      {/* Register Button */}
      <a
        href="#register"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "8px 14px",
          borderRadius: "8px",
          border: "1px solid #d1d5db",
          background: "#fff",
          textDecoration: "none",
          fontSize: "15px",
          fontWeight: 500,
          color: "#374151",
          fontFamily: "var(--font-sans)",
        }}
      >
        Register
      </a>
    </div>
  );
}

// ============================================================================
// DESKTOP HEADER (1280px+)
// ============================================================================

function DesktopHeader() {
  return (
    <div
      className="hidden lg:flex"
      style={{
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        maxWidth: "1280px",
        margin: "0 auto",
        height: "48px",
        position: "relative",
      }}
    >
      {/* Logo */}
      <Link href="/">
        <Image
          src="/site/Gridpower Logo.svg"
          alt="GridPower"
          width={142}
          height={40}
          priority
        />
      </Link>

      {/* Navigation - Center */}
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <NavigationMenu>
          <NavigationMenuList style={{ display: "flex", gap: "6px" }}>
            {navItems.map((item) => (
              <NavigationMenuItem key={item.label}>
                {item.hasDropdown && item.children ? (
                  <>
                    <NavigationMenuTrigger
                      style={{
                        height: "36px",
                        padding: "0 14px",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#374151",
                        background: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {item.label}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[300px] gap-1 p-3">
                        {item.children.map((child) => (
                          <ListItem
                            key={child.label}
                            title={child.label}
                            href={child.href}
                          >
                            {child.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        height: "36px",
                        padding: "0 14px",
                        fontSize: "15px",
                        fontWeight: 500,
                        color: "#374151",
                        background: "#fff",
                        border: "1px solid #d1d5db",
                        borderRadius: "8px",
                        textDecoration: "none",
                        fontFamily: "var(--font-sans)",
                      }}
                    >
                      {item.label}
                    </a>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Actions */}
      <div style={{ display: "flex", alignItems: "center", gap: "4px" }}>
        <a
          href="#register"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: "32px",
            padding: "0 12px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "#dc2626",
            background: "#fff",
            border: "1px solid #fca5a5",
            borderRadius: "6px",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
          }}
        >
          Register
        </a>
        <a
          href="#login"
          style={{
            display: "inline-flex",
            alignItems: "center",
            height: "32px",
            padding: "0 12px",
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "#fff",
            background: "#dc2626",
            border: "1px solid #b91c1c",
            borderRadius: "6px",
            textDecoration: "none",
            fontFamily: "var(--font-mono)",
          }}
        >
          Login
        </a>
      </div>
    </div>
  );
}

// ============================================================================
// HEADER COMPONENT
// ============================================================================

export function Header({ className }: { className?: string }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <>
      <header
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          padding: "16px 24px",
          backgroundColor: "#fff",
        }}
        className={className}
      >
        <MobileHeader onMenuOpen={() => setIsMenuOpen(true)} />
        {isMounted && <TabletHeader />}
        {isMounted && <DesktopHeader />}
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

export default Header;
