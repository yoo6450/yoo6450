import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthTab, SubscriptionInfo } from '../types/auth';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthModalOpen: boolean;
  authModalTab: AuthTab;
  isProfileModalOpen: boolean;
  isSubscriptionModalOpen: boolean;
  toasts: Toast[];
  openAuthModal: (tab?: AuthTab) => void;
  closeAuthModal: () => void;
  setAuthModalTab: (tab: AuthTab) => void;
  openProfileModal: () => void;
  closeProfileModal: () => void;
  openSubscriptionModal: () => void;
  closeSubscriptionModal: () => void;
  login: (email: string, password?: string) => Promise<{ success: boolean; message?: string }>;
  loginWithSocial: (provider: 'google' | 'kakao') => Promise<void>;
  signup: (data: { email: string; name: string; password: string; coffeePreference: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  updateProfile: (data: Partial<User>) => void;
  updateSubscription: (subscription: SubscriptionInfo) => void;
  cancelSubscription: () => void;
  resetPassword: (email: string) => Promise<{ success: boolean; message?: string }>;
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
}

const STORAGE_KEY_USER = 'charlies_goodtime_current_user';
const STORAGE_KEY_USERS_DB = 'charlies_goodtime_users_db';

const INITIAL_DEMO_USERS: Record<string, User & { password?: string }> = {
  'yoo6450@gmail.com': {
    id: 'usr_demo_1',
    email: 'yoo6450@gmail.com',
    name: '유진우 (VIP)',
    membershipTier: 'Solar Club VIP',
    points: 12500,
    joinDate: '2025.11.12',
    coffeePreference: '싱글 오리진 에티오피아 & 약배전 플로럴 노트',
    subscription: {
      active: true,
      planName: "Roaster's Choice 태양열 정기구독",
      nextDeliveryDate: '2026.10.15',
      frequency: '2주마다 2봉 (340g x 2)',
      beans: "에티오피아 구지 + 콜롬비아 우일라",
      discount: '15% VIP 할인 적용',
      deliveryAddress: '충청북도 충주시 충주호로 128 (정기배송지)'
    },
    orders: [
      {
        id: 'ord_1042',
        orderNumber: 'CGT-20261001-889',
        date: '2026.10.01',
        items: "Roaster’s Choice Collection (Trio) x 1",
        amount: '48,000원',
        status: '배송중',
        paymentMethod: '신용카드 (현대 7821)'
      },
      {
        id: 'ord_1033',
        orderNumber: 'CGT-20260915-412',
        date: '2026.09.15',
        items: "Roaster’s Ethiopia Guji (340g) x 2",
        amount: '38,000원',
        status: '배송완료',
        paymentMethod: '카카오페이'
      }
    ]
  },
  'coffee.lover@example.com': {
    id: 'usr_demo_2',
    email: 'coffee.lover@example.com',
    name: '김라떼',
    membershipTier: 'B-Corp Supporter',
    points: 4200,
    joinDate: '2026.04.18',
    coffeePreference: '묵직한 바디감과 고소한 다크 초콜릿 풍미',
    orders: [
      {
        id: 'ord_1012',
        orderNumber: 'CGT-20260820-221',
        date: '2026.08.20',
        items: "Roaster’s Ethiopia Guji (340g) x 1",
        amount: '22,000원',
        status: '배송완료',
        paymentMethod: '신용카드'
      }
    ]
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authModalTab, setAuthModalTab] = useState<AuthTab>('login');
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isSubscriptionModalOpen, setIsSubscriptionModalOpen] = useState<boolean>(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Load user from storage or seed demo user DB
  useEffect(() => {
    try {
      const storedUsersDb = localStorage.getItem(STORAGE_KEY_USERS_DB);
      if (!storedUsersDb) {
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(INITIAL_DEMO_USERS));
      }

      const savedUserJson = localStorage.getItem(STORAGE_KEY_USER);
      if (savedUserJson) {
        setUser(JSON.parse(savedUserJson));
      }
    } catch (e) {
      console.error('Failed to load user auth data', e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const openAuthModal = (tab: AuthTab = 'login') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const openSubscriptionModal = () => {
    setIsSubscriptionModalOpen(true);
  };

  const closeSubscriptionModal = () => {
    setIsSubscriptionModalOpen(false);
  };

  const login = async (email: string, password?: string): Promise<{ success: boolean; message?: string }> => {
    await new Promise((resolve) => setTimeout(resolve, 600));

    try {
      const dbStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const db = dbStr ? JSON.parse(dbStr) : INITIAL_DEMO_USERS;

      const trimmedEmail = email.trim().toLowerCase();
      let matchedUser = db[trimmedEmail];

      if (!matchedUser) {
        // If not in db, create an enthusiastic new member user
        matchedUser = {
          id: `usr_${Date.now()}`,
          email: trimmedEmail,
          name: trimmedEmail.split('@')[0] || '커피 애호가',
          membershipTier: 'B-Corp Supporter',
          points: 3000,
          joinDate: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
          coffeePreference: '싱글 오리진 핸드드립',
          orders: []
        };
        db[trimmedEmail] = matchedUser;
        localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
      }

      setUser(matchedUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(matchedUser));
      setIsAuthModalOpen(false);
      showToast(`${matchedUser.name}님, Charlie's GoodTime에 오신 것을 환영합니다!`, 'success');
      return { success: true };
    } catch (e) {
      showToast('로그인 처리 중 오류가 발생했습니다.', 'error');
      return { success: false, message: '로그인에 실패했습니다.' };
    }
  };

  const loginWithSocial = async (provider: 'google' | 'kakao') => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const isGoogle = provider === 'google';
    const socialUser: User = {
      id: `usr_${provider}_${Date.now()}`,
      email: isGoogle ? 'yoo6450@gmail.com' : 'kakao_user@charlies.coffee',
      name: isGoogle ? '유진우 (Google 계정)' : '찰리 카카오 회원',
      membershipTier: 'Solar Club VIP',
      points: 5000,
      joinDate: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      coffeePreference: '태양열 에티오피아 구지 싱글 오리진',
      orders: [
        {
          id: 'ord_demo_recent',
          orderNumber: `CGT-${Date.now().toString().slice(-6)}`,
          date: '2026.09.28',
          items: "Roaster’s Choice Collection (Trio)",
          amount: '48,000원',
          status: '배송완료',
          paymentMethod: isGoogle ? 'Google Pay' : '카카오페이'
        }
      ]
    };

    setUser(socialUser);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(socialUser));
    setIsAuthModalOpen(false);
    showToast(`${isGoogle ? '구글' : '카카오'} 계정으로 간편 로그인이 완료되었습니다.`, 'success');
  };

  const signup = async (data: { email: string; name: string; password: string; coffeePreference: string }) => {
    await new Promise((resolve) => setTimeout(resolve, 700));

    const trimmedEmail = data.email.trim().toLowerCase();
    const newUser: User = {
      id: `usr_${Date.now()}`,
      email: trimmedEmail,
      name: data.name.trim() || '신규 커피 회원',
      membershipTier: 'B-Corp Supporter',
      points: 5000, // 5000 welcome points
      joinDate: new Date().toISOString().slice(0, 10).replace(/-/g, '.'),
      coffeePreference: data.coffeePreference || '에티오피아 구지 싱글오리진',
      orders: []
    };

    try {
      const dbStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
      const db = dbStr ? JSON.parse(dbStr) : INITIAL_DEMO_USERS;
      db[trimmedEmail] = { ...newUser, password: data.password };
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));

      setUser(newUser);
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(newUser));
      setIsAuthModalOpen(false);
      showToast(`회원가입이 완료되었습니다! 웰컴 포인트 5,000P가 지급되었습니다.`, 'success');
      return { success: true };
    } catch (e) {
      return { success: false, message: '회원가입 처리 중 오류가 발생했습니다.' };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY_USER);
    setIsProfileModalOpen(false);
    showToast('안전하게 로그아웃되었습니다.', 'info');
  };

  const updateProfile = (data: Partial<User>) => {
    if (!user) return;
    const updated = { ...user, ...data };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));

    const dbStr = localStorage.getItem(STORAGE_KEY_USERS_DB);
    if (dbStr) {
      const db = JSON.parse(dbStr);
      db[user.email.toLowerCase()] = { ...db[user.email.toLowerCase()], ...updated };
      localStorage.setItem(STORAGE_KEY_USERS_DB, JSON.stringify(db));
    }
    showToast('회원 정보가 성공적으로 변경되었습니다.', 'success');
  };

  const updateSubscription = (subscription: SubscriptionInfo) => {
    if (!user) return;
    const updated: User = { ...user, subscription };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    showToast('원두 정기구독 정보가 갱신되었습니다.', 'success');
  };

  const cancelSubscription = () => {
    if (!user || !user.subscription) return;
    const updated: User = {
      ...user,
      subscription: { ...user.subscription, active: false }
    };
    setUser(updated);
    localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(updated));
    showToast('정기구독이 일시 정지되었습니다.', 'info');
  };

  const resetPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 800));
    showToast(`${email} 주소로 임시 비밀번호 재설정 링크를 발송했습니다.`, 'info');
    return { success: true };
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthModalOpen,
        authModalTab,
        isProfileModalOpen,
        isSubscriptionModalOpen,
        toasts,
        openAuthModal,
        closeAuthModal,
        setAuthModalTab,
        openProfileModal,
        closeProfileModal,
        openSubscriptionModal,
        closeSubscriptionModal,
        login,
        loginWithSocial,
        signup,
        logout,
        updateProfile,
        updateSubscription,
        cancelSubscription,
        resetPassword,
        showToast
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
