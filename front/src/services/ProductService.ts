const PRODUCTS_URL = '/api/products';

export interface Product {
  id?: number;
  name: string;
  price: number;
  createdAt?: string;
  updatedAt?: string | null;
}

type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

type ProductUpdate = Partial<ProductInput>;

export const ProductService = {
  async getAllProducts(): Promise<Product[]> {
    const response = await fetch(PRODUCTS_URL);
    if (!response.ok) {
      throw new Error('Failed to fetch products');
    }
    return response.json();
  },

  async createProduct(product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    const response = await fetch(PRODUCTS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to create product');
    }
    return response.json();
  },

  async updateProduct(id: number, product: Partial<Product>): Promise<Product> {
    const response = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) {
      throw new Error('Failed to update product');
    }
    return response.json();
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await fetch(`${PRODUCTS_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('Failed to delete product');
    }
  },
};
