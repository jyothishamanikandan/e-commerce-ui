import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-product-detail',
  imports: [RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);

  readonly product = signal<Product | null>(null);
  readonly quantity = signal(1);
  readonly addedToCart = signal(false);
  readonly selectedImage = signal(0);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const found = this.productService.getProduct(id);
    if (!found) {
      this.router.navigate(['/products']);
      return;
    }
    this.product.set(found);
  }

  increaseQty(): void {
    const p = this.product();
    if (p && this.quantity() < p.stock) {
      this.quantity.update(q => q + 1);
    }
  }

  decreaseQty(): void {
    if (this.quantity() > 1) this.quantity.update(q => q - 1);
  }

  addToCart(): void {
    const p = this.product();
    if (!p) return;
    this.cartService.addToCart(p, this.quantity());
    this.addedToCart.set(true);
    setTimeout(() => this.addedToCart.set(false), 2000);
  }

  buyNow(): void {
    const p = this.product();
    if (!p) return;
    this.cartService.addToCart(p, this.quantity());
    this.router.navigate(['/cart']);
  }

  getStars(rating: number): string[] {
    return Array.from({ length: 5 }, (_, i) => {
      if (i + 1 <= Math.floor(rating)) return 'full';
      if (i < rating) return 'half';
      return 'empty';
    });
  }

  formatPrice(price: number): string {
    return '₹' + price.toLocaleString('en-IN');
  }

  getDiscount(price: number, original: number): number {
    return Math.round((1 - price / original) * 100);
  }

  getRelatedProducts() {
    const p = this.product();
    if (!p) return [];
    return this.productService.products()
      .filter(prod => prod.category === p.category && prod.id !== p.id)
      .slice(0, 4);
  }
}
