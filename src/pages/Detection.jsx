import React, { useState } from "react";
import axios from "axios";
import Loading from "../components/loading/Loading";
import useAuth from "../hook/useAuth";

const Detection = () => {
  const {user} = useAuth()
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false); // For loading state
  const [error, setError] = useState(null); // For error state
  const [predictedResult, setPredictedResult] = useState("");
  const [lang, setLang] = useState("EN");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result); // Set the image preview
      };
      reader.readAsDataURL(file); // Read the file as a Data URL
    }
  };

  const handleImageUpload = async () => {
    if (!image) {
      alert("Please upload an image first!");
      return;
    }

    // Convert base64 image to blob
    const base64Data = image.split(",")[1]; // Get the base64 string (remove 'data:image/jpeg;base64,' prefix)
    const byteCharacters = atob(base64Data);
    const byteArray = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteArray[i] = byteCharacters.charCodeAt(i);
    }

    // Create the form data
    const formData = new FormData();
    const blob = new Blob([byteArray], { type: "image/jpeg" }); // Blob the base64 string into an image file
    formData.append("image", blob, "image.jpg"); // Append the image file to formData

    try {
      setLoading(true); // Start loading
      const response = await axios.post(
        "https://api.empowernextgenbd.com/imgbb.php",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response) {
        // console.log("API Response:", response.data.data.display_url);
        sendModelApi(response.data.data.display_url);
      }
    } catch (error) {
      // console.error("Error uploading image:", error);
      setError("Failed to upload image");
    }
    // finally {
    //   setLoading(false); // End loading
    // }
  };

  const sendModelApi = async (image_url) => {
    // console.log({ image_url });
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_serverApi}/predict-image`,
        {
          user_name: user?.displayName,
          user_email: user?.email,
          image_url: image_url,
        }
      );

      // console.log(response.data); // Log the response data
      setPredictedResult(response.data);
    } catch (error) {
      console.error("Error sending image URL to API:", error);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="min-h-screen max-w-screen-2xl mx-auto lg:flex gap-10 px-5 py-10">
      <div className="lg:w-1/2">
        <div className="relative">
          <label
            htmlFor="image-upload"
            className="cursor-pointer flex items-center justify-center w-full h-96 bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl hover:bg-gray-200 transition duration-300"
          >
            {image ? (
              <img
                src={image}
                alt="Preview"
                className="w-full h-96 object-cover rounded-xl"
              />
            ) : (
              <span className="text-center text-gray-500">Upload Image</span>
            )}
          </label>
          <input
            type="file"
            id="image-upload"
            accept="image/*"
            onChange={handleImageChange}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div className="mt-4 text-center">
          {image && (
            <>
              <button
                onClick={() => setImage(null)}
                className="py-2 px-4 cursor-pointer bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Remove Image
              </button>
              <span> </span>
              <button
                onClick={handleImageUpload}
                disabled={loading}
                className={`cursor-pointer mt-4 py-2 px-4 ${
                  loading ? "bg-gray-400" : "bg-blue-500"
                } text-white rounded-lg hover:bg-blue-600`}
              >
                {loading ? "Uploading..." : "Upload Image"}
              </button>
              {error && <div className="mt-2 text-red-500">{error}</div>}
            </>
          )}
        </div>
      </div>
      {loading ? <Loading /> : ""}
      {/* output  */}
      <div className="lg:w-1/2 bg-gray-50/50 p-5 rounded-2xl shadow mt-10 lg:mt-0">
        <h1 className="text-center font-semibold text-2xl underline">
          Result & Suggestion
        </h1>
        <div className="pt-10">
          <h2>
            <span className="font-semibold">Predicted Disease:</span>
            <span className="pl-2">{predictedResult?.predicted_class}</span>
          </h2>

          {/* Language Toggle Button */}
          <div className="flex justify-between items-center mb-4">
          <p className="font-semibold pt-5 pb-2">Suggestion: </p>
            <button
              onClick={() => setLang(lang === "EN" ? "BN" : "EN")}
              className="cursor-pointer px-3 py-1 border text-[#00BDE0] border-[#00BDE0] rounded-lg hover:text-white hover:bg-[#00BDE0] transition"
            >
              {lang === "EN" ? "বাং" : "EN"}
            </button>
          </div>
          {/* Conditional Content */}
          <p>
            {lang === "EN" ? predictedResult?.english : predictedResult?.bangla}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Detection;
