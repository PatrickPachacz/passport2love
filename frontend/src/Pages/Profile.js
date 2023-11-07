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
      }, 25); // Adjust the delay (in milliseconds) to control the typing speed
      return () => clearTimeout(timeoutId);
    }
  }, [typedText, currentIndex, textToType]);

  //const handleStartChat = async () => {
  //  try {
    //  setLoadingChat(true);
    //  const config = {
      //  headers: {
        //  "Content-type": "application/json",
      //    Authorization: `Bearer ${user.token}`,
    //    },
    //  };

   //   const { data } = await axios.post(
    //    '/api/chat',
    //    { userId: id },
    //    config
    //  );

      // You can handle chat creation success here
  //    console.log("Chat created:", data);

    //  setLoadingChat(false);
   // } catch (error) {
      // Handle chat creation error here
    //  console.error("Error creating chat:", error);
   //   setLoadingChat(false);
  //  }
 // };

  return (
    <main>
      <div style={{ width: "100%" }}>
        <SideDrawer />
      </div>

      <img
        src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
        className="imageHome"
        alt=""
      />

      <div
        className="profileInfo"
        style={{
          maxWidth: "800px",
          margin: "0 auto",
          background: "black",
          padding: "20px",
          borderRadius: "4px",
          marginTop: "30px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          opacity: "0.9"
        }}
      >
        <h1>Profile</h1>
        <p style={{ margin: "10px 0" }}>Name: {name}</p>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Image
            borderRadius="15%"
            boxSize="300px"
            src={pic}
            alt={name}
            style={{ margin: "10px 0" }}
          />
          <ReactCountryFlag
            className="flag"
            countryCode={country}
            svg
            style={{
              width: "auto",
              height: "100%",
              opacity: 0.9,
              position: "relative", // Add this line
              zIndex: -1, // Add this line
            }}
          />
        </div>
        <div
          className="profileInfo2"
          style={{
            maxWidth: "250px",
            margin: "0 auto",
            background: "black",
            padding: "60px", // Adjust padding as needed
            borderRadius: "4px",
            border: "1px solid white",
            position: "relative",
            marginTop: "50px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <p style={{ margin: "10px 0" }}>{typedText}</p>
        </div>
        {video ? (
          <Box mt={3}>
            <video width="40%" style={{ margin: "90px 0" }} controls className="videoContainer">
              <source src={video} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </Box>
        ) : (
          <Box mt={3} height="400px" />
        )}
       <Button  
        colorScheme="blue"
        variant="outline"
        marginTop="2px" onClick={() => accessChat(user._id)}>Message</Button>
      </div>
    </main>
  );
}

export default Profile;
