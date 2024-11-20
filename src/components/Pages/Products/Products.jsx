import React, { useState, useContext } from "react";
import { CartContext } from "../../../Services/CartContext";
import "./Products.css";

import Slider from '@mui/material/Slider';

function Products() {
  const { addToCart } = useContext(CartContext);

  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    brands: [],
    models: [],
    minPrice: 0,
    maxPrice: 5000,
  });

  const products = [
    {
      id: 1,
      name: "Samsung QLED TV",
      price: 1500,
      category: "Electronics",
      size: 55,
      brand: "Samsung",
      model: "QLED",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 2,
      name: "LG OLED TV",
      price: 2000,
      category: "Electronics",
      size: 65,
      brand: "LG",
      model: "OLED",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 3,
      name: "Sony Bravia TV",
      price: 1800,
      category: "Electronics",
      size: 75,
      brand: "Sony",
      model: "Bravia",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 4,
      name: "Panasonic Viera TV",
      price: 1200,
      category: "Electronics",
      size: 50,
      brand: "Panasonic",
      model: "Viera",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 5,
      name: "Nike Running Shoes",
      price: 120,
      category: "Clothing",
      size: 42,
      brand: "Nike",
      model: "Air Zoom",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 6,
      name: "Adidas Sneakers",
      price: 90,
      category: "Clothing",
      size: 40,
      brand: "Adidas",
      model: "Ultraboost",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 7,
      name: "Levi's Jeans",
      price: 60,
      category: "Clothing",
      size: 32,
      brand: "Levi's",
      model: "501",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 8,
      name: "Apple Watch",
      price: 400,
      category: "Accessories",
      size: "M",
      brand: "Apple",
      model: "Series 8",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 9,
      name: "Samsung Galaxy Watch",
      price: 350,
      category: "Accessories",
      size: "L",
      brand: "Samsung",
      model: "Galaxy Watch 5",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    {
      id: 10,
      name: "Sony Headphones",
      price: 200,
      category: "Electronics",
      size: "One Size",
      brand: "Sony",
      model: "WH-1000XM4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    },
    // ניתן להוסיף עוד מוצרים כאן...
  ];

  const handleFilterChange = (field, value) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const toggleFilter = (field, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      if (updated[field].includes(value)) {
        updated[field] = updated[field].filter((item) => item !== value);
      } else {
        updated[field] = [...updated[field], value];
      }
      return updated;
    });
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 ||
      filters.categories.includes(product.category);

    const matchesSize =
      filters.sizes.length === 0 ||
      filters.sizes.includes(product.size);

    const matchesPrice =
      product.price >= filters.minPrice && product.price <= filters.maxPrice;

    const matchesBrand =
      filters.brands.length === 0 || filters.brands.includes(product.brand);

    const matchesModel =
      filters.models.length === 0 || filters.models.includes(product.model);

    return (
      matchesCategory &&
      matchesSize &&
      matchesPrice &&
      matchesBrand &&
      matchesModel
    );
  });

  const categories = Array.from(new Set(products.map((p) => p.category)));
  const sizes = Array.from(new Set(products.map((p) => p.size)));
  const brands = Array.from(new Set(products.map((p) => p.brand)));
  const models = Array.from(new Set(products.map((p) => p.model)));

  return (
    <div className="products-page">
      <div className="filters">
        <div className="filter-title">
          <h3>Filters</h3>
        </div>
  
        <div className="filter-section">
          <h4>Category</h4>
          <div className="Category">
            {categories.map((category) => (
              <label key={category} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.categories.includes(category)}
                  onChange={() => toggleFilter("categories", category)}
                />
                {category}
              </label>
            ))}
          </div>
        </div>
  
        <div className="filter-section">
          <h4>Size</h4>
          <div className="size">
            {sizes.map((size) => (
              <label key={size} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.sizes.includes(size)}
                  onChange={() => toggleFilter("sizes", size)}
                />
                {size} Inch
              </label>
            ))}
          </div>
        </div>
  
        <div className="filter-section">
          <h4>Brand</h4>
          <div className="Brand">
            {brands.map((brand) => (
              <label key={brand} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.brands.includes(brand)}
                  onChange={() => toggleFilter("brands", brand)}
                />
                {brand}
              </label>
            ))}
          </div>
        </div>
  
        <div className="filter-section">
          <h4>Model</h4>
          <div className="Model">
            {models.map((model) => (
              <label key={model} className="filter-label">
                <input
                  type="checkbox"
                  checked={filters.models.includes(model)}
                  onChange={() => toggleFilter("models", model)}
                />
                {model}
              </label>
            ))}
          </div>
        </div>
  
        <div className="filter-section">
          <h4>Price Range</h4>
          <Slider
            value={[filters.minPrice, filters.maxPrice]}
            onChange={(e, newValue) =>
              setFilters((prev) => ({
                ...prev,
                minPrice: newValue[0],
                maxPrice: newValue[1],
              }))
            }
            valueLabelDisplay="auto"
            min={0}
            max={5000}
            step={10}
          />
          <div className="price-values" style={{display:"flex",justifyContent:"space-around"}}>
            <span>Min: ${filters.minPrice}</span>
            <span>Max: ${filters.maxPrice}</span>
          </div>
        </div>
      </div>
  
      <div className="products-list">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div className="product-card" key={product.id}>
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h4>{product.name}</h4>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products match your filters.</p>
        )}
      </div>
    </div>
  );
  
  
}

export default Products;
