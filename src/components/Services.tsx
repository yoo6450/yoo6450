import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowUpRight } from 'lucide-react';

export const Services: React.FC = () => {
  const { openSubscriptionModal, showToast } = useAuth();

  return (
    <section id="services" className="px-[4vw] py-24 border-b border-[#262626]">
      <div className="mb-12">
        <div className="font-mono text-[#86c6fe] text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
          <span className="w-3.5 h-[2px] bg-[#86c6fe]"></span>
          Core Offerings
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          스페셜티 <span className="text-[#f91f0e]">커피 경험</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Service 1 */}
        <div
          onClick={openSubscriptionModal}
          className="bg-[#161616] border border-[#262626] p-8 sm:p-9 relative hover:border-[#86c6fe] transition-colors group cursor-pointer"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f91f0e]"></div>
          <div className="font-mono text-3xl font-bold text-white/20 mb-4 group-hover:text-[#86c6fe] transition-colors">
            01
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-[#86c6fe] transition-colors">
              원두 구독 서비스
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#888] group-hover:text-[#86c6fe] transition-colors" />
          </div>
          <p className="text-sm text-[#a0a0a0] leading-relaxed font-light mb-4">
            태양열로 로스팅한 신선한 스페셜티 싱글 오리진 원두를 원하는 주기에 맞춰 집과 사무실로 직배송합니다.
          </p>
          <span className="inline-block text-xs font-mono text-[#f91f0e] uppercase tracking-wider font-semibold">
            [자세히 보기 & 신청 →]
          </span>
        </div>

        {/* Service 2 */}
        <div
          onClick={() => showToast('바리스타 교육 프로그램 일정 안내가 이메일로 전달됩니다.', 'info')}
          className="bg-[#161616] border border-[#262626] p-8 sm:p-9 relative hover:border-[#86c6fe] transition-colors group cursor-pointer"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f91f0e]"></div>
          <div className="font-mono text-3xl font-bold text-white/20 mb-4 group-hover:text-[#86c6fe] transition-colors">
            02
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-[#86c6fe] transition-colors">
              바리스타 교육 프로그램
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#888] group-hover:text-[#86c6fe] transition-colors" />
          </div>
          <p className="text-sm text-[#a0a0a0] leading-relaxed font-light mb-4">
            초급 홈카페 마스터 과정부터 전문 바리스타 테크닉, 스페셜티 추출 스킬까지 전문가의 깊이 있는 커리큘럼을 제공합니다.
          </p>
          <span className="inline-block text-xs font-mono text-[#86c6fe] uppercase tracking-wider font-semibold">
            [수강 신청 문의 →]
          </span>
        </div>

        {/* Service 3 */}
        <a
          href="#visit"
          className="bg-[#161616] border border-[#262626] p-8 sm:p-9 relative hover:border-[#86c6fe] transition-colors group block"
        >
          <div className="absolute top-0 left-0 w-full h-[2px] bg-[#f91f0e]"></div>
          <div className="font-mono text-3xl font-bold text-white/20 mb-4 group-hover:text-[#86c6fe] transition-colors">
            03
          </div>
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xl font-bold text-white group-hover:text-[#86c6fe] transition-colors">
              장인 정신 카페 경험
            </h3>
            <ArrowUpRight className="w-4 h-4 text-[#888] group-hover:text-[#86c6fe] transition-colors" />
          </div>
          <p className="text-sm text-[#a0a0a0] leading-relaxed font-light mb-4">
            커피 장인 정신을 기리는 매장에서 로스터의 섬세한 추출과 최상의 핸드드립 커피를 오감으로 경험하실 수 있습니다.
          </p>
          <span className="inline-block text-xs font-mono text-[#a0a0a0] group-hover:text-white uppercase tracking-wider font-semibold">
            [충주호 쇼룸 방문 안내 →]
          </span>
        </a>
      </div>

      {/* Solar Powered Sustainability Banner */}
      <div className="mt-14 bg-[#161616] border border-[#262626] grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 items-center overflow-hidden">
        <div className="p-8 sm:p-10 order-2 lg:order-1">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            Solar Powered Sustainability
          </h3>
          <p className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed mb-6 font-light">
            Charlie's GoodTime은 태양 에너지를 동력으로 사용하는 첨단 로스터를 도입하여 탄소 배출을 최소화합니다. 환경을 생각하는 B-Corp 인증 브랜드와 함께 지속 가능한 커피 문화를 경험해 보세요.
          </p>
          <div className="font-mono text-xs text-[#f91f0e] tracking-wider">
            // B-CORP CERTIFIED STANDARDS
          </div>
        </div>
        <div className="h-72 sm:h-80 w-full overflow-hidden order-1 lg:order-2">
          <img
            src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/bVll2rXtzE-1ByWKNWVOlM?authuser=0"
            alt="Solar energy tech background"
            className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>
      </div>
    </section>
  );
};
