import { useParams } from "react-router-dom";
import { useAsync } from "../hooks/useAsync";
import { FaStar } from "react-icons/fa6";

const ProductDetail = () => {
  const { productSlug } = useParams();
  const fetchProduct = () => {
    return fetch(`https://fakestoreapi.com/products/${productSlug}`).then(
      (res) => res.json()
    );
  };
  const { data: productDetail, loading, error } = useAsync(fetchProduct);

  if (loading) {
    return <div>상품 상세내용을 불러오고 있습니다...</div>;
  }

  if (error) {
    return <div>에러: {error.message}</div>;
  }

  return (
    <div>
      {productDetail && (
        <div>
          <h2>{productDetail.title}</h2>
          <p>가격: ${productDetail.price}</p>
          <p>상품 설명: {productDetail.description}</p>
          <img
            src={productDetail.image}
            alt="상품 사진"
            className="product-image"
          />
          <p>
            <FaStar /> {productDetail.rating.rate} (리뷰 수:
            {productDetail.rating.count} 명)
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
