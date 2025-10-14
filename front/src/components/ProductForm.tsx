import { useState } from 'react';
import type { Product } from '../services/ProductService';
import { ProductService } from '../services/ProductService';

interface ProductFormProps {
  onProductCreated: () => void;
}

type ProductInput = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

export const ProductForm = ({ onProductCreated }: ProductFormProps) => {
  const [product, setProduct] = useState<ProductInput>({ 
    name: '', 
    price: 0 
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);
    
    try {
      await ProductService.createProduct(product);
      setProduct({ name: '', price: 0 });
      onProductCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="product-form">
      <h2>Add New Product</h2>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Product Name:</label>
          <input
            type="text"
            id="name"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            step="0.01"
            min="0"
            value={product.price || ''}
            onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) || 0 })}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product'}
        </button>
      </form>
    </div>
  );
};
