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

export async function updateCart(state, email) {
  console.log(`adding products to cart using emailId`);
  const encodedEmail = btoa(email); // encodeURIComponent(email)
  console.log("current state: " + JSON.stringify(state));
  console.log("current email: " + email);
  console.log("current encoded-email: " + encodedEmail);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DB}/cart/${encodedEmail}.json`,
      {
        method: "PATCH",
        body: JSON.stringify({
          items: state.items,
          totalPrice: state.totalPrice,
        }),
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export async function fetchCartItems(email) {
  console.log(`GETTING products of cart using emailId`);
  const encodedEmail = btoa(email); // encodeURIComponent(email)
  console.log("current email: " + email);
  console.log("current encoded-email: " + encodedEmail);

  try {
    const response = await fetch(
      `${process.env.REACT_APP_FIREBASE_DB}/cart/${encodedEmail}.json`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error);
  }
}

export function getNthParent(element, n) {
  let parent = element;
  for (let i = 0; i < n; i++) {
    parent = parent.parentNode;
    if (!parent) {
      // Return null if there are not enough parent elements
      return null;
    }
  }
  return parent;
}
