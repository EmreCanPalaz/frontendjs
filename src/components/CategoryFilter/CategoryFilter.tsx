import React, { useState } from 'react';
import './CategoryFilter.css';

interface CategoryFilterProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ selectedCategory, onCategoryChange }) => {
  const [minPrice, setMinPrice] = useState<string>('');
  const [maxPrice, setMaxPrice] = useState<string>('');
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const categories = [
    { id: 'all', name: 'All Products' },
    { id: "men's clothing", name: "Men's Clothing" },
    { id: "women's clothing", name: "Women's Clothing" },
    { id: 'electronics', name: 'Electronics' },
    { id: 'jewelery', name: 'Jewelry' }
  ];

  const handlePriceFilter = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Fiyat aralığı: ${minPrice || '0'} - ${maxPrice || 'max'} uygulandı`);
  };

  const handleRatingChange = (rating: number) => {
    if (selectedRatings.includes(rating)) {
      setSelectedRatings(selectedRatings.filter(r => r !== rating));
    } else {
      setSelectedRatings([...selectedRatings, rating]);
    }
  };

  const handleRatingFilter = () => {
    if (selectedRatings.length > 0) {
      alert(`Seçilen yıldız sayıları: ${selectedRatings.join(', ')}`);
    } else {
      alert('Lütfen bir yıldız derecesi seçin');
    }
  };

  return (
    <div className="category-filter">
      <div className="container">
        <h4 className="filter-heading">Categories</h4>
        <div className="filter-options">
          {categories.map(category => (
            <div className="form-check" key={category.id}>
              <input
                className="form-check-input"
                type="radio"
                name="category"
                id={`category-${category.id}`}
                checked={selectedCategory === (category.id === 'all' ? null : category.id)}
                onChange={() => onCategoryChange(category.id === 'all' ? null : category.id)}
              />
              <label className="form-check-label" htmlFor={`category-${category.id}`}>
                {category.name}
              </label>
            </div>
          ))}
        </div>
        
        <div className="price-filter mt-4">
          <h4 className="filter-heading">Price Range</h4>
          <form onSubmit={handlePriceFilter}>
            <div className="price-inputs d-flex">
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Min" 
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </div>
              <div className="input-group px-2 mb-3">
                <span className="input-group-text">-</span>
              </div>
              <div className="input-group mb-3">
                <span className="input-group-text">$</span>
                <input 
                  type="number" 
                  className="form-control" 
                  placeholder="Max"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                />
              </div>
            </div>
            <button 
              type="submit" 
              className="btn btn-outline-primary btn-sm w-100" 
              title="Fiyat aralığını uygula"
            >
              Apply Filter
            </button>
          </form>
        </div>
        
        <div className="rating-filter mt-4">
          <h4 className="filter-heading">Ratings</h4>
          {[5, 4, 3, 2, 1].map(rating => (
            <div className="form-check" key={rating}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`rating-${rating}`}
                checked={selectedRatings.includes(rating)}
                onChange={() => handleRatingChange(rating)}
              />
              <label className="form-check-label" htmlFor={`rating-${rating}`}>
                {[...Array(rating)].map((_, i) => (
                  <i key={i} className="bi bi-star-fill text-warning"></i>
                ))}
                {[...Array(5 - rating)].map((_, i) => (
                  <i key={i} className="bi bi-star text-warning"></i>
                ))}
                <span className="ms-2">& Up</span>
              </label>
            </div>
          ))}
          <button 
            className="btn btn-outline-primary btn-sm w-100 mt-3" 
            onClick={handleRatingFilter}
            title="Yıldız filtresini uygula"
          >
            Apply Rating Filter
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter; 