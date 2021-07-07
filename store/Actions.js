
//actions to be used in reducer
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
  //check if is out of stock and return error
  if (product.inStock === 0)
    return {
      type: "NOTIFY",
      payload: { error: "We are currently out of stock for this item" },
    };

  //test to see if item is not already in cart
  const check = cart.every((item) => {
    return item._id !== product._id;
  });


  //if test failed notify user 
  if (!check)
    return { type: "NOTIFY", payload: { error: "Item already added to cart" } };

  //appended item to cart
  return { type: "ADD_CART", payload: [...cart, { ...product, quantity: 1 }] };
};

export const decrease = (data, id) => {
  console.log(data)
  //spread data in array as we'll updating its values
  const newData = [...data];
 
  //loop through array to find requested product in cart
  newData.forEach((item) => {
    //decrease quantity
    if (item._id === id) item.quantity -= 1;
  });

  //send updated cart
  return { type: "ADD_CART", payload: newData };
};

//same as decrease but increases quantity
export const increase = (data, id) => {
  const newData = [...data];
  newData.forEach((item) => {
    if (item._id === id) item.quantity += 1;
  });
  return { type: "ADD_CART", payload: newData };
};

/* ====================Deleting and Updating================= */
export const deleteItem = (data, id, type) => {
  //filter out item in array matching id passed in this module
  const newData = data.filter((item) => item._id !== id);

  //return updated data
  return { type, payload: newData };
};

export const updateItem = (data, id, post, type) => {
  //item in data array matching id will be updated to the post passed
  const newData = data.map((item) => (item._id === id ? post : item));

  //return updated data
  return { type, payload: newData };
};
