import React, { useState, useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { useParams } from "react-router-dom";
import { ChatState } from "../Context/ChatProvider";

const EditProfile = () => {
  const { id } = useParams();
  const [pic, setPic] = useState("");
  const [video, setVideo] = useState("");
  const [setPicModified] = useState(false);
  const [setVideoModified] = useState(false);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = ChatState();

  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`https://passport2love.onrender.com/api/user/${id}`);
        const userData = response.data;
        setName(userData.name);
        setPic(userData.pic);
        setVideo(userData.video);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, [id]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dyk0onjht");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk0onjht/image/upload",
        formData
      );
      const imageUrl = response.data.url;
      setPic(imageUrl);
      setPicModified(true); // Flag to indicate modification
      setLoading(false);
      toast({
        title: "Image uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error uploading image",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleVideoUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "chat-app");
    formData.append("cloud_name", "dyk0onjht");

    try {
      setLoading(true);
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dyk0onjht/video/upload",
        formData
      );
      const videoUrl = response.data.url;
      setVideo(videoUrl);
      setVideoModified(true); // Flag to indicate modification
      setLoading(false);
      toast({
        title: "Video uploaded successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error uploading video",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };


  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setLoading(true);
      const updatedData = {
        name: name,
        pic: pic,
        video: video,
      };

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      await axios.put(`https://passport2love.onrender.com/api/user/${id}`, updatedData, config);
      setLoading(false);
      toast({
        title: "Profile updated successfully",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate(`/profile/${id}`);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast({
        title: "Error updating profile",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const isOwnProfile = user._id === id;

  return (
    <div>
      <img
        src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="imageHome"
        alt="background"
        style={{ width: "100%" }}
      />

      <SideDrawer />
      {isOwnProfile ? (
        <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "0 auto", background: "#fff", padding: "20px", borderRadius: "4px", marginTop: "30px" }}>
          <FormControl id="name" marginBottom="10px">
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>

          <FormControl id="pic" marginTop="10px">
            <FormLabel>Upload your Picture</FormLabel>
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={handleImageUpload}
            />
          </FormControl>

          {loading && <div>Uploading image...</div>}
          {pic && <img src={pic} alt="Profile" style={{ marginBottom: "10px" }} />}

          <FormControl id="video" marginBottom="10px">
            <FormLabel>Video</FormLabel>
            <Input
              type="file"
              accept="video/mp4"
              onChange={handleVideoUpload}
            />
          </FormControl>

          {loading && <div>Uploading video...</div>}
          {video && (
            <video width="320" height="240" controls style={{ marginBottom: "10px" }}>
              <source src={video} type="video/mp4" />
            </video>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              backgroundColor: "#3182ce",
              color: "#fff",
              padding: "10px 20px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </form>
      ) : (
        <div>
          <p>This is someone else's profile. You are not allowed to edit it.</p>
          {/* Display other profile information here */}
        </div>
      )}
    </div>
  );
};

export default EditProfile;
