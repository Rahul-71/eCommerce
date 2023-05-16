export const formatPrice = (val, currency = "INR") => {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: currency,
  }).format(val);
};

export async function fetchProductById(prodId) {
  console.log(`fetching data based on id: ${prodId}`);
  const res = await fetch(`https://fakestoreapi.com/products/${prodId}`);
  const data = await res.json();
  console.log(data);
  return data;
}
