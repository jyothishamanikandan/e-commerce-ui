import { Injectable, signal, computed } from '@angular/core';
import { CartItem } from '../models/cart.model';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class CartService {
  readonly items = signal<CartItem[]>([]);
  readonly isOpen = signal<boolean>(false);

  readonly itemCount = computed(() =>
    this.items().reduce((sum, item) => sum + item.quantity, 0)
  );

  readonly subtotal = computed(() =>
    this.items().reduce((sum, item) => sum + item.product.price * item.quantity, 0)
  );

  readonly tax = computed(() => Math.round(this.subtotal() * 0.18));

  readonly shipping = computed(() => this.subtotal() > 5000 ? 0 : 199);

  readonly total = computed(() => this.subtotal() + this.tax() + this.shipping());

  addToCart(product: Product, quantity = 1): void {
    const existing = this.items().find(i => i.product.id === product.id);
    if (existing) {
      this.items.update(items =>
        items.map(i => i.product.id === product.id
          ? { ...i, quantity: Math.min(i.quantity + quantity, product.stock) }
          : i
        )
      );
    } else {
      this.items.update(items => [...items, { product, quantity }]);
    }
  }

  removeItem(productId: number): void {
    this.items.update(items => items.filter(i => i.product.id !== productId));
  }

  updateQuantity(productId: number, quantity: number): void {
    if (quantity <= 0) {
      this.removeItem(productId);
      return;
    }
    this.items.update(items =>
      items.map(i => i.product.id === productId ? { ...i, quantity } : i)
    );
  }

  clearCart(): void {
    this.items.set([]);
  }

  toggleCart(): void {
    this.isOpen.update(v => !v);
  }

  openCart(): void {
    this.isOpen.set(true);
  }

  closeCart(): void {
    this.isOpen.set(false);
  }
}
