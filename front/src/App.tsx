import { useState } from 'react';
import { ProductForm } from './components/ProductForm';
import { ProductList } from './components/ProductList';
import './App.css';

function App() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductCreated = () => {
    setRefreshKey(prev => prev + 1); // This will trigger a re-render of ProductList
  };

  return (
    <div className="app">
      <header>
        <h1>Product Management</h1>
      </header>
      <main>
        <div className="container">
          <ProductForm onProductCreated={handleProductCreated} />
          <ProductList key={refreshKey} />
        </div>
      </main>
    </div>
  );
}

export default App;
