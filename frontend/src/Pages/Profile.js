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
import useIntersectionObserver from '../hooks/useIntersectionObserver';

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
  const navigate = useNavigate();
  const [loadingChat, setLoadingChat] = useState(false);
  

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

  const isVisible = useIntersectionObserver({ target: ".observable-div" });

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.post(
        'https://passport2love.onrender.com/api/chat',
        { userId },
        config
      );

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);

      onClose();

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
    } finally {
      setLoadingChat(false);
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
  {user && <SideDrawer />}
  <div
    style={{
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "20px",
      flexWrap: "wrap",
      borderTop: "1px solid black"
    }}
  >

    {/* User Image */}
    
    <div style={{ textAlign: "center" }}>
      <div style={{ display: "inline-block", position: "relative" }}>
        <Image
          width="100%"
          maxWidth={2000}
          src={pic}
          alt={name}
          style={{ borderRadius: "5%" }}
        />
      </div>
    </div>
  

     {/* Description */}
     <div
      className={`observable-div ${isVisible ? "fade-in" : ""}`}
      style={{
        flex: "1",
        textAlign: "center",
        minWidth: "50px",
        margin: "5px",
        background: "rgba(255, 255, 255, 0.384)",
        opacity: "0.9",
        borderRadius: "50px",
        border: "1px solid black"
      }}
    >
      <strong style={{ fontSize: "40px", fontFamily: "'Dancing Script', cursive" }}>{name}</strong>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", margin: "10px 0" }}>
        <ReactCountryFlag
          countryCode={country}
          svg
          style={{
            width: "10%",
            height: "auto",
            border: "1px solid black",
            marginLeft: "10px"
          }}
        />
        <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive", marginLeft: "10px" }}>
          <strong>Age: {age}</strong>
        </p>
      </div>

      <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
        <strong>Country: {country}</strong>
      </p>
      <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
        <strong>Gender: {gender}</strong>
      </p>
      <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
        <strong>Interested in: {genderPreference}</strong>
      </p>

      <Button
        colorScheme="blue"
        variant="outline"
        marginTop="10px"
        marginBottom="10px"
        marginLeft="10px"
        onClick={() => accessChat(user._id)}
        isLoading={loadingChat}
        disabled={loadingChat}
      >
        {loadingChat ? "Accessing Chat" : "Access Chat"}
      </Button>
      
    </div>

    {/* Video or Placeholder */}
    <div style={{ width: '100%', maxWidth: '600px' }}>
      {video ? (
        <Box mt={3}>
          <video
            width="100%"
            style={{ marginBottom: '20px', border: "1px solid black" }}
            controls
            className="videoContainer"
          >
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </Box>
      ) : (
        <Box mt={3} textAlign="center" padding="20px" background="rgba(255, 255, 255, 0.384)" borderRadius="10px">
          <p style={{ fontSize: "20px", fontFamily: "'Dancing Script', cursive" }}>
            User has not uploaded a video.
          </p>
        </Box>
      )}
    </div>

    

  </div>
</main>

  );
  
}

export default Profile;