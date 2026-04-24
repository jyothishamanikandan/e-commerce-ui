import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
export class Cart {
  readonly cartService = inject(CartService);

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  updateQty(productId: number, event: Event): void {
    const val = Number((event.target as HTMLInputElement).value);
    this.cartService.updateQuantity(productId, val);
  }
}
