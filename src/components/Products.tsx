import React from 'react';
import { useAuth } from '../context/AuthContext';
import { ShoppingBag, ArrowRight } from 'lucide-react';

export const Products: React.FC = () => {
  const { user, openAuthModal, openSubscriptionModal } = useAuth();

  const handleOrderClick = () => {
    if (!user) {
      openAuthModal('login');
    } else {
      openSubscriptionModal();
    }
  };

  return (
    <section id="products" className="bg-[#111111] px-[4vw] py-24 border-b border-[#262626]">
      <div className="mb-12">
        <div className="font-mono text-[#86c6fe] text-xs uppercase tracking-widest flex items-center gap-2 mb-3">
          <span className="w-3.5 h-[2px] bg-[#86c6fe]"></span>
          Curated Specialty Beans
        </div>
        <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white">
          시그니처 <span className="text-[#f91f0e]">원두 컬렉션</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Product 1: Roaster’s Choice Collection */}
        <div className="bg-[#161616] border border-[#262626] flex flex-col hover:-translate-y-1 hover:border-[#f91f0e] transition-all duration-300 group">
          <div className="w-full h-80 relative bg-black border-b border-[#262626] overflow-hidden">
            <img
              src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/bmkUGro_UUN56H4aNJd4Dw?authuser=0"
              alt="Roaster’s Choice Collection trio coffee packaging"
              className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 right-4 bg-[#f91f0e] text-white font-mono text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
              Trio Collection
            </span>
          </div>

          <div className="p-7 sm:p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-3">Roaster’s Choice Collection</h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6 font-light">
              A curated trio of our finest coffees, featuring diverse origins and processing methods to provide a complete tasting experience from around the world.
            </p>

            <div className="mt-auto border-t border-dashed border-[#262626] pt-5 flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Included Items:</span>
                <span className="text-[#86c6fe] font-bold text-right">
                  Ethiopia Yirgacheffe, Colombia Huila, Brazilian Santos
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Tasting Scope:</span>
                <span className="text-[#86c6fe] font-bold text-right">
                  Bright, floral African notes to deep, chocolatey profiles
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Features:</span>
                <span className="text-[#86c6fe] font-bold text-right">
                  선물용 및 데일리 브루잉에 최적화된 시그니처 3종
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#888] font-mono block">회원 전용 정기구독가</span>
                <span className="text-xl font-bold font-mono text-white">48,000원</span>
                <span className="text-[11px] text-[#f91f0e] font-mono ml-2 font-bold">(15% 할인)</span>
              </div>
              <button
                onClick={handleOrderClick}
                className="px-4 py-2.5 bg-[#f91f0e] hover:bg-[#d8190b] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>구독 및 구매</span>
              </button>
            </div>
          </div>
        </div>

        {/* Product 2: Roaster’s Ethiopia Guji */}
        <div className="bg-[#161616] border border-[#262626] flex flex-col hover:-translate-y-1 hover:border-[#f91f0e] transition-all duration-300 group">
          <div className="w-full h-80 relative bg-black border-b border-[#262626] overflow-hidden">
            <img
              src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/akyvucMEEQw2tyisFD9_kC?authuser=0"
              alt="Roaster’s Ethiopia Guji coffee bag beside beans"
              className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
            />
            <span className="absolute top-4 right-4 bg-[#f91f0e] text-white font-mono text-[11px] font-bold px-2.5 py-1 uppercase tracking-wider">
              Single Origin
            </span>
          </div>

          <div className="p-7 sm:p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-white mb-3">Roaster’s Ethiopia Guji</h3>
            <p className="text-[#a0a0a0] text-sm leading-relaxed mb-6 font-light">
              Experience the vibrant and complex flavors of Ethiopia with our premium Guji single-origin beans, roasted to perfection for a clean and aromatic cup.
            </p>

            <div className="mt-auto border-t border-dashed border-[#262626] pt-5 flex flex-col gap-3 font-mono text-xs">
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Roast Level:</span>
                <span className="text-[#86c6fe] font-bold text-right">Light Roast (약배전)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Flavor Profile:</span>
                <span className="text-[#86c6fe] font-bold text-right">
                  Distinct notes of jasmine and stone fruit
                </span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Net Weight:</span>
                <span className="text-[#86c6fe] font-bold text-right">12 oz (340g)</span>
              </div>
              <div className="flex justify-between items-baseline">
                <span className="text-[#a0a0a0]">Features:</span>
                <span className="text-[#86c6fe] font-bold text-right">
                  Sustainably sourced, single-origin Arabica
                </span>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#262626] flex items-center justify-between">
              <div>
                <span className="text-xs text-[#888] font-mono block">단품 및 정기배송가</span>
                <span className="text-xl font-bold font-mono text-white">22,000원</span>
                <span className="text-[11px] text-[#f91f0e] font-mono ml-2 font-bold">(무료배송)</span>
              </div>
              <button
                onClick={handleOrderClick}
                className="px-4 py-2.5 bg-[#f91f0e] hover:bg-[#d8190b] text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>구독 및 구매</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Craft Feature Banner */}
      <div className="mt-16 bg-[#161616] border border-[#262626] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-8 items-center overflow-hidden">
        <div className="h-72 sm:h-80 w-full overflow-hidden">
          <img
            src="https://labs.google.com/pomelli_downloads/websites/awXb9RNFJ2v5Ggu195Q4jM/resources/8bDz64Wrxbh4zliWuXq_sG?authuser=0"
            alt="Specialty coffee cupping precision assessment"
            className="w-full h-full object-cover filter brightness-95 hover:scale-105 transition-transform duration-500"
          />
        </div>
        <div className="p-8 sm:p-10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-4">
            엄격한 품질 관리 & 테이스팅
          </h3>
          <p className="text-sm sm:text-base text-[#a0a0a0] leading-relaxed mb-5 font-light">
            모든 로스팅 배치마다 전문 바리스타와 로스터가 참여하는 센서리 컵핑을 수행합니다. 원두 본연의 화려한 아로마와 깔끔한 애프터테이스트를 검증한 최상의 원두만을 여러분께 전합니다.
          </p>
          <div className="font-mono text-xs text-[#86c6fe]">
            // QUALITY CONTROL standard 100% Guaranteed
          </div>
        </div>
      </div>
    </section>
  );
};
