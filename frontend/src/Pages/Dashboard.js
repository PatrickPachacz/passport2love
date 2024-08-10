import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import ReactCountryFlag from 'react-country-flag';
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";
import PopupModal from '../components/miscellaneous/PopupModal'; // Adjust import path

export default function Dashboard() {
  const [search] = useState('');
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [country, setCountry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, chats, setChats } = ChatState();
  const [currentPage, setCurrentPage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const CardsPerPage = 1;
  const totalPages = Math.ceil(searchResult.length / CardsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const startIndex = currentPage * CardsPerPage;
  const endIndex = Math.min(startIndex + CardsPerPage, searchResult.length);
  const usersToShow = searchResult.slice(startIndex, endIndex);

  const toast = useToast();
  const { onClose } = useDisclosure();
  const navigate = useNavigate();

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  const handleCountryChange = (countryCode) => {
    setCountry(countryCode);
    setIsModalOpen(false);
  };

  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
  };

  const handleMaxAgeChange = (event) => {
    setMaxAge(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!search && !gender && !minAge && !maxAge && !country) {
      toast({
        title: "Please enter search criteria",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const params = {
        search,
        gender,
        minAge,
        maxAge,
        country,
      };

      const { data } = await axios.get(
        'https://passport2love.onrender.com/api/user',
        {
          params,
          ...config,
        }
      );

      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load search results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    } finally {
      setLoading(false);
    }
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    return age;
  };

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

  return (
    <main>
      <div className="imageWrapper">
        <div style={{ width: "100%" }}>
          {user && <SideDrawer />}
        </div>
      </div>

      <div className="container">
        <form className="searchBar" onSubmit={handleSubmit}>
          <label className="labelMatches" htmlFor="gender">
            Select a gender:
          </label>
          <select id="gender" value={gender} onChange={handleGenderChange}>
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="labelMatches" htmlFor="country">
            Select a country:
          </label>
          <button type="button" onClick={() => setIsModalOpen(true)}>
            {country || "Select a country"}
          </button>

          <label className="labelMatches" htmlFor="minAge">
            Minimum Age:
          </label>
          <input
            type="number"
            id="minAge"
            value={minAge}
            onChange={handleMinAgeChange}
            placeholder="Min Age"
          />

          <label className="labelMatches" htmlFor="maxAge">
            Maximum Age:
          </label>
          <input
            type="number"
            id="maxAge"
            value={maxAge}
            onChange={handleMaxAgeChange}
            placeholder="Max Age"
          />
          <button type="submit">Submit</button>
        </form>

        <PopupModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          selectedCountry={country}
          onSelectCountry={handleCountryChange}
        />

        {loading ? (
          <p>Loading...</p>
        ) : searchResult.length > 0 ? (
          <div className="user-cards-container">
            <ul className="user-list">
              {usersToShow.map((user) => (
                <li key={user._id} className="user-card">
                  <div className="card-content">
                    <div className="user-info">
                      <div className="user-image">
                        {user.pic ? (
                          <Image
                            width="700px"
                            height="400px"
                            src={user.pic}
                          />
                        ) : (
                          <Image
                            width="400px"
                            height="400px"
                            borderRadius="100%"
                            src={user.gender === 'male' ? "./images/avatarman.jpg" : "./images/avatarwoman.jpg"}
                            alt="Default Avatar"
                          />
                        )}
                      </div>

                      <div className="info">
                        <h2>Name: {user.name}</h2>
                        <h2>Country: {user.country}</h2>
                        <h2>Age: {calculateAge(user.dob)}</h2>
                        <h2>Gender: {user.gender}</h2>
                        <h2>Looking for: {user.genderPreference}</h2>
                        <Link to={`/Profile/${user._id}`}>
                          <Button
                            colorScheme="blue"
                            variant="outline"
                            marginTop="10px"
                          >
                            View Profile
                          </Button>
                        </Link>
                        <Button
                          colorScheme="blue"
                          variant="outline"
                          marginTop="10px"
                          marginLeft="10px"
                          onClick={() => accessChat(user._id)}
                          isLoading={loadingChat}
                          disabled={loadingChat}
                        >
                          {loadingChat ? "Accessing Chat" : "Access Chat"}
                        </Button>
                      </div>
                      <ReactCountryFlag
                        countryCode={user.country}
                        svg
                        className="flagMatches2"
                        style={{ width: "125px", height: "100px" }}         
                      />
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className="navigation-buttons">
                <div>
                  {currentPage > 0 && <Button colorScheme="blue" onClick={prevPage}>Previous</Button>}
                </div>
                <div>
                  {currentPage < totalPages - 1 && <Button colorScheme="blue" onClick={nextPage} marginLeft="80px">Next</Button>}
                </div>
              </div>
            )}
          </div>
        ) : (
          <p>Search here</p>
        )}
      </div>
    </main>
  );
}
