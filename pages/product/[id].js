/* =========================================Product Details Page================================================= */
//import statements
import Head from "next/head";
import { useState, useEffect, useRef, useContext } from "react";
import { getData } from "../../utils/fetchData";
import { DataContext } from "../../store/GlobalState";
import { addToCart } from "../../store/Actions";
import { useRouter } from "next/router";

const ProductDetails = (props) => {

  //used to direct users back
  const router = useRouter();

  //product from getServerSide props function
  const [product] = useState(props.product);

  //stores index of image selected and used to push image to bigger display
  const [tab, setTab] = useState(0);


  const imgRef = useRef();

  //global state
  const { state, dispatch } = useContext(DataContext);
  const { cart } = state;

  //called each time an image is clicked on
  useEffect(() => {
    const pics = imgRef.current.children;
    
    //remove class active for images not active
    for (let x = 0; x < pics.length; x++) {
      pics[x].className = pics[x].className.replace(
        "active",
        "img-thumbnail rounded"
      );
    }

    //loop to see which picture is currently selected and replace className
    pics[tab].className = "active img-thumbnail rounded";
  }, [tab]);


  //displays product details
  return (
    <div className="my-3 container-sm">
      <button className="btn btn-dark" onClick={() => router.back()}>
        <i class="fas fa-chevron-left"></i> Return
      </button>
      <div className="row product_details ">
        <Head>
          <title>Product Details</title>
        </Head>

        <div className="col-md-6">
          <img
            src={product.images[tab].url}
            alt={product.images[tab].url}
            className="d-block img-thumbnail rounded mt-4 w-100"
            style={{ height: "400px" }}
          />
          <div className="row mx-0" style={{ cursor: "pointer" }} ref={imgRef}>
            {product.images.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={image.url}
                className="img-thumbnail rounded"
                style={{ height: "70px", width: "20%" }}
                onClick={() => setTab(index)}
              />
            ))}
          </div>
        </div>
        <div className="col-md-6 mt-3">
          <h2 className="text-uppercase">{product.title}</h2>
          <h5>${product.price}.00</h5>
          <div className="d-flex flex-row bd-highlight mb-3 justify-content-between">
            {product.inStock > 0 ? (
              <h6>Stock Avail: {product.inStock}</h6>
            ) : (
              <h6>Sold Out</h6>
            )}
            <h6>Sold: {product.sold}</h6>
          </div>
          <div className="my-2">{product.description}</div>
          <div className="my-2">{product.content} </div>
          <button
            type="button"
            className="btn btn-success d-block my-3 px-5"
            onClick={() => dispatch(addToCart(product, cart))}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  );
};

//get product and pass as props
export async function getServerSideProps({ params: { id } }) {
  const res = await getData(`product/${id}`);
  return {
    props: {
      product: res.product,
    },
  };
}
export default ProductDetails;
