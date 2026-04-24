import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OrderService } from '../../services/order';

@Component({
  selector: 'app-order-tracking',
  imports: [RouterLink, DatePipe],
  templateUrl: './order-tracking.html',
  styleUrl: './order-tracking.scss',
})
export class OrderTracking implements OnInit {
  private readonly route = inject(ActivatedRoute);
  readonly orderService = inject(OrderService);

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) this.orderService.selectOrder(id);
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }
}
