import { CartItem } from './cart.model';

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled';

export interface TrackingEvent {
  status: OrderStatus;
  label: string;
  description: string;
  timestamp: Date | null;
  completed: boolean;
  icon: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  pincode: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  status: OrderStatus;
  shippingAddress: ShippingAddress;
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  placedAt: Date;
  estimatedDelivery: Date;
  trackingEvents: TrackingEvent[];
  paymentMethod: string;
}
