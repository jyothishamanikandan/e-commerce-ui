import { Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-products',
  imports: [RouterLink],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  readonly productService = inject(ProductService);
  readonly cartService = inject(CartService);

  readonly addedProductId = signal<number | null>(null);

  onCategoryChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.productService.setCategory(value);
  }

  onSortChange(event: Event): void {
    const value = (event.target as HTMLSelectElement).value;
    this.productService.setSort(value);
  }

  selectCategory(cat: string): void {
    this.productService.setCategory(cat);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.addedProductId.set(product.id);
    setTimeout(() => this.addedProductId.set(null), 1500);
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
}
