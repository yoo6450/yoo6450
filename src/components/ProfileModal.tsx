import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, User as UserIcon, Coffee, Package, Sparkles, Calendar, MapPin, CheckCircle, Edit3, Pause, Play, LogOut } from 'lucide-react';

export const ProfileModal: React.FC = () => {
  const {
    user,
    isProfileModalOpen,
    closeProfileModal,
    logout,
    openSubscriptionModal,
    updateProfile,
    cancelSubscription,
    showToast
  } = useAuth();

  const [isEditingPreference, setIsEditingPreference] = useState(false);
  const [prefInput, setPrefInput] = useState(user?.coffeePreference || '');
  const [activeTab, setActiveTab] = useState<'profile' | 'subscription' | 'orders'>('profile');

  if (!isProfileModalOpen || !user) return null;

  const handleSavePref = () => {
    updateProfile({ coffeePreference: prefInput });
    setIsEditingPreference(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#141414] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 text-[#f0f0f0] max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeProfileModal}
          className="absolute top-5 right-5 text-[#888] hover:text-white transition-colors cursor-pointer p-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Member Header Card */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#262626]">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-full bg-[#f91f0e]/20 border-2 border-[#f91f0e] flex items-center justify-center text-[#f91f0e] font-bold text-lg font-mono">
              {user.name.charAt(0)}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold font-mono text-white">{user.name}</h2>
                <span className="text-[10px] font-mono px-2 py-0.5 bg-[#f91f0e]/15 border border-[#f91f0e] text-[#f91f0e] font-bold">
                  {user.membershipTier}
                </span>
              </div>
              <p className="text-xs font-mono text-[#888] mt-0.5">{user.email} • 가입일 {user.joinDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="bg-[#1b1b1b] border border-[#333] px-3.5 py-1.5 text-right font-mono">
              <span className="text-[10px] text-[#888] block">보유 마일리지</span>
              <span className="text-sm font-bold text-[#86c6fe] flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-[#86c6fe]" />
                {user.points.toLocaleString()} P
              </span>
            </div>
            <button
              onClick={logout}
              className="px-3 py-2 bg-[#202020] hover:bg-red-950/40 border border-[#333] hover:border-red-600 text-xs font-mono text-[#aaa] hover:text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="로그아웃"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>로그아웃</span>
            </button>
          </div>
        </div>

        {/* Tab selection */}
        <div className="flex border-b border-[#262626] my-6 font-mono text-xs">
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'profile'
                ? 'border-[#f91f0e] text-[#f91f0e]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>내 계정 정보</span>
          </button>
          <button
            onClick={() => setActiveTab('subscription')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'subscription'
                ? 'border-[#f91f0e] text-[#f91f0e]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>정기구독 관리</span>
            {user.subscription?.active && (
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            )}
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 flex items-center justify-center gap-2 ${
              activeTab === 'orders'
                ? 'border-[#f91f0e] text-[#f91f0e]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>주문/배송 내역 ({user.orders.length})</span>
          </button>
        </div>

        {/* Tab Content: Profile */}
        {activeTab === 'profile' && (
          <div className="space-y-6">
            {/* Coffee taste preference */}
            <div className="p-4 bg-[#181818] border border-[#262626]">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 font-mono text-xs text-[#86c6fe] uppercase">
                  <Coffee className="w-4 h-4 text-[#86c6fe]" />
                  <span>내 커피 취향 & 테이스팅 노트</span>
                </div>
                {!isEditingPreference ? (
                  <button
                    onClick={() => {
                      setPrefInput(user.coffeePreference);
                      setIsEditingPreference(true);
                    }}
                    className="text-xs text-[#888] hover:text-white flex items-center gap-1 font-mono cursor-pointer"
                  >
                    <Edit3 className="w-3 h-3" /> 변경
                  </button>
                ) : (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleSavePref}
                      className="text-xs text-[#86c6fe] hover:underline font-mono cursor-pointer"
                    >
                      저장
                    </button>
                    <button
                      onClick={() => setIsEditingPreference(false)}
                      className="text-xs text-[#888] hover:underline font-mono cursor-pointer"
                    >
                      취소
                    </button>
                  </div>
                )}
              </div>

              {!isEditingPreference ? (
                <p className="text-sm font-sans text-[#f0f0f0]">
                  {user.coffeePreference || '등록된 커피 취향이 없습니다.'}
                </p>
              ) : (
                <div className="mt-2">
                  <input
                    type="text"
                    value={prefInput}
                    onChange={(e) => setPrefInput(e.target.value)}
                    placeholder="예: 싱글 오리진 약배전, 플로럴 아로마"
                    className="w-full px-3 py-2 bg-[#0e0e0e] border border-[#444] text-xs font-mono text-white focus:outline-none focus:border-[#86c6fe]"
                  />
                </div>
              )}
              <p className="text-[11px] font-mono text-[#777] mt-2">
                * 취향 프로필에 맞춰 로스터가 추천 원두 샘플 드립백을 함께 발송합니다.
              </p>
            </div>

            {/* Membership Benefits List */}
            <div className="p-4 bg-[#181818] border border-[#262626]">
              <h4 className="font-mono text-xs text-[#f91f0e] uppercase tracking-wider mb-3">
                현재 등급 혜택 ({user.membershipTier})
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs text-[#bbb]">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f91f0e]" />
                  <span>원두 정기구독 15% 상시 할인</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f91f0e]" />
                  <span>전 상품 무료 배송 (충주호 로스터리 직배송)</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f91f0e]" />
                  <span>시즌 한정 싱글오리진 우선 구매권</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-[#f91f0e]" />
                  <span>바리스타 테이스팅 세미나 초대권</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab Content: Subscription */}
        {activeTab === 'subscription' && (
          <div className="space-y-4">
            {user.subscription && user.subscription.active ? (
              <div className="p-5 bg-[#181818] border border-emerald-900/50 relative">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
                    <span className="font-mono text-xs text-emerald-400 font-bold uppercase tracking-wider">
                      정기구독 이용 중 (Active)
                    </span>
                  </div>
                  <span className="text-xs font-mono text-[#f91f0e] font-semibold bg-[#f91f0e]/10 px-2 py-0.5 border border-[#f91f0e]/30">
                    {user.subscription.discount}
                  </span>
                </div>

                <h3 className="text-lg font-bold font-mono text-white mb-2">
                  {user.subscription.planName}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono text-[#aaa] border-t border-b border-[#262626] py-3.5 my-3">
                  <div>
                    <span className="text-[#666] block">선택 원두:</span>
                    <span className="text-white font-medium">{user.subscription.beans}</span>
                  </div>
                  <div>
                    <span className="text-[#666] block">배송 주기:</span>
                    <span className="text-white font-medium">{user.subscription.frequency}</span>
                  </div>
                  <div>
                    <span className="text-[#666] block">다음 발송 예정일:</span>
                    <span className="text-[#86c6fe] font-medium flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {user.subscription.nextDeliveryDate} (태양열 로스팅 후 당일 발송)
                    </span>
                  </div>
                  <div>
                    <span className="text-[#666] block">배송지:</span>
                    <span className="text-white truncate block flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#888]" />
                      {user.subscription.deliveryAddress}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      closeProfileModal();
                      openSubscriptionModal();
                    }}
                    className="px-3.5 py-2 bg-[#f91f0e] text-white text-xs font-mono font-bold hover:bg-[#d8190b] transition-colors cursor-pointer"
                  >
                    구독 원두 및 주기 변경
                  </button>
                  <button
                    onClick={cancelSubscription}
                    className="px-3.5 py-2 bg-[#222] border border-[#333] hover:border-red-500 text-xs font-mono text-[#bbb] hover:text-red-400 flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Pause className="w-3.5 h-3.5" />
                    <span>구독 일시 정지</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-8 px-4 bg-[#181818] border border-dashed border-[#333]">
                <Coffee className="w-10 h-10 text-[#f91f0e] mx-auto mb-3 opacity-80" />
                <h4 className="text-base font-bold font-mono text-white mb-1">
                  이용 중인 원두 정기구독이 없습니다
                </h4>
                <p className="text-xs text-[#888] font-sans max-w-md mx-auto mb-5">
                  100% 태양열로 로스팅한 신선한 스페셜티 싱글 오리진을 회원 전용 15% 할인 혜택과 무료 배송으로 정기 수령해 보세요.
                </p>
                <button
                  onClick={() => {
                    closeProfileModal();
                    openSubscriptionModal();
                  }}
                  className="px-5 py-2.5 bg-[#f91f0e] text-white font-mono font-bold text-xs uppercase tracking-wider border border-[#f91f0e] hover:bg-transparent hover:text-[#f91f0e] transition-all cursor-pointer"
                >
                  태양열 원두 정기구독 신청하기
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab Content: Orders */}
        {activeTab === 'orders' && (
          <div className="space-y-3 font-mono">
            {user.orders.length > 0 ? (
              user.orders.map((ord) => (
                <div key={ord.id} className="p-4 bg-[#181818] border border-[#262626] text-xs">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[#888]">{ord.date} 주문 • {ord.orderNumber}</span>
                    <span
                      className={`px-2 py-0.5 text-[11px] font-bold border ${
                        ord.status === '배송중'
                          ? 'bg-amber-950/40 text-amber-400 border-amber-800'
                          : ord.status === '배송완료'
                          ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800'
                          : 'bg-blue-950/40 text-blue-400 border-blue-800'
                      }`}
                    >
                      {ord.status}
                    </span>
                  </div>
                  <div className="text-sm font-semibold text-white mb-2">{ord.items}</div>
                  <div className="flex items-center justify-between text-[#aaa] border-t border-[#262626] pt-2">
                    <span>결제수단: {ord.paymentMethod}</span>
                    <span className="text-[#86c6fe] font-bold text-sm">{ord.amount}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-xs text-[#888]">
                주문 내역이 없습니다.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
