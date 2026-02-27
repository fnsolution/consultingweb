"use client";
import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Linkedin, Facebook, Youtube, Instagram, Twitter } from "lucide-react";

export default function MainLayout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/" || pathname === "/company" || pathname === "/contact" || pathname === "/news" || pathname.startsWith("/news/") || pathname === "/company/team" || pathname === "/consulting" || pathname === "/career";

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
        <div className="w-full px-4 sm:px-8 md:px-12 lg:px-26">
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

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-10 h-full">
              
              {/* Company Dropdown */}
              <div className="relative group h-full flex items-center">
                <NavLink href="/company" title="COMPANY" isHomePage={isHomePage} />
                
                {/* Vertical Dropdown Menu */}
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 z-50 w-40 bg-black border-t border-[#ff3333] shadow-xl"
                  style={{ transition: "opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s ease-out" }}
                >
                  <div className="flex flex-col py-2">
                    <Link href="/company" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      회사 소개
                    </Link>
                    <Link href="/company/team" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      전문 인력
                    </Link>
                  </div>
                </div>
              </div>

              {/* Consulting Dropdown */}
              <div className="relative group h-full flex items-center">
                <NavLink href="/consulting" title="CONSULTING" isHomePage={isHomePage} />
                
                {/* Vertical Dropdown Menu */}
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 z-50 w-56 bg-black border-t border-[#ff3333] shadow-xl"
                  style={{ transition: "opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s ease-out" }}
                >
                  <div className="flex flex-col py-2">
                    <Link href="/consulting#build" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      역량강화
                    </Link>
                    <Link href="/consulting#grow" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      성장지원
                    </Link>
                    <Link href="/consulting#protect" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      자산관리
                    </Link>
                  </div>
                </div>
              </div>

              {/* News Dropdown */}
              <div className="relative group h-full flex items-center">
                <NavLink href="/news" title="NEWS" isHomePage={isHomePage} />
                
                {/* Vertical Dropdown Menu */}
                <div 
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible translate-y-2 group-hover:translate-y-0 z-50 w-40 bg-black border-t border-[#ff3333] shadow-xl"
                  style={{ transition: "opacity 0.2s ease-out, transform 0.2s ease-out, visibility 0.2s ease-out" }}
                >
                  <div className="flex flex-col py-2">
                    <Link href="/news" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      FN 공지
                    </Link>
                    <Link href="/news" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      추천사이트
                    </Link>
                    <Link href="/news" className="text-white hover:bg-white/10 px-6 py-3 transition-colors text-sm font-bold tracking-wide text-center">
                      CEO 추천도서
                    </Link>
                  </div>
                </div>
              </div>
              <NavLink href="/contact" title="CONTACT US" isHomePage={isHomePage} />
              <NavLink href="/career" title="CAREER" isHomePage={isHomePage} />
            </nav>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="text-white hover:text-white/70 focus:outline-none"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden ${mobileMenuBg} border-b border-white/10 absolute w-full top-24 left-0`}>
            <div className="px-6 pt-4 pb-8 flex flex-col">
              <MobileNavLink href="/company" onClick={toggleMenu}>COMPANY (회사 소개)</MobileNavLink>
              <MobileNavLink href="/consulting" onClick={toggleMenu}>CONSULTING (컨설팅)</MobileNavLink>
              <MobileNavLink href="/news" onClick={toggleMenu}>NEWS (새소식)</MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMenu}>CONTACT US (문의하기)</MobileNavLink>
              <MobileNavLink href="/career" onClick={toggleMenu}>CAREER (채용)</MobileNavLink>
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

function NavLink({ href, title, isHomePage }) {
  const titleColor = "text-white/90";
  const hoverColor = "group-hover:text-white";

  return (
    <Link 
      href={href} 
      className="group flex items-center h-full"
    >
      <span className={`text-[17px] font-bold tracking-wider uppercase ${titleColor} ${hoverColor} transition-colors`}>
        {title}
      </span>
    </Link>
  );
}

function MobileNavLink({ href, onClick, children }) {
  return (
    <Link 
      href={href} 
      onClick={onClick}
      className="block py-4 border-b border-white/10 last:border-0"
    >
      <span className="block text-lg font-bold text-white/90 hover:text-white transition-colors uppercase tracking-wide">
        {children}
      </span>
    </Link>
  );
}
