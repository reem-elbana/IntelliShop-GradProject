import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import axios from "axios";
import { CircleLoader } from "react-spinners";
import Slider from "react-slick";
import { useContext, useState } from "react";
import { cartContext } from './../CartContext/CartContext';
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { id } = useParams();
  const { addProductToCart } = useContext(cartContext);
  const [isLoad, setIsLoad] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  async function addToCart() {
    setIsLoad(true);
    const data = await addProductToCart(id);
    if (data.status === "success") {
      toast.success("Product has been successfully added.", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    } else {
      toast.error("Error! Can't add product to cart.", {
        style: {
          background: "#0A1172",
          width: "800px",
          height: "80px",
          color: "white",
        },
      });
    }
    setIsLoad(false);
  }

  const { data, isLoading } = useQuery(`productDetails${id}`, getProductDetails);

  async function getProductDetails() {
    return await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`);
  }

  if (isLoading) {
    return (
      <div className="h-screen flex flex-wrap justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 1500,
  };

  return (
    // <div className="relative w-full md:w-[80%] mx-auto px-4 sm:px-6 bg-white dark:bg-gray-900">
    //   {/* Exit Button */}
    //   <button
    //     onClick={() => navigate(-1)} // Go back to the previous page
    //     aria-label="Close"
    //     className="fixed top-16 left-4 sm:top-20 sm:left-20 text-gray-800 dark:text-white 
    //                hover:text-red-600 rounded-full p-3 sm:p-4 text-2xl sm:text-2xl transition duration-300 ease-in-out 
    //                active:scale-95 z-50"
    //   >
    //     <i className="fa-solid fa-chevron-left"></i>
    //   </button>

    //   <div className="flex flex-col sm:flex-row flex-wrap justify-center items-center mt-12 gap-6">
    //     {/* Slider Section */}
    //     <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
    //       <Slider {...settings}>
    //         {data?.data.data.images.map((image, index) => (
    //           <div key={index} className="w-full">
    //             <img
    //               src={image}
    //               alt={`Slide ${index + 1}`}
    //               className="w-full h-full sm:h-[350px] md:h-[500px] object-cover rounded-lg"
    //             />
    //           </div>
    //         ))}
    //       </Slider>
    //     </div>

    //     {/* Content Section */}
    //     <div className="w-full sm:w-1/2 md:w-2/3 p-5">
    //       <h1 className="text-2xl sm:text-3xl font-medium text-gray-800 dark:text-white">
    //         {data.data.data.title}
    //       </h1>
    //       <p className="text-sm sm:text-base mt-3 text-gray-700 dark:text-gray-300">
    //         {data.data.data.description}
    //       </p>

    //       {/* Price & Rating */}
    //       <div className="flex justify-between items-center mt-3">
    //         <h3 className="font-medium text-lg text-gray-800 dark:text-white">
    //           {data.data.data.price} <span className="font-normal text-red-700">EGP</span>
    //         </h3>
    //         <div className="flex items-center">
    //           <i className="fa-solid fa-star text-yellow-500"></i>
    //           <span className="ml-1">{data.data.data.ratingsAverage}</span>
    //         </div>
    //       </div>

    //       {/* Add to Cart & Wishlist */}
    //       <div className="flex items-center justify-between mt-5 gap-4">
    //         <button
    //           onClick={addToCart}
    //           className="bg-[#1414db] text-white font-medium hover:bg-[#25258a] hover:text-gray-200 transition duration-500 rounded-lg w-full sm:w-[80%] py-3 text-center"
    //         >
    //           {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "+ Add"}
    //         </button>

    //         <i className="fa-solid fa-heart text-3xl text-blue-900 cursor-pointer dark:text-white"></i>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="relative w-full max-w-6xl mx-auto px-4 sm:px-6 bg-white dark:bg-gray-900 py-10">
      {/* Exit Button */}
      <button
        onClick={() => navigate(-1)}
        aria-label="Close"
        className="fixed top-16 left-4 sm:top-20 sm:left-20 text-gray-800 dark:text-white 
               hover:text-red-600 rounded-full p-3 text-2xl transition duration-300 
               active:scale-95 z-50"
      >
        <i className="fa-solid fa-chevron-left"></i>
      </button>

      <div className="flex flex-col lg:flex-row gap-10 mt-10">
        {/* Slider Section */}
        <div className="w-full lg:w-1/2">
          <Slider {...settings}>
            {data?.data.data.images.map((image, index) => (
              <div key={index} className="w-full">
                <img
                  src={image}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full sm:h-[350px] md:h-[550px] object-contain rounded-lg"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Product Info */}
        <div className="w-full lg:w-1/2 space-y-3">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-white">
            {data.data.data.title}
          </h1>

          {/* Ratings & Stock */}
          <div className="flex items-center gap-3">
             <div className="flex items-center">
              <i className="fa-solid fa-star text-yellow-500"></i>
              <span className="ml-1">{data.data.data.ratingsAverage}</span>
            </div>
            <span className="text-sm text-gray-500">(150 Reviews)</span>
            <span className="text-sm text-green-600 font-medium">| In Stock</span>
          </div>

          <p className="text-2xl font-medium text-gray-900 dark:text-white">
            ${data.data.data.price}
          </p>

          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {data.data.data.description}
          </p>

          {/* Colours */}
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-1">Colours:</h4>
            <div className="flex gap-3">
              <div className="w-5 h-5 bg-gray-700 rounded-full border-2 border-black"></div>
              <div className="w-5 h-5 bg-red-500 rounded-full border-2 border-transparent"></div>
            </div>
          </div>

          {/* Sizes */}
          <div>
            <h4 className="font-medium text-gray-800 dark:text-white mb-1">Size:</h4>
            <div className="flex gap-2">
              {["XS", "S", "M", "L", "XL"].map((size) => (
                <button
                  key={size}
                  className={`px-3 py-1 border rounded ${size === "M"
                      ? "bg-blue-900 text-white"
                      : "text-gray-800 dark:text-white border-gray-300"
                    }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity & Buy Now */}
          <div className="flex gap-3 items-center">
            <div className="flex items-center border rounded overflow-hidden">
              <button className="px-3 py-2 text-xl">-</button>
              <span className="px-4 py-2">2</span>
              <button className="px-3 py-2 text-xl">+</button>
            </div>

            <div className="flex items-center justify-between mt-5 gap-4">
              <button
                onClick={addToCart} className="bg-blue-900 text-white px-6 py-3 rounded hover:bg-blue-800 w-full max-w-[160px]">

                {isLoad ? <i className="fa-solid fa-spin fa-spinner text-white"></i> : "Buy Now"}
              </button>

              <button className="text-2xl text-gray-700 dark:text-white">
                <i className="fa-regular fa-heart" />
              </button>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="border p-4 rounded-lg space-y-3 mt-4">
            <div className="flex items-start gap-3">
              <i className="fa-solid fa-truck text-2xl mt-1" />
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-white">Free Delivery</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Enter your postal code for Delivery Availability
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <i className="fa-solid fa-rotate-left text-2xl mt-1" />
              <div>
                <h5 className="font-semibold text-gray-800 dark:text-white">Return Delivery</h5>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Free 30 Days Delivery Returns. <span className="underline cursor-pointer">Details</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default ProductDetails;
