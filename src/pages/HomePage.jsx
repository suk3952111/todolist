import { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { useAsync } from "../hooks/useAsync";
import "./HomePage.css";

const fetchProducts = () => {
  return fetch("https://fakestoreapi.com/products/").then((res) => res.json());
};

const Home = () => {
  const { data: products, loading, error } = useAsync(fetchProducts);
  const [filters, setFilters] = useState({
    category: "all",
    sortOption: "price",
  });
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products) {
      let sortedProducts = [...products];

      if (filters.category !== "all") {
        sortedProducts = sortedProducts.filter(
          (product) => product.category === filters.category
        );
      }

      if (filters.sortOption === "price-lowtohigh") {
        sortedProducts.sort((a, b) => a.price - b.price);
      } else if (filters.sortOption === "price-hightolow") {
        sortedProducts.sort((a, b) => b.price - a.price);
      } else if (filters.sortOption === "rating") {
        sortedProducts.sort((a, b) => b.rating.rate - a.rating.rate);
      } else if (filters.sortOption === "review") {
        sortedProducts.sort((a, b) => b.rating.count - a.rating.count);
      }

      setFilteredProducts(sortedProducts);
    }
  }, [products, filters]);

  if (loading) {
    return <div>상품들을 불러오고 있습니다...</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  const categories = [
    "all",
    ...(products && products.length > 0
      ? [...new Set(products.map((product) => product.category))]
      : []),
  ];
  return (
    <div>
      <div>
        <h1>인터넷쇼핑몰입니다!</h1>
      </div>
      <div>
        <label>
          카테고리 선택:
          <select
            value={filters.category}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                category: e.target.value,
              }))
            }
          >
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>
        <label>
          정렬 기준:
          <select
            value={filters.sortOption}
            onChange={(e) =>
              setFilters((prevFilters) => ({
                ...prevFilters,
                sortOption: e.target.value,
              }))
            }
          >
            <option value="price-lowtohigh">가격 낮은순</option>
            <option value="price-hightolow">가격 높은순</option>
            <option value="rating">평점 높은순</option>
            <option value="review">리뷰 많은순</option>
          </select>
        </label>
      </div>
      <div>
        <h1>상품 리스트</h1>
        <ul>
          {filteredProducts.map((product) => (
            <li key={`key-${product.id}`}>
              <h2>{product.title}</h2>
              <p>가격: ${product.price}</p>
              <p>상품 설명 : {product.description}</p>
              <img
                src={product.image}
                alt="상품 사진"
                className="product-image"
              />
              <p>
                <FaStar /> {product.rating.rate} (리뷰 수:
                {product.rating.count}
                명)
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
