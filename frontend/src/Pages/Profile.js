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


  console.log(user);

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
    <div style={{ width: "100%" }}>
      <SideDrawer />
    </div>

    <img
      src=""
      className="imageHome"
      alt=""
    />

<div
        style={{
          position: "relative",
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          columnGap: "120px",
          maxWidth: "1000px",
          margin: "100px auto",
        }}
      >
        {/* Left Column: Profile Image and Name */}
        <div>
          <Image borderRadius="15%" boxSize="200px" src={pic} alt={name} style={{ margin: "50px 0" }} />
          <strong style={{ fontSize: "42px", fontFamily: "'Dancing Script', cursive" }}>{name}</strong>
        </div>

        {/* Middle Column: Country Flag and User Info */}
        <div>
          <ReactCountryFlag
            className="flag"
            countryCode={country}
            svg
            style={{
              width: "auto",
              height: "70%",
              opacity: 0.9,
              position: "relative",
              zIndex: -1,
              fontFamily: "'Dancing Script', cursive", 
            }}
          />
          <p style={{ fontSize: "35px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Age: {age}</strong>
          </p>
          <p style={{ fontSize: "35px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Country: {country}</strong>
          </p>
          <p style={{ fontSize: "35px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Gender: {gender}</strong>
          </p>
          <p style={{ fontSize: "35px", fontFamily: "'Dancing Script', cursive" }}>
            <strong>Interested in: {genderPreference}</strong>
          </p>
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
    </main>
  );
}

export default Profile;