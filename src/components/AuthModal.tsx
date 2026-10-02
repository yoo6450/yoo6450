import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Mail, Lock, User as UserIcon, Eye, EyeOff, Sparkles, Coffee, ArrowRight, CheckCircle2 } from 'lucide-react';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    loginWithSocial,
    signup,
    resetPassword
  } = useAuth();

  // Form states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [coffeePreference, setCoffeePreference] = useState('약배전 싱글 오리진 (화사한 산미 & 플로럴)');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  if (!isAuthModalOpen) return null;

  const handleTabChange = (tab: 'login' | 'register' | 'forgot') => {
    setAuthModalTab(tab);
    setErrorMessage('');
    setResetSuccessMessage('');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('이메일 주소를 입력해 주세요.');
      return;
    }
    setErrorMessage('');
    setIsSubmitting(true);
    const res = await login(email, password);
    setIsSubmitting(false);
    if (!res.success && res.message) {
      setErrorMessage(res.message);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !name || !password) {
      setErrorMessage('모든 필수 항목을 입력해 주세요.');
      return;
    }
    if (password.length < 6) {
      setErrorMessage('비밀번호는 최소 6자 이상이어야 합니다.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('비밀번호가 일치하지 않습니다.');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    const res = await signup({
      email,
      name,
      password,
      coffeePreference
    });
    setIsSubmitting(false);
    if (!res.success && res.message) {
      setErrorMessage(res.message);
    }
  };

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setErrorMessage('가입 시 등록한 이메일을 입력해 주세요.');
      return;
    }
    setIsSubmitting(true);
    await resetPassword(email);
    setIsSubmitting(false);
    setResetSuccessMessage(`${email}으로 인증 링크와 재설정 안내를 전송했습니다.`);
  };

  const fillQuickDemo = (demoEmail: string, demoPass: string = 'password123') => {
    setEmail(demoEmail);
    setPassword(demoPass);
    login(demoEmail, demoPass);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-md bg-[#141414] border border-[#2b2b2b] shadow-2xl p-6 sm:p-8 text-[#f0f0f0]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeAuthModal}
          className="absolute top-5 right-5 text-[#888] hover:text-white transition-colors cursor-pointer p-1"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#f91f0e] uppercase tracking-wider mb-2">
            <span className="w-2 h-2 rounded-full bg-[#f91f0e] animate-pulse"></span>
            CHARLIE'S GOODTIME MEMBER PORTAL
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-mono tracking-tight uppercase">
            {authModalTab === 'login' && '스페셜티 커피 멤버십 로그인'}
            {authModalTab === 'register' && 'B-Corp 멤버십 회원가입'}
            {authModalTab === 'forgot' && '비밀번호 재설정'}
          </h2>
          <p className="text-xs text-[#a0a0a0] mt-1.5 font-sans">
            {authModalTab === 'login' && '태양열 로스팅 싱글 오리진 구독과 멤버십 혜택을 이용하세요.'}
            {authModalTab === 'register' && '가입 즉시 5,000P 웰컴 마일리지와 정기배송 15% 할인이 제공됩니다.'}
            {authModalTab === 'forgot' && '가입하신 이메일로 비밀번호 재설정 링크를 보내드립니다.'}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#262626] mb-6 font-mono text-xs">
          <button
            onClick={() => handleTabChange('login')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 ${
              authModalTab === 'login'
                ? 'border-[#f91f0e] text-[#f91f0e]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            로그인
          </button>
          <button
            onClick={() => handleTabChange('register')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 ${
              authModalTab === 'register'
                ? 'border-[#f91f0e] text-[#f91f0e]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            회원가입
          </button>
          <button
            onClick={() => handleTabChange('forgot')}
            className={`flex-1 py-2.5 text-center font-bold tracking-wider transition-colors cursor-pointer border-b-2 ${
              authModalTab === 'forgot'
                ? 'border-[#86c6fe] text-[#86c6fe]'
                : 'border-transparent text-[#777] hover:text-[#bbb]'
            }`}
          >
            PW 찾기
          </button>
        </div>

        {/* Quick Demo Access Bar */}
        <div className="mb-6 p-3 bg-[#1c1c1c] border border-[#2a2a2a] rounded-none">
          <div className="text-[11px] font-mono text-[#86c6fe] flex items-center gap-1.5 mb-2 font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            빠른 체험용 원클릭 로그인
          </div>
          <div className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => fillQuickDemo('yoo6450@gmail.com')}
              className="w-full text-left px-2.5 py-1.5 bg-[#141414] hover:bg-[#252525] border border-[#333] hover:border-[#f91f0e] text-xs font-mono text-[#f0f0f0] flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>⚡ yoo6450@gmail.com (VIP 정기구독 회원)</span>
              <span className="text-[10px] text-[#f91f0e]">바로 로그인 →</span>
            </button>
            <button
              type="button"
              onClick={() => fillQuickDemo('coffee.lover@example.com')}
              className="w-full text-left px-2.5 py-1.5 bg-[#141414] hover:bg-[#252525] border border-[#333] hover:border-[#86c6fe] text-xs font-mono text-[#a0a0a0] hover:text-white flex items-center justify-between transition-colors cursor-pointer"
            >
              <span>☕ coffee.lover@example.com (일반 회원)</span>
              <span className="text-[10px] text-[#86c6fe]">선택 →</span>
            </button>
          </div>
        </div>

        {/* Error / Success message */}
        {errorMessage && (
          <div className="mb-4 p-3 bg-red-950/40 border border-red-800 text-red-200 text-xs font-mono flex items-center gap-2">
            <span>⚠</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {resetSuccessMessage && (
          <div className="mb-4 p-3 bg-emerald-950/40 border border-emerald-800 text-emerald-200 text-xs font-mono flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{resetSuccessMessage}</span>
          </div>
        )}

        {/* Tab 1: LOGIN */}
        {authModalTab === 'login' && (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                이메일 계정 (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="예: yoo6450@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-mono text-[#a0a0a0] uppercase tracking-wider">
                  비밀번호 (Password)
                </label>
                <button
                  type="button"
                  onClick={() => handleTabChange('forgot')}
                  className="text-[11px] font-mono text-[#86c6fe] hover:underline cursor-pointer"
                >
                  비밀번호를 잊으셨나요?
                </button>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="비밀번호 입력"
                  className="w-full pl-9 pr-10 py-2.5 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777] hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs font-mono text-[#a0a0a0]">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="accent-[#f91f0e] cursor-pointer"
                />
                <span>로그인 상태 유지</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#f91f0e] hover:bg-[#d8190b] text-white font-mono font-bold text-xs uppercase tracking-widest border border-[#f91f0e] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>로그인 처리 중...</span>
              ) : (
                <>
                  <span>로그인하기 (Sign In)</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 2: REGISTER */}
        {authModalTab === 'register' && (
          <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
            <div>
              <label className="block text-xs font-mono text-[#a0a0a0] mb-1 uppercase tracking-wider">
                이름 / 닉네임 (Name)
              </label>
              <div className="relative">
                <UserIcon className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="예: 홍길동"
                  className="w-full pl-9 pr-3 py-2 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#a0a0a0] mb-1 uppercase tracking-wider">
                이메일 계정 (Email)
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="예: coffee@example.com"
                  className="w-full pl-9 pr-3 py-2 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-mono text-[#a0a0a0] mb-1 uppercase tracking-wider">
                  비밀번호
                </label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="6자 이상"
                  className="w-full px-3 py-2 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono text-[#a0a0a0] mb-1 uppercase tracking-wider">
                  비밀번호 확인
                </label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="동일 비밀번호"
                  className="w-full px-3 py-2 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#f91f0e] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono text-[#a0a0a0] mb-1 uppercase tracking-wider flex items-center gap-1.5">
                <Coffee className="w-3.5 h-3.5 text-[#86c6fe]" />
                <span>선호하는 커피 프로필 (선택)</span>
              </label>
              <select
                value={coffeePreference}
                onChange={(e) => setCoffeePreference(e.target.value)}
                className="w-full px-3 py-2 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#86c6fe] focus:outline-none text-xs font-mono text-[#f0f0f0] cursor-pointer"
              >
                <option value="약배전 싱글 오리진 (화사한 산미 & 플로럴)">
                  약배전 싱글 오리진 (화사한 산미 & 플로럴)
                </option>
                <option value="중배전 밸런스드 (과일 단맛 & 균형미)">
                  중배전 밸런스드 (과일 단맛 & 균형미)
                </option>
                <option value="중강배전 다크 로스트 (다크 초콜릿 & 고소함)">
                  중강배전 다크 로스트 (다크 초콜릿 & 고소함)
                </option>
                <option value="디카페인 마운틴워터 (부담 없는 편안함)">
                  디카페인 마운틴워터 (부담 없는 편안함)
                </option>
              </select>
            </div>

            <div className="text-[11px] text-[#777] font-mono leading-tight">
              가입 시 Charlie's GoodTime의 이용약관 및 개인정보 처리방침에 동의하게 되며, 첫 주문 시 5,000P 웰컴 마일리지가 즉시 적립됩니다.
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#f91f0e] hover:bg-[#d8190b] text-white font-mono font-bold text-xs uppercase tracking-widest border border-[#f91f0e] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-2"
            >
              {isSubmitting ? (
                <span>가입 처리 중...</span>
              ) : (
                <>
                  <span>가입하고 5,000P 받기</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* Tab 3: FORGOT PASSWORD */}
        {authModalTab === 'forgot' && (
          <form onSubmit={handleResetSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-mono text-[#a0a0a0] mb-1.5 uppercase tracking-wider">
                가입 이메일 주소
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#777] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="예: yoo6450@gmail.com"
                  className="w-full pl-9 pr-3 py-2.5 bg-[#0e0e0e] border border-[#2a2a2a] focus:border-[#86c6fe] focus:outline-none text-sm font-mono text-white placeholder-[#555]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3 bg-[#86c6fe] hover:bg-[#68b5fa] text-[#0e0e0e] font-mono font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>발송 중...</span>
              ) : (
                <>
                  <span>재설정 메일 발송하기</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="text-center pt-2">
              <button
                type="button"
                onClick={() => handleTabChange('login')}
                className="text-xs font-mono text-[#a0a0a0] hover:text-white underline cursor-pointer"
              >
                ← 로그인 화면으로 돌아가기
              </button>
            </div>
          </form>
        )}

        {/* Social Logins Divider */}
        {authModalTab !== 'forgot' && (
          <div className="mt-6 pt-5 border-t border-[#262626]">
            <div className="text-center text-[11px] font-mono text-[#777] uppercase tracking-wider mb-3">
              또는 간편 SNS 계정으로 시작
            </div>
            <div className="grid grid-cols-2 gap-2.5">
              {/* Google */}
              <button
                type="button"
                onClick={() => loginWithSocial('google')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#181818] border border-[#303030] hover:border-[#86c6fe] text-xs font-mono text-[#e0e0e0] hover:text-white transition-all cursor-pointer"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              {/* Kakao */}
              <button
                type="button"
                onClick={() => loginWithSocial('kakao')}
                className="flex items-center justify-center gap-2 py-2.5 px-3 bg-[#FEE500] hover:bg-[#fad800] text-[#191919] font-mono text-xs font-semibold transition-all cursor-pointer border border-[#FEE500]"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#3C1E1E">
                  <path d="M12 3c-5.52 0-10 3.58-10 8 0 2.85 1.87 5.36 4.69 6.74-.21.78-.77 2.83-.89 3.27-.14.54.2.53.42.38.17-.11 2.76-1.87 3.88-2.63.62.09 1.25.14 1.9.14 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
                </svg>
                <span>카카오 로그인</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
