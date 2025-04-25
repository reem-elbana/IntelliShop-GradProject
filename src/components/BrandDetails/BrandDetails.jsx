import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";
import { CircleLoader } from "react-spinners";

export default function BrandDetails() {
  const { id } = useParams();

  const getBrandDetails = async () => {
    const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`);
    return data;
  };

  const { data, isLoading } = useQuery(['brandDetails', id], getBrandDetails);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center bg-[#0A1172] dark:bg-gray-900">
        <CircleLoader color="#fff" size={50} speedMultiplier={2} />
      </div>
    );
  }

  // Access the brand data from the data.data object
  const brand = data?.data;

  if (!brand) {
    return <div>Brand not found</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-white px-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl max-w-sm w-full text-center">
        <img
          src={brand.image}
          alt={brand.name}
          className="w-32 h-32 mx-auto object-contain rounded-full border-4 border-gray-200 shadow-md mb-4"
        />
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{brand.name}</h2>
        <p className="text-gray-500 text-sm">
          This is one of our premium brands in the store. Check back soon for more info!
        </p>
      </div>
    </div>
  );
}