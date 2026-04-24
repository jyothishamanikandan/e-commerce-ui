import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  {
    path: 'products',
    loadComponent: () => import('./components/products/products').then(m => m.Products)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./components/product-detail/product-detail').then(m => m.ProductDetail)
  },
  {
    path: 'cart',
    loadComponent: () => import('./components/cart/cart').then(m => m.Cart)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./components/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'orders',
    loadComponent: () => import('./components/orders/orders').then(m => m.Orders)
  },
  {
    path: 'orders/:id',
    loadComponent: () => import('./components/order-tracking/order-tracking').then(m => m.OrderTracking)
  },
  { path: '**', redirectTo: '/products' }
];
