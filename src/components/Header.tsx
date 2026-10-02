import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User as UserIcon, LogOut, Coffee, Package, ShieldCheck, ChevronDown, Sparkles, Menu, X } from 'lucide-react';

export const Header: React.FC = () => {
  const { user, openAuthModal, logout, openProfileModal, openSubscriptionModal } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-20 bg-[#0e0e0e]/95 backdrop-blur-md border-b border-[#262626] z-50 flex items-center justify-between px-[4vw]">
      {/* Brand Logo */}
      <a href="#hero" className="flex items-center gap-3 font-mono font-bold text-lg sm:text-xl tracking-tight uppercase select-none group">
        <span>
          Charlie's <span className="text-[#f91f0e] transition-colors group-hover:text-red-400">GoodTime</span>
        </span>
        <span className="text-[10px] px-1.5 py-0.5 bg-[#f91f0e]/15 border border-[#f91f0e] text-[#f91f0e] tracking-widest font-semibold">
          B-CORP
        </span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden lg:flex items-center gap-8">
        <a href="#about" className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0] hover:text-[#f91f0e] transition-colors">
          소개
        </a>
        <a href="#products" className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0] hover:text-[#f91f0e] transition-colors">
          원두 컬렉션
        </a>
        <a href="#services" className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0] hover:text-[#f91f0e] transition-colors">
          서비스
        </a>
        <a href="#reviews" className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0] hover:text-[#f91f0e] transition-colors">
          후기
        </a>
        <a href="#visit" className="font-mono text-xs uppercase tracking-wider text-[#a0a0a0] hover:text-[#f91f0e] transition-colors">
          오시는 길
        </a>
      </nav>

      {/* User Auth Action Area */}
      <div className="flex items-center gap-3">
        {user ? (
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2.5 px-3 py-1.5 bg-[#161616] border border-[#262626] hover:border-[#86c6fe] transition-all text-xs font-mono group cursor-pointer"
            >
              <div className="w-6 h-6 rounded-full bg-[#f91f0e]/20 border border-[#f91f0e] flex items-center justify-center text-[#f91f0e] font-bold text-[11px]">
                {user.name.charAt(0)}
              </div>
              <div className="text-left hidden sm:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-[#f0f0f0] font-semibold">{user.name}</span>
                  <span className="text-[10px] text-[#86c6fe] px-1 py-0.2 bg-[#86c6fe]/10 border border-[#86c6fe]/40">
                    {user.membershipTier === 'Solar Club VIP' ? 'VIP' : 'MEMBER'}
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-[#a0a0a0] transition-transform duration-200 ${dropdownOpen ? 'rotate-180 text-[#86c6fe]' : ''}`} />
            </button>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#141414] border border-[#2c2c2c] shadow-2xl z-50 py-2 animate-in fade-in zoom-in-95 duration-150">
                {/* User Info Header */}
                <div className="px-4 py-3 border-b border-[#262626] bg-[#1a1a1a]/50">
                  <p className="text-xs text-[#a0a0a0] font-mono">가입 이메일</p>
                  <p className="text-sm font-mono text-[#f0f0f0] truncate">{user.email}</p>
                  <div className="mt-2 flex items-center justify-between text-[11px] font-mono">
                    <span className="text-[#86c6fe] flex items-center gap-1">
                      <Sparkles className="w-3 h-3" /> {user.points.toLocaleString()} P
                    </span>
                    <span className="text-[#f91f0e]">{user.membershipTier}</span>
                  </div>
                </div>

                {/* Menu items */}
                <div className="py-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openProfileModal();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-[#f0f0f0] hover:bg-[#1f1f1f] hover:text-[#86c6fe] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <UserIcon className="w-3.5 h-3.5 text-[#86c6fe]" />
                    <span>내 프로필 & 멤버십</span>
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openSubscriptionModal();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-[#f0f0f0] hover:bg-[#1f1f1f] hover:text-[#f91f0e] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Coffee className="w-3.5 h-3.5 text-[#f91f0e]" />
                    <span>태양열 원두 정기구독</span>
                    {user.subscription?.active && (
                      <span className="ml-auto text-[9px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-1 py-0.5">
                        구독중
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      openProfileModal();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-[#f0f0f0] hover:bg-[#1f1f1f] flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <Package className="w-3.5 h-3.5 text-[#a0a0a0]" />
                    <span>주문/배송 내역 ({user.orders.length})</span>
                  </button>
                </div>

                <div className="border-t border-[#262626] pt-1">
                  <button
                    onClick={() => {
                      setDropdownOpen(false);
                      logout();
                    }}
                    className="w-full text-left px-4 py-2.5 text-xs font-mono text-red-400 hover:bg-red-950/20 flex items-center gap-2.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>로그아웃</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openAuthModal('login')}
              className="inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-2 bg-[#f91f0e] text-white font-mono text-xs font-bold uppercase tracking-wider border border-[#f91f0e] hover:bg-transparent hover:text-[#f91f0e] hover:shadow-[0_0_15px_rgba(249,31,14,0.35)] transition-all cursor-pointer"
            >
              <UserIcon className="w-3.5 h-3.5" />
              <span>로그인 / 회원가입</span>
            </button>
          </div>
        )}

        {/* Mobile menu toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 text-[#a0a0a0] hover:text-white border border-[#262626] bg-[#161616]"
          aria-label="Toggle Navigation"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed top-20 left-0 w-full bg-[#0e0e0e]/98 border-b border-[#262626] p-6 flex flex-col gap-4 font-mono z-40 backdrop-blur-xl">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-[#f0f0f0] py-2 border-b border-[#1f1f1f]"
          >
            소개 (About)
          </a>
          <a
            href="#products"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-[#f0f0f0] py-2 border-b border-[#1f1f1f]"
          >
            원두 컬렉션 (Products)
          </a>
          <a
            href="#services"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-[#f0f0f0] py-2 border-b border-[#1f1f1f]"
          >
            서비스 (Services)
          </a>
          <a
            href="#reviews"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-[#f0f0f0] py-2 border-b border-[#1f1f1f]"
          >
            후기 (Reviews)
          </a>
          <a
            href="#visit"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm uppercase tracking-wider text-[#f0f0f0] py-2 border-b border-[#1f1f1f]"
          >
            오시는 길 (Visit)
          </a>

          {!user ? (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openAuthModal('login');
                }}
                className="w-full py-3 bg-[#f91f0e] text-white text-center font-bold uppercase tracking-wider text-xs"
              >
                로그인 / 회원가입
              </button>
            </div>
          ) : (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  openProfileModal();
                }}
                className="w-full py-2.5 bg-[#161616] border border-[#86c6fe] text-[#86c6fe] text-center text-xs"
              >
                내 프로필 / 주문조회
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  logout();
                }}
                className="w-full py-2 text-red-400 text-center text-xs"
              >
                로그아웃
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
