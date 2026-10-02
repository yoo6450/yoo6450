export interface SubscriptionInfo {
  active: boolean;
  planName: string;
  nextDeliveryDate: string;
  frequency: string;
  beans: string;
  discount: string;
  deliveryAddress: string;
}

export interface OrderItem {
  id: string;
  orderNumber: string;
  date: string;
  items: string;
  amount: string;
  status: '배송중' | '배송완료' | '주문접수';
  paymentMethod: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  membershipTier: 'B-Corp Supporter' | 'Solar Club VIP' | 'Standard Explorer';
  points: number;
  joinDate: string;
  coffeePreference: string;
  avatarUrl?: string;
  subscription?: SubscriptionInfo;
  orders: OrderItem[];
}

export type AuthTab = 'login' | 'register' | 'forgot';
