import Head from "next/head";
import { useState, useEffect, useContext } from "react";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";

import { useRouter } from "next/router";
import Link from "next/link";

const CreateProduct = () => {
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };
  const [product, setProduct] = useState(initialState);
  const { title, price, inStock, description, content, category } = product;
  const [images, setImages] = useState([]);
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state;
  /* ======================================================Router */
  const router = useRouter();
  const { id } = router.query;
  const [editProduct, setEditProduct] = useState(false);

  useEffect(() => {
    if (id) {
      setEditProduct(true);
      //fetch data from database
      getData(`product/${id}`).then((res) => {
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      setEditProduct(false);
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  /* ==========================================Main Functionality=========================================== */
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
    console.log(product);
    console.log(images);
  };

  const handleUpload = (e) => {
    dispatch({ type: "NOTIFY", payload: {} });
    let newImages = [];
    let count = 0;
    let err = "";
    const pics = [...e.target.files];
    console.log(pics);
    if (pics.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "No images uploaded!" },
      });

    pics.forEach((pic) => {
      if (pic.size > 1024 * 1024)
        return (err = "Image should be less than or 1mb in size");

      if (pic.type !== "image/jpeg" && pic.type !== "image/png")
        return (err = "Please upload a jpeg or png image");

      //add one to count variable
      count += 1;

      //make sure not more than 5 images are added
      if (count <= 5) newImages.push(pic);
      return newImages;
    });

    if (err)
      return dispatch({
        type: "NOTIFY",
        payload: { error: err },
      });
    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "You can select up to 5 images!" },
      });
    setImages([...images, ...newImages]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("called");
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: `You're not authorized!` },
      });
    if (
      !title ||
      !price ||
      !inStock ||
      !description ||
      !content ||
      category === "all" ||
      images.length === 0
    )
      return dispatch({
        type: "NOTIFY",
        payload: { error: "Please fill out the whole form" },
      });
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });

    let pictures = [];
    const picURL = images.filter((image) => !image.url);
    const oldPicURL = images.filter((image) => image.url);

    if (picURL.length > 0) pictures = await imageUpload(picURL);
    let res;
    if (editProduct) {
      res = await putData(
        `product/${id}`,
        {
          ...product,
          images: [...oldPicURL, ...pictures],
        },
        auth.token
      );

      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
    } else {
      res = await postData(
        "product",
        {
          ...product,
          images: [...oldPicURL, ...pictures],
        },
        auth.token
      );

      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
    }
    return dispatch({
      type: "NOTIFY",
      payload: { success: res.msg },
    });
  };

  const deleteImage = (index) => {
    console.log("delete");
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };
  return (
    <div className="my-3 container-sm create_products">
      <Head>
        <title>Product</title>
      </Head>
      <form className="row" onSubmit={handleSubmit}>
        <div className="col-md-6">
          <input
            type="text"
            name="title"
            value={title}
            placeholder="Title"
            className="d-block my-4 w-100 p-2 form-control"
            onChange={handleChangeInput}
          />
          <textarea
            id="floatingTextarea2"
            name="description"
            cols="30"
            rows="4"
            placeholder="Description"
            value={description}
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2 form-control"
          />
          <textarea
            name="content"
            id="description"
            cols="30"
            rows="6"
            placeholder="Content"
            value={content}
            onChange={handleChangeInput}
            className="d-block my-4 w-100 p-2 form-control"
          />
          <div className="row">
            <div class="col-md-3">
              <label for="validationCustom03" class="form-label">
                Price
              </label>
              <input
                type="number"
                name="price"
                value={price}
                placeholder="Price"
                className="form-control"
                onChange={handleChangeInput}
                id="validationCustom03"
                required
              />
              <div class="invalid-feedback">Please provide a valid price.</div>
            </div>

            <div class="col-md-3">
              <label for="validationCustom05" class="form-label">
                In Stock
              </label>
              <input
                type="number"
                name="inStock"
                value={inStock}
                id="validationCustom05"
                className="form-control"
                onChange={handleChangeInput}
                required
              />
              <div className="invalid-feedback">
                Please provide a valid number
              </div>
            </div>
            <div className="col-md-6">
              <label htmlFor="validationCustom04" className="form-label">
                Category
              </label>
              <select
                className="form-select"
                id="validationCustom04"
                required
                name="category"
                value={category}
                onChange={handleChangeInput}
              >
                <option value="">Choose</option>
                {categories.map((option) => (
                  <option key={option._id} value={option._id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">
                Please select a valid category.
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-success px-4 my-4">
            {editProduct ? "Update Product" : "Create Product"}
          </button>
        </div>
        <div className="col-md-6 my-4">
          <div className="mb-3">
            <input
              className="form-control"
              type="file"
              id="formFileMultiple"
              multiple
              onChange={handleUpload}
            />
          </div>
          <div className="row img-up">
            {images.map((img, index) => (
              <div key={index} className="file_img">
                <img
                  src={img.url ? img.url : URL.createObjectURL(img)}
                  alt=""
                  className="img-thumbnail"
                />
                <span onClick={() => deleteImage(index)}>x</span>
              </div>
            ))}
          </div>
        </div>
      </form>
      <div className="row">
      <Link href="/categories">
        <button className="btn btn-dark text-capitalize">
          create a new category here
        </button>
      </Link>
      </div>
    </div>
  );
};

export default CreateProduct;
