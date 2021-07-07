/* =============================================CLIENT HTTP REQUESTS TO REST API================================== */
//function for making HTTP Requests
const fetch = require("node-fetch");

/* Below are modules for making CRUD requests where:
-api route is passed 
-HTTP req method described
-token to authorize 
-body for POST,PUT & PATCH reqs*/

//=====================================================READ
export const getData = async (url, token) => {
  const res = await fetch(`http://localhost:3000/api/${url}`, {
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
  const res = await fetch(`http://localhost:3000/api/${url}`, {
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
  const res = await fetch(`http://localhost:3000/api/${url}`, {
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
