import { useEffect, useState } from "react";
import useAuth from "../hook/useAuth";
import axios from "axios";
import Loading from "../components/loading/Loading";

const Profile = () => {
  const { user } = useAuth();
  const [predictedDatas, setPredictedDatas] = useState([]);
  const [selectedData, setSelectedData] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true); // Start loading
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_serverApi}/all-detected-image?email=${
            user?.email
          }`
        );
        console.log(response.data);
        if (response) {
          setPredictedDatas(response.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false); // End loading
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleDetailsClick = (predictedData) => {
    setSelectedData(predictedData);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedData(null);
  };

  return (
    <div className="max-w-screen-2xl min-h-screen mx-auto p-5">
      <h1 className="text-3xl font-semibold mb-5 border-b text-gray-700 border-gray-300 pb-2">
        Welcome back,{" "}
        <span className="text-[#0aa7c3]">{user?.displayName}</span>
      </h1>

      {/* Loading Spinner */}
      {loading ? (
        <div className="flex justify-center items-center min-h-[200px]">
          <Loading/>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {predictedDatas.length === 0 ? (
            <div className="col-span-full text-center text-xl font-semibold">
              No images found
            </div>
          ) : (
            predictedDatas.map((predictedData, index) => {
              return (
                <div key={index} className="relative group w-full p-2">
                  <img
                    src={predictedData.image_url}
                    alt={`predicted-image-${index}`}
                    className="w-full h-56 object-cover rounded-lg transition-all duration-300"
                  />

                  {/* Hover effect to show "Details" button */}
                  <div className="absolute inset-0 flex justify-center items-center bg-gray-400/60 bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button
                      onClick={() => handleDetailsClick(predictedData)}
                      className="px-4 py-2 bg-white text-black rounded-lg hover:bg-gray-200 transition cursor-pointer"
                    >
                      Details
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex justify-center items-center bg-black/60 bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-5 max-w-3xl w-full">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Predicted Details</h2>
              <button
                onClick={handleCloseModal}
                className="text-black hover:text-black/90 text-2xl cursor-pointer"
              >
                X
              </button>
            </div>

            <div className="mt-5 max-h-[500px] overflow-y-auto">
              <img
                src={selectedData.image_url}
                alt="Selected Image"
                className="w-full h-64 object-cover rounded-lg"
              />
              <div className="mt-3">
                <p>
                  <strong>User Name:</strong> {selectedData.user_name}
                </p>
                <p>
                  <strong>Predicted Class:</strong>{" "}
                  {selectedData.predicted_class}
                </p>
                <div className="mt-3">
                  <h3 className="font-semibold">English Instructions:</h3>
                  <p>{selectedData.english}</p>
                  <h3 className="font-semibold mt-3">Bangla Instructions:</h3>
                  <p>{selectedData.bangla}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
