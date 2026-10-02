import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="px-[4vw] py-24 border-b border-[#262626]">
      <div className="mb-12">
        <div className="font-mono text-[#86c6fe] text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
          <span className="w-3.5 h-[2px] bg-[#86c6fe]"></span>
          Brand Values & Philosophy
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          투명성, 품질, 그리고 <span className="text-[#f91f0e]">장인 정신</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
        <div>
          <p className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-6 font-light">
            우리는 최고에 만족하지 않고, 끊임없이 커피의 본질을 탐구합니다. 농부와의 직접적인 거래 관계를 형성하여 공정한 대가를 지급하며, 원두가 재배되어 잔에 담기기까지의 모든 과정을 투명하게 관리합니다.
          </p>
          <p className="text-base sm:text-lg text-[#a0a0a0] leading-relaxed mb-8 font-light">
            태양열 에너지를 이용해 원두를 로스팅함으로써 환경적 부담을 최소화하고, B-Corp 인증 기업으로서 지속 가능한 스페셜티 커피 생태계를 만드는 데 앞장서고 있습니다.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="bg-[#161616] p-6 border border-[#262626] hover:border-[#f91f0e] transition-colors">
              <h3 className="font-mono text-sm text-[#f91f0e] font-bold uppercase mb-2">
                Pricing Transparency
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
                투명한 가격 정책과 직거래를 통한 농부와의 공정한 가치 창출
              </p>
            </div>
            <div className="bg-[#161616] p-6 border border-[#262626] hover:border-[#f91f0e] transition-colors">
              <h3 className="font-mono text-sm text-[#f91f0e] font-bold uppercase mb-2">
                Strict Quality
              </h3>
              <p className="text-xs sm:text-sm text-[#a0a0a0] leading-relaxed">
                생두 선정부터 로스팅까지 엄격하고 철저한 품질 관리
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="border border-[#262626] bg-[#161616] overflow-hidden">
            <img
              src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/8_y1lr46Gy_bMBR5LflOqb?authuser=0"
              alt="Barista wearing leather apron pouring latte art"
              className="w-full h-64 object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div className="border border-[#262626] bg-[#161616] overflow-hidden">
            <img
              src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/9v9_5KHY5x0eEDGgdAQ_xG?authuser=0"
              alt="Three portafilters showcasing stages of coffee preparation"
              className="w-full h-64 object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
