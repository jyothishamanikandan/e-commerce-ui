import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../services/cart';
import { OrderService } from '../../services/order';
import { ShippingAddress } from '../../models/order.model';

@Component({
  selector: 'app-checkout',
  imports: [RouterLink, FormsModule],
  templateUrl: './checkout.html',
  styleUrl: './checkout.scss',
})
export class Checkout {
  private readonly router = inject(Router);
  readonly cartService = inject(CartService);
  readonly orderService = inject(OrderService);

  readonly step = signal<1 | 2 | 3>(1);
  readonly isProcessing = signal(false);
  readonly selectedPayment = signal('card');

  address: ShippingAddress = {
    fullName: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    pincode: ''
  };

  readonly states = ['Andhra Pradesh','Assam','Bihar','Delhi','Goa','Gujarat','Haryana',
    'Karnataka','Kerala','Madhya Pradesh','Maharashtra','Punjab','Rajasthan',
    'Tamil Nadu','Telangana','Uttar Pradesh','West Bengal'];

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  goToStep(s: 1 | 2 | 3): void {
    if (s < this.step()) this.step.set(s);
  }

  nextStep(): void {
    const cur = this.step();
    if (cur === 1 && this.isAddressValid()) this.step.set(2);
    else if (cur === 2) this.step.set(3);
  }

  isAddressValid(): boolean {
    return !!(this.address.fullName && this.address.phone && this.address.addressLine1
      && this.address.city && this.address.state && this.address.pincode);
  }

  placeOrder(): void {
    if (!this.isAddressValid()) return;
    this.isProcessing.set(true);
    setTimeout(() => {
      const order = this.orderService.placeOrder(
        this.cartService.items(),
        this.address,
        this.cartService.subtotal(),
        this.cartService.tax(),
        this.cartService.shipping(),
        this.cartService.total(),
        this.selectedPayment() === 'card' ? 'Credit Card ending 4242'
          : this.selectedPayment() === 'upi' ? 'UPI Payment'
          : 'Cash on Delivery'
      );
      this.cartService.clearCart();
      this.isProcessing.set(false);
      this.router.navigate(['/orders', order.id]);
    }, 1800);
  }
}
