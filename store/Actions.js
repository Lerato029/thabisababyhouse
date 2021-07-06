export const ACTIONS = {
  NOTIFY: "NOTIFY",
  AUTH: "AUTH",
  ADD_CART: "ADD_CART",
  ADD_MODAL: "ADD_MODAL",
  ADD_ORDERS: "ADD_ORDERS",
  ADD_USERS: "ADD_USERS",
  ADD_CATEGORIES: "ADD_CATEGORIES",
  ADD_ENLIST_APPS: "ADD_ENLIST_APPS",
};


//===========================functions to update global state object state===================================
/* ===================Cart Functionality Actions============*/
export const addToCart = (product, cart) => {
  if (product.inStock === 0)
    return {
      type: "NOTIFY",
      payload: { error: "We are currently out of stock for this item" },
    };
  const check = cart.every((item) => {
    return item._id !== product._id;
  });

  if (!check)
    return { type: "NOTIFY", payload: { error: "Item already added to cart" } };
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity -= 1;
  });
  return { type: "ADD_CART", payload: newData };
};

export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_CART", payload: newData };
};

/* ====================Deleting and Updating================= */
export const deleteItem = (data, id, type) => {
  const newData = data.filter((item) => item._id !== id);
  return { type, payload: newData };
};

export const updateItem = (data, id, post, type) => {
  const newData = data.map((item) => (item._id === id ? post : item));
  return { type, payload: newData };
};
