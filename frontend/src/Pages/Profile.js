import React, { useEffect, useState } from "react";
import { useParams  } from "react-router-dom";
import ReactCountryFlag from "react-country-flag";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { Image, Box } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { Button } from "@chakra-ui/button";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import { useDisclosure } from "@chakra-ui/hooks";

function Profile() {
  const { id } = useParams();
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [country, setCountry] = useState("");
  const [age, setAge] = useState("");
  const [pic, setPic] = useState("");
  const [video, setVideo] = useState("");
  const { user, chats, setChats } = ChatState();
  const [setLoadingChat] = useState(false);
  const navigate = useNavigate();
  const [setSelectedUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const response = await fetch(`https://passport2love.onrender.com/api/user/${id}`);
      const data = await response.json();
      setName(data.name);
      setGender(data.gender);
      setGenderPreference(data.genderPreference);
      setCountry(data.country);
      setPic(data.pic);
      setVideo(data.video);
      setAge(calculateAge(new Date(data.dob)));
    }
    getUser();
  }, [id]);

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`https://passport2love.onrender.com/api/chat`, { userId }, config);
  
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
  
      // Set the selected user ID
      setSelectedUser(userId);
  
      setLoadingChat(false);
      onClose();
  
      // Navigate to the chat page
      navigate("/chats");
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const toast = useToast();
  const { onClose } = useDisclosure();

  function calculateAge(dateOfBirth) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }

  const textToType = `
    Age: ${age}\n
    Country: ${country}\n
    Gender: ${gender}\n
    Interested in: ${genderPreference}
  `;
  const [typedText, setTypedText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < textToType.length) {
      const timeoutId = setTimeout(() => {
        setTypedText(typedText + textToType[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, 25); 
      return () => clearTimeout(timeoutId);
    }
  }, [typedText, currentIndex, textToType]);


  return (
    <main>
      <img
        src="https://cdn.pixabay.com/photo/2021/08/18/19/23/background-6556393_1280.jpg"
        className="imageHome"
        alt="background"
        style={{ width: "100%" }}
      />
      {user && <SideDrawer />}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", // Center vertically
          padding: "20px",
          flexWrap: "wrap", // Wrap items if they exceed container width
        }}
      >
        <div style={{ flex: "1", textAlign: "center", minWidth: "200px", }}>
          <Image
            borderRadius="100px"
            width="100%"
            src={pic}
            alt={name}
            style={{ margin: "0" }}
          />
        </div>
        <div
          style={{
            flex: "1",
            textAlign: "center",
            minWidth: "200px",
            margin: "20px",
            background: "rgba(255, 255, 255, 0.384)",
            opacity: "0.9",
            borderRadius: "100px",
          }}
        >
          <strong style={{ fontSize: "40px", fontFamily: "'Dancing Script', cursive" }}>{name}</strong>
          <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Age: {age}</strong>
          </p>
          <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Country: {country}</strong>
          </p>
          <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Gender: {gender}</strong>
          </p>
          <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Interested in: {genderPreference}</strong>
          </p>
        </div>
        <div style={{ flex: "1", textAlign: "center", minWidth: "200px" }}>
          <ReactCountryFlag
            countryCode={country}
            svg
            style={{
              width: "90%",
              height: "auto",
              borderRadius: "100px",
            }}
          />
        </div>

         {/* Right Column: Video */}
         <div>
          {video ? (
            <Box mt={3}>
              <video
                width="100%"
                style={{ margin: "90px 0" }}
                controls
                className="videoContainer"
              >
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </Box>
          ) : (
            <Box mt={3} height="400px" />
          )}
        </div>

         {/* Message Button */}
      <Button
        colorScheme="blue"
        variant="outline"
        marginTop="2px"
        onClick={() => accessChat(user._id)}
        style={{ marginTop: "20px" }}
      >
        Message
      </Button>
      
      </div>
    </main>
  );
}

export default Profile;