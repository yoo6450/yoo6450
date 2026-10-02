import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Sparkles, ArrowRight, UserCheck } from 'lucide-react';

export const Hero: React.FC = () => {
  const { user, openAuthModal, openSubscriptionModal } = useAuth();

  return (
    <section id="hero" className="min-h-[calc(100vh-80px)] grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center px-[4vw] py-16 bg-[radial-gradient(circle_at_80%_20%,rgba(249,31,14,0.06)_0%,transparent_50%)] border-b border-[#262626]">
      <div className="flex flex-col justify-center">
        <div className="font-mono text-[#f91f0e] text-xs sm:text-sm tracking-widest uppercase mb-5 flex items-center gap-2">
          <span className="w-2 h-2 bg-[#f91f0e] inline-block"></span>
          Specialty Coffee Roasters • Solar Powered
        </div>

        <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black font-sans tracking-tight uppercase leading-[0.95] mb-7 text-white">
          Never Settle <br />
          <span className="text-[#f91f0e]">For Good Enough.</span>
        </h1>

        <p className="text-base sm:text-lg text-[#a0a0a0] max-w-xl font-light leading-relaxed mb-9">
          Charlie's GoodTime은 B-Corp 인증을 받은 스페셜티 커피 회사로, 100% 태양열을 이용해 싱글 오리진 원두를 로스팅합니다. 타협 없는 완벽함과 철저한 품질 관리로 완성된 스페셜티 커피를 만나보세요.
        </p>

        {/* CTA Buttons with Login Status Integration */}
        <div className="flex flex-wrap items-center gap-4 mb-10">
          <a
            href="#products"
            className="px-6 py-3.5 bg-[#f91f0e] text-white font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#f91f0e] hover:bg-transparent hover:text-[#f91f0e] hover:shadow-[0_0_20px_rgba(249,31,14,0.3)] transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>원두 컬렉션 둘러보기</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          {!user ? (
            <button
              onClick={() => openAuthModal('login')}
              className="px-6 py-3.5 bg-[#161616] text-[#86c6fe] font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-[#2a2a2a] hover:border-[#86c6fe] transition-all flex items-center gap-2 cursor-pointer group"
            >
              <Sparkles className="w-4 h-4 text-[#86c6fe] group-hover:scale-110 transition-transform" />
              <span>회원가입하고 5,000P 받기</span>
            </button>
          ) : (
            <button
              onClick={openSubscriptionModal}
              className="px-6 py-3.5 bg-[#161616] text-emerald-400 font-mono text-xs sm:text-sm font-bold uppercase tracking-wider border border-emerald-800/60 hover:border-emerald-400 transition-all flex items-center gap-2 cursor-pointer"
            >
              <UserCheck className="w-4 h-4 text-emerald-400" />
              <span>{user.name}님 전용 정기구독 혜택 보기</span>
            </button>
          )}
        </div>

        {/* Hero Stats */}
        <div className="grid grid-cols-3 gap-5 pt-8 border-t border-[#262626]">
          <div className="font-mono">
            <div className="text-xl sm:text-2xl font-bold text-[#86c6fe] mb-1">SOLAR</div>
            <div className="text-[11px] sm:text-xs text-[#a0a0a0] uppercase leading-snug">
              태양열 친환경 로스팅
            </div>
          </div>
          <div className="font-mono">
            <div className="text-xl sm:text-2xl font-bold text-[#86c6fe] mb-1">DIRECT</div>
            <div className="text-[11px] sm:text-xs text-[#a0a0a0] uppercase leading-snug">
              농가 직거래 & 투명 가격
            </div>
          </div>
          <div className="font-mono">
            <div className="text-xl sm:text-2xl font-bold text-[#86c6fe] mb-1">B-CORP</div>
            <div className="text-[11px] sm:text-xs text-[#a0a0a0] uppercase leading-snug">
              검증된 사회적 책무
            </div>
          </div>
        </div>
      </div>

      {/* Hero Media */}
      <div className="relative border border-[#262626] bg-[#161616] group overflow-hidden">
        <img
          src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/8Q5_cZd5k9sddDMz3UI4Rg?authuser=0"
          alt="Charlie's GoodTime Roaster in motion featuring shiny roasted coffee beans"
          className="w-full h-[380px] sm:h-[500px] object-cover filter brightness-95 group-hover:scale-[1.02] transition-transform duration-500"
        />
        <div className="absolute bottom-5 left-5 bg-[#0e0e0e]/90 border border-[#86c6fe] px-4 py-2 font-mono text-xs text-[#86c6fe] tracking-wider backdrop-blur-sm">
          BATCH NO. SOLAR-ROAST // B-CORP
        </div>
      </div>
    </section>
  );
};
