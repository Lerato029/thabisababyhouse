/* =============================================CLIENT HTTP REQUESTS TO API================================== */
const fetch = require("node-fetch");



//=====================================================READ
export const getData = async (url, token) => {

  const res = await fetch(`https://thabisa-baby-house.vercel.app/api/${url}`, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  });
  const data = await res.json();
  return data;
};

//=====================================================CREATE
export const postData = async (url, post, token) => {
 
  const res = await fetch(`https://thabisa-baby-house.vercel.app/api/${url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};


//=====================================================UPDATE
export const putData = async (url, post, token) => {
  const res = await fetch(`https://thabisa-baby-house.vercel.app/api/${url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};

//=====================================================PATCH
export const patchData = async (url, post, token) => {
  const res = await fetch(`http://localhost:3000/api/${url}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(post),
  });
  const data = await res.json();
  return data;
};

//=====================================================DELETE
export const deleteData = async (url, token) => {
  const res = await fetch(`http://localhost:3000/api/${url}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  });
  const data = await res.json();
  return data;
};
