const PRODUCT_URL =
  "https://raw.githubusercontent.com/EKLAVYAGO/product/refs/heads/main/pr.json";

export async function getProducts(page = 1, limit = 10) {

  const response = await fetch(PRODUCT_URL);
  const products = await response.json();

  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    products: products.slice(start, end),
    currentPage: page,
    totalProducts: products.length,
    hasMore: end < products.length
  };
}