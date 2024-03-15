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
    <div><b>Error 404: Page under construction</b></div>
    </main>
  );
}

export default Profile;