import { Injectable, signal, computed } from '@angular/core';
import { Product } from '../models/product.model';
import { MOCK_PRODUCTS, MOCK_CATEGORIES } from '../models/mock-data';

@Injectable({ providedIn: 'root' })
export class ProductService {
  readonly products = signal<Product[]>(MOCK_PRODUCTS);
  readonly categories = signal(MOCK_CATEGORIES);
  readonly selectedCategory = signal<string>('all');
  readonly searchQuery = signal<string>('');
  readonly sortBy = signal<string>('featured');
  readonly loading = signal<boolean>(false);

  readonly filteredProducts = computed(() => {
    let result = this.products();
    const cat = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const sort = this.sortBy();

    if (cat !== 'all') {
      result = result.filter(p => p.category === cat);
    }
    if (query) {
      result = result.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query))
      );
    }
    switch (sort) {
      case 'price-asc': return [...result].sort((a, b) => a.price - b.price);
      case 'price-desc': return [...result].sort((a, b) => b.price - a.price);
      case 'rating': return [...result].sort((a, b) => b.rating - a.rating);
      case 'newest': return [...result].sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default: return [...result].sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }
  });

  readonly featuredProducts = computed(() => this.products().filter(p => p.isFeatured));

  getProduct(id: number): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  setCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  setSearch(query: string): void {
    this.searchQuery.set(query);
  }

  setSort(sort: string): void {
    this.sortBy.set(sort);
  }
}
