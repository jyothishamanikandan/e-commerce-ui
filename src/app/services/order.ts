import { Injectable, signal, computed } from '@angular/core';
import { Order, ShippingAddress, TrackingEvent, OrderStatus } from '../models/order.model';
import { CartItem } from '../models/cart.model';
import { MOCK_ORDERS } from '../models/mock-data';

@Injectable({ providedIn: 'root' })
export class OrderService {
  readonly orders = signal<Order[]>(MOCK_ORDERS);
  readonly selectedOrderId = signal<string | null>(null);

  readonly selectedOrder = computed(() => {
    const id = this.selectedOrderId();
    return id ? this.orders().find(o => o.id === id) ?? null : null;
  });

  placeOrder(
    items: CartItem[],
    address: ShippingAddress,
    subtotal: number,
    tax: number,
    shipping: number,
    total: number,
    paymentMethod: string
  ): Order {
    const orderId = `ORD-2026-${String(Math.floor(10000 + Math.random() * 90000))}`;
    const now = new Date();
    const delivery = new Date(now);
    delivery.setDate(delivery.getDate() + 5);

    const trackingEvents: TrackingEvent[] = [
      { status: 'pending', label: 'Order Placed', description: 'Your order has been received.', timestamp: now, completed: true, icon: '📋' },
      { status: 'confirmed', label: 'Order Confirmed', description: 'Payment verified and order confirmed.', timestamp: new Date(now.getTime() + 30 * 60000), completed: true, icon: '✅' },
      { status: 'processing', label: 'Processing', description: 'Your items are being packed.', timestamp: null, completed: false, icon: '📦' },
      { status: 'shipped', label: 'Shipped', description: 'Package handed over to courier.', timestamp: null, completed: false, icon: '🚚' },
      { status: 'out_for_delivery', label: 'Out for Delivery', description: 'Your package is out for delivery.', timestamp: null, completed: false, icon: '🛵' },
      { status: 'delivered', label: 'Delivered', description: 'Package delivered successfully.', timestamp: null, completed: false, icon: '🎉' },
    ];

    const order: Order = {
      id: orderId,
      items: [...items],
      status: 'confirmed',
      shippingAddress: address,
      subtotal,
      tax,
      shipping,
      total,
      placedAt: now,
      estimatedDelivery: delivery,
      trackingEvents,
      paymentMethod
    };

    this.orders.update(orders => [order, ...orders]);
    this.selectedOrderId.set(orderId);
    return order;
  }

  selectOrder(orderId: string): void {
    this.selectedOrderId.set(orderId);
  }

  getStatusLabel(status: OrderStatus): string {
    const labels: Record<OrderStatus, string> = {
      pending: 'Pending',
      confirmed: 'Confirmed',
      processing: 'Processing',
      shipped: 'Shipped',
      out_for_delivery: 'Out for Delivery',
      delivered: 'Delivered',
      cancelled: 'Cancelled'
    };
    return labels[status];
  }

  getStatusColor(status: OrderStatus): string {
    const colors: Record<OrderStatus, string> = {
      pending: '#b8860b',
      confirmed: '#1a7a4a',
      processing: '#1565c0',
      shipped: '#6a1b9a',
      out_for_delivery: '#e65100',
      delivered: '#2e7d32',
      cancelled: '#c62828'
    };
    return colors[status];
  }
}
