import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Coffee, ShieldCheck, Sun, Check, ArrowRight } from 'lucide-react';

export const SubscriptionModal: React.FC = () => {
  const { user, isSubscriptionModalOpen, closeSubscriptionModal, openAuthModal, updateSubscription, showToast } = useAuth();

  const [selectedBean, setSelectedBean] = useState("Roaster’s Choice Collection (Trio)");
  const [frequency, setFrequency] = useState("2주마다 정기배송");
  const [grindType, setGrindType] = useState("홀빈 (Whole Bean)");
  const [address, setAddress] = useState(user?.subscription?.deliveryAddress || "충청북도 충주시 충주호로 128");

  if (!isSubscriptionModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      closeSubscriptionModal();
      openAuthModal('login');
      return;
    }

    const nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 3);
    const dateStr = nextDate.toISOString().slice(0, 10).replace(/-/g, '.');

    updateSubscription({
      active: true,
      planName: `${selectedBean} 태양열 구독`,
      beans: `${selectedBean} (${grindType})`,
      frequency: frequency,
      nextDeliveryDate: dateStr,
      discount: user.membershipTier === 'Solar Club VIP' ? '15% VIP 할인 적용' : '10% 회원 할인 적용',
      deliveryAddress: address
    });

    closeSubscriptionModal();
    showToast('태양열 원두 정기구독이 성공적으로 등록되었습니다!', 'success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-lg bg-[#141414] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 text-[#f0f0f0]"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={closeSubscriptionModal}
          className="absolute top-5 right-5 text-[#888] hover:text-white transition-colors cursor-pointer p-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-1.5 font-mono text-xs font-bold text-[#f91f0e] uppercase tracking-wider mb-2">
            <Sun className="w-3.5 h-3.5 text-[#f91f0e]" />
            100% SOLAR ROASTED SUBSCRIPTION
          </div>
          <h2 className="text-xl font-bold font-mono text-white uppercase tracking-tight">
            태양열 원두 정기구독 신청
          </h2>
          <p className="text-xs text-[#a0a0a0] mt-1 font-sans">
            로스팅 직후 신선한 상태로 원하는 주기에 맞춰 문 앞까지 직배송합니다.
          </p>
        </div>

        {!user ? (
          <div className="p-6 bg-[#1a1a1a] border border-[#333] text-center space-y-4">
            <Coffee className="w-8 h-8 text-[#f91f0e] mx-auto" />
            <p className="text-sm font-sans text-[#ddd]">
              정기구독 서비스는 <strong className="text-white">회원 전용 상시 할인(최대 15%)</strong> 및 무료배송 혜택이 적용됩니다.
              계속하시려면 먼저 로그인해 주세요.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  closeSubscriptionModal();
                  openAuthModal('login');
                }}
                className="w-full py-3 bg-[#f91f0e] text-white font-mono font-bold text-xs uppercase tracking-wider hover:bg-[#d8190b] transition-all cursor-pointer"
              >
                로그인하고 혜택받기 →
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 font-mono text-xs">
            {/* Bean Choice */}
            <div>
              <label className="block text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                원두 선택 (Bean Choice)
              </label>
              <select
                value={selectedBean}
                onChange={(e) => setSelectedBean(e.target.value)}
                className="w-full px-3 py-2.5 bg-[#0e0e0e] border border-[#2a2a2a] text-[#f0f0f0] focus:outline-none focus:border-[#f91f0e]"
              >
                <option value="Roaster’s Choice Collection (Trio)">
                  Roaster’s Choice Collection (Trio 3종 세트)
                </option>
                <option value="Roaster’s Ethiopia Guji (340g)">
                  Roaster’s Ethiopia Guji (싱글오리진 340g)
                </option>
                <option value="Colombia Huila Single Origin (340g)">
                  Colombia Huila Single Origin (340g)
                </option>
              </select>
            </div>

            {/* Grind Size */}
            <div>
              <label className="block text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                분쇄도 (Grind Option)
              </label>
              <div className="grid grid-cols-3 gap-2 text-center">
                {['홀빈 (Whole Bean)', '핸드드립용', '에스프레소용'].map((type) => (
                  <button
                    type="button"
                    key={type}
                    onClick={() => setGrindType(type)}
                    className={`py-2 px-1 border cursor-pointer transition-all ${
                      grindType === type
                        ? 'border-[#f91f0e] bg-[#f91f0e]/15 text-[#f91f0e] font-bold'
                        : 'border-[#2a2a2a] bg-[#0e0e0e] text-[#888] hover:text-white'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Frequency */}
            <div>
              <label className="block text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                배송 주기 (Frequency)
              </label>
              <div className="grid grid-cols-3 gap-2 text-center">
                {['1주마다 배송', '2주마다 정기배송', '4주마다 배송'].map((freq) => (
                  <button
                    type="button"
                    key={freq}
                    onClick={() => setFrequency(freq)}
                    className={`py-2 px-1 border cursor-pointer transition-all ${
                      frequency === freq
                        ? 'border-[#86c6fe] bg-[#86c6fe]/15 text-[#86c6fe] font-bold'
                        : 'border-[#2a2a2a] bg-[#0e0e0e] text-[#888] hover:text-white'
                    }`}
                  >
                    {freq}
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery address */}
            <div>
              <label className="block text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                배송받으실 주소 (Address)
              </label>
              <input
                type="text"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="상세 배송 주소"
                className="w-full px-3 py-2.5 bg-[#0e0e0e] border border-[#2a2a2a] text-[#f0f0f0] focus:outline-none focus:border-[#f91f0e]"
              />
            </div>

            {/* Member benefit callout */}
            <div className="p-3 bg-[#191919] border border-[#2a2a2a] text-[11px] text-[#86c6fe] flex items-center justify-between">
              <span>멤버십 할인 혜택</span>
              <span className="font-bold text-[#f91f0e]">
                {user.membershipTier === 'Solar Club VIP' ? '15% VIP 특별할인 + 무료배송' : '10% 회원할인 + 무료배송'}
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-[#f91f0e] hover:bg-[#d8190b] text-white font-bold text-xs uppercase tracking-widest border border-[#f91f0e] transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              <span>구독 신청 완료하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
