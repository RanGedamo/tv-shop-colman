import React, { useState, useContext, useEffect } from "react";
import { CartContext } from "../../../Contexts/CartContext";
import { Tv, Filter, ShoppingCart, Search, X } from 'lucide-react';
import Slider from '@mui/material/Slider';

// Full products array
const productsList = [
  {
    id: 1,
    name: "Samsung Neo QLED 4K",
    price: 6999,
    category: "QLED",
    size: "65",
    brand: "Samsung",
    model: "QN65QN90C",
    resolution: "4K Ultra HD",
    rating: 4.8,
    reviewCount: 156,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    features: ["4K Resolution", "HDR", "Smart TV", "Gaming Mode", "120Hz"],
    inStock: true,
    discount: 10,
    description: "Smart TV with Quantum Matrix technology and Mini LED backlighting"
  },
  {
    id: 2,
    name: "LG OLED C3",
    price: 8999,
    category: "OLED",
    size: "65",
    brand: "LG",
    model: "OLED65C3",
    resolution: "4K Ultra HD",
    rating: 4.9,
    reviewCount: 203,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    features: ["OLED Display", "Dolby Vision", "Gaming Pro", "WebOS"],
    inStock: true,
    discount: 0,
    description: "Advanced OLED TV with α9 Gen6 Processor"
  },
  {
    id: 3,
    name: "Sony Bravia XR",
    price: 12999,
    category: "LED",
    size: "75",
    brand: "Sony",
    model: "XR75X90L",
    resolution: "4K Ultra HD",
    rating: 4.7,
    reviewCount: 89,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    features: ["Full Array LED", "XR Processor", "Google TV", "Acoustic Multi-Audio"],
    inStock: false,
    discount: 15,
    description: "Smart TV with Cognitive XR Processor"
  },
  {
    id: 4,
    name: "Samsung QN900C",
    price: 14999,
    category: "QLED",
    size: "85",
    brand: "Samsung",
    model: "QN85QN900C",
    resolution: "8K",
    rating: 4.9,
    reviewCount: 45,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    features: ["8K Resolution", "Neural Quantum Processor", "Infinity Screen", "Dolby Atmos"],
    inStock: true,
    discount: 0,
    description: "Advanced 8K TV with ultra-slim design"
  },
  {
    id: 5,
    name: "LG OLED G3",
    price: 9999,
    category: "OLED",
    size: "55",
    brand: "LG",
    model: "OLED55G3",
    resolution: "4K Ultra HD",
    rating: 4.8,
    reviewCount: 167,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaZ-4LcyWKrv_Bum-v5ub53critgNPo5XWTQ&s",
    features: ["OLED evo", "Wall Mount Design", "AI Picture Pro", "Filmmaker Mode"],
    inStock: true,
    discount: 5,
    description: "Premium OLED TV for wall mounting"
  }
];

function Products() {
  const { addToCart } = useContext(CartContext);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsList);

  const [filters, setFilters] = useState({
    categories: [],
    sizes: [],
    brands: [],
    resolutions: [],
    minPrice: 0,
    maxPrice: 15000,
  });

  // Function to save to localStorage
  const addToCartWithStorage = (product) => {
    addToCart(product);
    const currentCart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProduct = currentCart.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCart.push({ ...product, quantity: 1 });
    }
    
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };

  // Products filtering function
  useEffect(() => {
    let result = productsList;

    // Search filter
    if (searchQuery) {
      result = result.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Price filter
    result = result.filter(product =>
      product.price >= filters.minPrice && product.price <= filters.maxPrice
    );

    // Categories filter
    if (filters.categories.length > 0) {
      result = result.filter(product => 
        filters.categories.includes(product.category)
      );
    }

    // Screen sizes filter
    if (filters.sizes.length > 0) {
      result = result.filter(product => 
        filters.sizes.includes(product.size)
      );
    }

    // Brands filter
    if (filters.brands.length > 0) {
      result = result.filter(product => 
        filters.brands.includes(product.brand)
      );
    }

    // Resolution filter
    if (filters.resolutions.length > 0) {
      result = result.filter(product => 
        filters.resolutions.includes(product.resolution)
      );
    }

    setFilteredProducts(result);
  }, [searchQuery, filters]);

  const toggleFilter = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  // Get unique values for filter categories
  const uniqueCategories = [...new Set(productsList.map(p => p.category))];
  const uniqueBrands = [...new Set(productsList.map(p => p.brand))];
  const uniqueSizes = [...new Set(productsList.map(p => p.size))];
  const uniqueResolutions = [...new Set(productsList.map(p => p.resolution))];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <div className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-4">
            <div className="relative flex-1 max-w-xl">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search by name, brand, or description..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            >
              <Filter size={20} />
              <span>Filter</span>
            </button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Filters Panel */}
          <div className={`
            fixed inset-y-0 left-0 w-80 bg-white shadow-lg transform transition-transform duration-300 z-40
            ${isFilterOpen ? 'translate-x-0' : '-translate-x-full'}
            md:relative md:transform-none md:w-64 md:shadow-none
          `}>
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filter Products</h2>
                <button
                  onClick={() => setIsFilterOpen(false)}
                  className="md:hidden text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Price Range Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Price Range</h3>
                <Slider
                  value={[filters.minPrice, filters.maxPrice]}
                  onChange={(e, newValue) => setFilters(prev => ({
                    ...prev,
                    minPrice: newValue[0],
                    maxPrice: newValue[1]
                  }))}
                  min={0}
                  max={15000}
                  step={100}
                  valueLabelDisplay="auto"
                  sx={{
                    color: '#2563eb',
                    '& .MuiSlider-thumb': {
                      backgroundColor: '#ffffff',
                      border: '2px solid currentColor',
                    },
                  }}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${filters.minPrice.toLocaleString()}</span>
                  <span>${filters.maxPrice.toLocaleString()}</span>
                </div>
              </div>

              {/* Brand Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Brand</h3>
                <div className="space-y-2">
                  {uniqueBrands.map(brand => (
                    <label key={brand} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.brands.includes(brand)}
                        onChange={() => toggleFilter('brands', brand)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Category Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Category</h3>
                <div className="space-y-2">
                  {uniqueCategories.map(category => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.categories.includes(category)}
                        onChange={() => toggleFilter('categories', category)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Screen Size Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Screen Size</h3>
                <div className="space-y-2">
                  {uniqueSizes.map(size => (
                    <label key={size} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.sizes.includes(size)}
                        onChange={() => toggleFilter('sizes', size)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{size}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Resolution Filter */}
              <div className="mb-6">
                <h3 className="font-semibold mb-4">Resolution</h3>
                <div className="space-y-2">
                  {uniqueResolutions.map(resolution => (
                    <label key={resolution} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={filters.resolutions.includes(resolution)}
                        onChange={() => toggleFilter('resolutions', resolution)}
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{resolution}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <Tv size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Products Found</h3>
                <p className="text-gray-600">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition duration-300">
                    <div className="relative">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-60 object-cover"
                      />
                      {product.discount > 0 && (
                        <div className="absolute top-4 right-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-semibold">
                          {product.discount}% Off
                        </div>
                      )}
                      {!product.inStock && (
                        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                          <span className="text-white font-semibold">Out of Stock</span>
                        </div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <span className="text-sm text-gray-500">{product.size}</span>
                      </div>
                      
                      {/* Rating */}
                      <div className="flex items-center mb-2">
                        <div className="flex text-yellow-400">
                          {'★'.repeat(Math.floor(product.rating))}
                          {'☆'.repeat(5 - Math.floor(product.rating))}
                        </div>
                        <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
                      </div>

                      {/* Features */}
                      <div className="flex flex-wrap gap-1 mb-3">
                        {product.features.map((feature, index) => (
                          <span
                            key={index}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>

                      {/* Description */}
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {product.description}
                      </p>

                      {/* Price and Add to Cart */}
                      <div className="flex items-center justify-between mt-auto">
                        <div className="space-y-1">
                          {product.discount > 0 ? (
                            <>
                              <div className="text-lg font-bold text-gray-900">
                                ${((product.price * (100 - product.discount)) / 100).toLocaleString()}
                              </div>
                              <div className="text-sm text-gray-500 line-through">
                                ${product.price.toLocaleString()}
                              </div>
                            </>
                          ) : (
                            <div className="text-lg font-bold text-gray-900">
                              ${product.price.toLocaleString()}
                            </div>
                          )}
                        </div>
                        <button
                          onClick={() => addToCartWithStorage(product)}
                          disabled={!product.inStock}
                          className={`
                            px-4 py-2 rounded-lg flex items-center gap-2 transition duration-300
                            ${product.inStock 
                              ? 'bg-blue-600 text-white hover:bg-blue-700' 
                              : 'bg-gray-300 text-gray-500 cursor-not-allowed'}
                          `}
                        >
                          <ShoppingCart size={20} />
                          <span>Add to Cart</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Products;