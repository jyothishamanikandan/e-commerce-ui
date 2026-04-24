import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {
  readonly cart = inject(CartService);
  readonly productService = inject(ProductService);

  readonly mobileMenuOpen = signal(false);
  readonly searchValue = signal('');

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchValue.set(value);
    this.productService.setSearch(value);
  }

  clearSearch(): void {
    this.searchValue.set('');
    this.productService.setSearch('');
  }
}
