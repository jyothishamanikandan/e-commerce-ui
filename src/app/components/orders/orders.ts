import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-orders',
  imports: [RouterLink, DatePipe],
  templateUrl: './orders.html',
  styleUrl: './orders.scss',
})
export class Orders {
  readonly orderService = inject(OrderService);

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  getFirstImage(order: any): string {
    return order.items[0]?.product?.images[0] ?? '';
  }

  getItemNames(order: any): string {
    return order.items.map((i: any) => i.product.name).join(', ');
  }
}
