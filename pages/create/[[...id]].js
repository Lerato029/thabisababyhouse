/* =========================================CREATE PAGE - ALSO OPTIONAL DYNAMIC ROUTE================================================= */
//next elements
import Head from "next/head";
import Link from "next/link";

//ROUTING
import { useRouter } from "next/router";

//REACT HOOKS
import { useState, useEffect, useContext } from "react";
import { imageUpload } from "../../utils/imageUpload";
import { postData, getData, putData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";

const CreateProduct = () => {
  //object to create default properties for product state variable
  const initialState = {
    title: "",
    price: 0,
    inStock: 0,
    description: "",
    content: "",
    category: "",
  };

  //add object to product state property
  const [product, setProduct] = useState(initialState);

  /* destructuring product properties */
  const { title, price, inStock, description, content, category } = product;

  //image array
  const [images, setImages] = useState([]);

  //getting state and dispatch to update it
  const { state, dispatch } = useContext(DataContext);
  const { categories, auth } = state; //properties used

  //initialize router and get query string
  const router = useRouter();
  const { id } = router.query;

  //boolean to check if a product is being created or updated
  const [editProduct, setEditProduct] = useState(false);

  /* ============================================================Main Functionality */
  //==================================GET - CONDITIONAL
  useEffect(() => {
    //check if query string added to route
    if (id) {
      //then we know a product is being updated
      setEditProduct(true);
      //fetch data from database
      getData(`product/${id}`).then((res) => {
        //add response data to state properties
        setProduct(res.product);
        setImages(res.product.images);
      });
    } else {
      //no query then new product is being created
      setEditProduct(false);

      //reset state properties
      setProduct(initialState);
      setImages([]);
    }
  }, [id]);

  //UPDATE PRODUCT STATE PROPERTY
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
    dispatch({ type: "NOTIFY", payload: {} });
  };

  //upload images
  const handleUpload = (e) => {
    //reset notify
    dispatch({ type: "NOTIFY", payload: {} });

    //declare variables
    let newImages = [];
    let count = 0;
    let err = "";

    //store uploaded images in array
    const pics = [...e.target.files];

    //user has to upload an image
    if (pics.length === 0)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "No images uploaded!" },
      });

    //loop through array
    pics.forEach((pic) => {
      //restrict size
      if (pic.size > 1024 * 1024)
        return (err = "Image should be less than or 1mb in size");

      //restrict type
      if (pic.type !== "image/jpeg" && pic.type !== "image/png")
        return (err = "Please upload a jpeg or png image");

      //add one to count variable
      count += 1;

      //make sure not more than 5 images are uploaded and push image to array
      if (count <= 5) newImages.push(pic);

      //loop ends and the array is returned
      return newImages;
    });

    //check if error is assigned a value
    if (err)
      return dispatch({
        type: "NOTIFY",
        payload: { error: err },
      });

    //make sure not more than 5 images are added and push image to array
    const imgCount = images.length;
    if (imgCount + newImages.length > 5)
      return dispatch({
        type: "NOTIFY",
        payload: { error: "You can select up to 5 images!" },
      });
    
    //else append uploaded images to state property
    setImages([...images, ...newImages]);
  };


  //================================PUT/POST - CONDITIONAL
  const handleSubmit = async (e) => {
    e.preventDefault();
    //only admin can create/edit product 
    if (auth.user.role !== "admin")
      return dispatch({
        type: "NOTIFY",
        payload: { error: `You're not authorized!` },
      });

    //all fields to be filled
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


    //notify user req is being processed
    dispatch({
      type: "NOTIFY",
      payload: { loading: true },
    });

    //declare array
    let pictures = [];

    //in images separate images with urls from ones without by
    //storing them in different variables
    const picURL = images.filter((image) => !image.url);
    const oldPicURL = images.filter((image) => image.url);


    //fetch request to cloudinary API with array with pics without URL
    if (picURL.length > 0) pictures = await imageUpload(picURL);

    //response variable
    let res;

    //if editing product PUT req...
    if (editProduct) {
      //store response in res variable
      res = await putData(
        `product/${id}`,
        {
          ...product,
          images: [...oldPicURL, ...pictures],
        },
        auth.token
      );

      //catch err
      if (res.err)
        return dispatch({
          type: "NOTIFY",
          payload: { error: res.err },
        });
    } else {
      //else editing product false so POST req...
      //store response in res variable
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

    //Return res
    return dispatch({
      type: "NOTIFY",
      payload: { success: res.msg },
    });
  };

  //delete image on button click
  const deleteImage = (index) => {
    //store images in newArray so we ca edit it
    const newArr = [...images];

    //use if to remove from array
    newArr.splice(index, 1);

    //append new values to array
    setImages(newArr);
  };


  //return form that displays data and images uploaded instantly
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
        <button type="submit" className="btn btn-success px-4 my-4">
          {editProduct ? "Update Product" : "Create Product"}
        </button>
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
