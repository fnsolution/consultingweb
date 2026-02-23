"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Linkedin, Facebook, Youtube, Instagram, Twitter } from "lucide-react";

export default function MainLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/company" || pathname === "/contact" || pathname === "/news" || pathname === "/company/team" || pathname === "/consulting";

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Navbar styles based on route
  // Navbar styles based on route
  const headerClass = isHomePage 
    ? "fixed top-0 w-full z-50 bg-gradient-to-b from-black/80 to-transparent transition-all duration-300"
    : "sticky top-0 z-50 bg-black text-white border-b border-white/10";
    
  // Navbar is always dark theme now (either transparent-dark or solid-black)
  const logoColorClass = "text-white";
  const mobileMenuBg = "bg-black/90 backdrop-blur-xl";

  return (
    <div className="min-h-screen flex flex-col font-sans">
      <header className={headerClass}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="flex items-center gap-2">
                 <img
                   src="/logo-light.png"
                   alt="FnSolution"
                   className="h-10 md:h-12 w-auto object-contain transition-all duration-300"
                 />
              </Link>
            </div>

            {/* Desktop Navigation - Duarte Style */}
            <nav className="hidden md:flex items-center space-x-12">
              
              {/* Company Dropdown */}
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <NavLink href="/company" label="About Us" title="COMPANY" isHomePage={isHomePage} />
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-48 hidden group-hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                    <Link href="/company" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="block text-sm font-bold">About Us</span>
                      <span className="block text-xs text-gray-500">Vision & Philosophy</span>
                    </Link>
                    <Link href="/company/team" className="block px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors">
                      <span className="block text-sm font-bold">Our Team</span>
                      <span className="block text-xs text-gray-500">Professionals</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              
              <div 
                className="relative group h-full flex items-center"
                onMouseEnter={() => setIsMenuOpen(true)}
                onMouseLeave={() => setIsMenuOpen(false)}
              >
                <NavLink href="/consulting" label="Our Solutions" title="CONSULTING" isHomePage={isHomePage} />
                
                {/* Dropdown Menu */}
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 w-72 hidden group-hover:block">
                  <div className="bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden py-2">
                    <Link href="/consulting#build" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">BUILD</span>
                      <span className="block text-xs text-gray-500">Foundation & System</span>
                    </Link>
                    <Link href="/consulting#grow" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">GROW</span>
                      <span className="block text-xs text-gray-500">Strategy & Funding</span>
                    </Link>
                    <Link href="/consulting#protect" className="block px-6 py-3 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors">
                      <span className="block text-sm font-bold">PROTECT</span>
                      <span className="block text-xs text-gray-500">Finance & Assets</span>
                    </Link>
                  </div>
                </div>
              </div>

              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              <NavLink href="/news" label="Latest Updates" title="NEWS" isHomePage={isHomePage} />
              <div className={`h-10 w-px ${isHomePage ? 'bg-white/20' : 'bg-gray-200'}`}></div>
              <NavLink href="/contact" label="Get in Touch" title="CONTACT US" isHomePage={isHomePage} />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-primary focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${mobileMenuBg} border-b border-white/10 absolute w-full top-24 left-0`}>
            <div className="px-4 pt-4 pb-6 space-y-4">
              <MobileNavLink href="/company" onClick={toggleMenu} label="About Us">COMPANY</MobileNavLink>
              <div className="border-t border-gray-100/10 my-2"></div>
              <p className="text-xs text-gray-400 px-2 mb-2">CONSULTING</p>
              <div className="pl-4 space-y-2">
                <MobileNavLink href="/consulting#build" onClick={toggleMenu} label="Foundation & System">BUILD</MobileNavLink>
                <MobileNavLink href="/consulting#grow" onClick={toggleMenu} label="Strategy & Funding">GROW</MobileNavLink>
                <MobileNavLink href="/consulting#protect" onClick={toggleMenu} label="Finance & Assets">PROTECT</MobileNavLink>
              </div>
              <div className="border-t border-gray-100/10 my-2"></div>
              <MobileNavLink href="/news" onClick={toggleMenu} label="Latest Updates">NEWS</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu} label="Get in Touch">CONTACT US</MobileNavLink>
            </div>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-black border-t border-white/10 py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Top Row: Brand & Socials */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
             {/* Logo */}
             <div>
               <h3 className="text-2xl font-bold tracking-tight uppercase text-white">FN solution</h3>
             </div>
             
             {/* Social & Util */}
             <div className="flex items-center gap-6 mt-6 md:mt-0 text-white/70">
                <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Youtube size={20} /></a>
                <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
             </div>
          </div>

          {/* Bottom Row: Company Info & Links */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 pt-8 px-0 border-t border-white/10">
             
             {/* Left: Info & Copyright */}
             <div className="space-y-4">
                <div className="flex gap-4 text-xs font-bold text-gray-300">
                    <Link href="#" className="hover:text-white transition-colors">개인정보처리방침</Link>
                    <span className="text-white/20">|</span>
                    <Link href="#" className="hover:text-white transition-colors">이메일무단수집거부</Link>
                </div>

                <div className="text-xs text-white/50 space-y-1.5 leading-relaxed font-light">
                    <p className="font-bold text-white/80">(주)에프앤솔루션 <span className="mx-2 text-white/20">|</span> 대표이사 : 안태건</p>
                    <p>주소 : 서울특별시 금천구 가산디지털1로 145 에이스하이엔드타워3차 903호 <span className="mx-2 text-white/20">|</span> 사업자번호 : 783-81-00424</p>
                    <p>전화번호 : 02-6746-0143 <span className="mx-2 text-white/20">|</span> 팩스 : 02-6746-0190</p>
                    <p className="pt-4 font-medium text-white/40">COPYRIGHTⒸ2020 by FN solution. ALL RIGHTS RESERVED</p>
                </div>
             </div>

          </div>

        </div>
      </footer>
    </div>
  );
}

function NavLink({ href, label, title, isHomePage }) {
  // Always light text for dark navbar
  const labelColor = "text-gray-400";
  const titleColor = "text-white";
  const hoverColor = "group-hover:text-white";

  return (
    <Link 
      href={href} 
      className="group flex flex-col items-start"
    >
      <span className={`text-xs uppercase tracking-wide mb-0.5 font-medium ${labelColor} transition-colors`}>
        {label}
      </span>
      <span className={`text-xl font-bold tracking-tight ${titleColor} ${hoverColor} transition-colors`}>
        {title}
      </span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, label, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block py-2"
    >
      <span className="block text-xs text-gray-400 mb-1">{label}</span>
      <span className="block text-lg font-bold text-white hover:text-accent">
        {children}
      </span>
    </Link>
  );
}
