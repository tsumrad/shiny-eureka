export interface User {
  id: number;
  email: string;
  full_name: string;
  is_active: boolean;
}

export interface Category {
  id: number;
  name: string;
  description?: string | null;
}

export interface Product {
  id: number;
  name: string;
  sku: string;
  description?: string | null;
  quantity: number;
  price: string;
  category_id?: number | null;
}

export interface DashboardStats {
  product_count: number;
  category_count: number;
  total_quantity: number;
  low_stock_count: number;
  inventory_value: string;
}
