import React from 'react';
import { useAuth } from '../context/AuthContext';

export const Footer: React.FC = () => {
  const { user, openAuthModal, openProfileModal } = useAuth();

  return (
    <footer className="px-[4vw] py-16 bg-[#080808] border-t border-[#262626] font-mono text-xs text-[#a0a0a0]">
      <div className="flex flex-col md:flex-row justify-between gap-10 mb-10">
        <div>
          <div className="text-xl font-bold text-white mb-2 font-mono">
            Charlie's <span className="text-[#f91f0e]">GoodTime</span>
          </div>
          <p className="text-white mb-2 font-sans">Never settle for good enough.</p>
          <p className="text-[#777]">B-Corp 인증 스페셜티 커피 브랜드 | 태양열 로스팅 싱글 오리진 원두</p>
        </div>

        <div>
          <p className="text-white font-bold mb-2">LOCATION &amp; CONTACT</p>
          <p>주소: 충주호</p>
          <p>전화: 123 4567 8900</p>
          <p className="mt-2.5">
            공식 웹사이트:{' '}
            <a
              href="https://beanroasters.example.com/"
              target="_blank"
              rel="noreferrer"
              className="text-[#86c6fe] hover:text-[#f91f0e] transition-colors"
            >
              https://beanroasters.example.com
            </a>
          </p>
        </div>

        <div>
          <p className="text-white font-bold mb-2">MEMBER SERVICES</p>
          <div className="flex flex-col gap-1.5">
            {!user ? (
              <>
                <button
                  onClick={() => openAuthModal('login')}
                  className="text-left text-[#86c6fe] hover:underline cursor-pointer"
                >
                  로그인 / 멤버십 가입
                </button>
                <button
                  onClick={() => openAuthModal('forgot')}
                  className="text-left text-[#888] hover:text-white cursor-pointer"
                >
                  비밀번호 찾기
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={openProfileModal}
                  className="text-left text-[#86c6fe] hover:underline cursor-pointer"
                >
                  마이페이지 (프로필 &amp; 정기구독)
                </button>
                <span className="text-[#888]">로그인 계정: {user.email}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <div className="pt-8 border-t border-[#262626] flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px]">
        <div className="text-[#666]">
          © Charlie's GoodTime. All rights reserved.
        </div>
        <div className="text-[#86c6fe] tracking-wider text-center sm:text-right">
          PRICING TRANSPARENCY • B-CORP CERTIFIED • 100% SOLAR POWERED
        </div>
      </div>
    </footer>
  );
};
