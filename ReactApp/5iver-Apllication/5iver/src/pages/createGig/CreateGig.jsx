import { useState } from "react";
import "./CreateGig.css";
import Navbar from "../../components/navBarfolder/NavBar";
import { createGig } from "../../api/Gigs";
import { useNavigate } from "react-router";

function CreateGig() {
  const [gigTitle, setGigTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
                                                                  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      gigTitle,
      category,
      price,
      description,
      image,
    });
    try {
      const response = await createGig({
        gigTitle,
        category,
        price,
        description, 
        image
      });
      console.log(response);
      setResponse(response.data.message);
      setGigTitle("");
      setCategory("");
      setDescription("");
      setImage(null);
      setPrice("");
      setImagePreview(null);

      navigate();
    } catch (err) {
      console.error(err);
      setError("An error occured")

    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      console.log(base64String);
      setImage(base64String);
    }

  if (file) {
    reader.readAsDataURL(file);
    setImagePreview(URL.createObjectURL(file));
  }
};


  return (
    <>
      <Navbar isAuthenticated={true} role="seller" />

      <div className="create-gig-container">
        <h2>Create a New Gig</h2>

        <form onSubmit={handleSubmit} className="create-gig-form">
          <label>Gig Title</label>
          <input
            type="text"
            placeholder="Build a website"
            value={gigTitle}
            onChange={(e) => setGigTitle(e.target.value)}
            required
          />

          <label>Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select category</option>
            <option value="Web_Development">Web Development</option>
            <option value="Design">Design</option>
            <option value="Writing">Writing</option>
            <option value="Video_Editing">Video_Editing</option>
            <option value="Marketing">Marketing</option>
          </select>

          <label>Price ($)</label>
          <input
            type="number"
            placeholder="50"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />

          <label>Description</label>
          <textarea
            placeholder="Describe your service..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows="5"
            required
          />
          <label>Gig Image</label>
          <input type="file" accept="image/*" onChange={handleImageChange} />

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Gig Preview"
              className="gig-image-preview"
            />
          )}

          <button type="submit" className="create-btn">
            Create Gig
          </button>
          {error && <p>{error}</p>}
          {response && <p>{response}</p>}
        </form>
      </div>
    </>
  );
}

export default CreateGig;
