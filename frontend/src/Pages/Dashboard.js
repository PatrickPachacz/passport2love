import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { useDisclosure } from "@chakra-ui/hooks";
import { useToast } from "@chakra-ui/toast";
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';
import { Button } from "@chakra-ui/button";
import { Image } from "@chakra-ui/react";

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [country, setCountry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const { user, chats, setChats } = ChatState();
  const [currentPage, setCurrentPage] = useState(0);
  
  const CardsPerPage = 3;
  const totalPages = Math.ceil(searchResult.length / CardsPerPage);

  // Function to handle navigation to next page
  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  // Function to handle navigation to previous page
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  // Get the subset of users to display based on current page
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
  };

  const handleMinAgeChange = (event) => {
    setMinAge(event.target.value);
  };

  const handleMaxAgeChange = (event) => {
    setMaxAge(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
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

  const getRandomUser = async () => {
    try {
      setLoading(true);
  
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
  
      const { data } = await axios.get('https://passport2love.onrender.com/api/user', {
        ...config,
      });
  
      // Check if data is an array and not empty
      if (Array.isArray(data) && data.length > 0) {
        // Select a random index within the range of data length
        const randomIndex = Math.floor(Math.random() * data.length);
        // Get the user object at the random index
        const randomUser = data[randomIndex];
  
        console.log('Random user:', randomUser);
  
        setSearchResult([randomUser]); // Set the random user as the search result
      } else {
        console.error('Error: No users found or invalid data');
      }
    } catch (error) {
      console.error('Error fetching random user:', error);
    } finally {
      setLoading(false);
    }
  };
  
  

  // Handle random user button click
  const handleRandomUserClick = () => {
    const confirmed = window.confirm("Randomly select any user. Continue?");
    if (confirmed) {
      getRandomUser();
    }
  };

  return (
    <main>
      <div className="imageWrapper">
        <img
          src="./images/backgroundblackwhite.jpg"
          alt="background"
          className="imageHome"
        />
        <div style={{ width: "100%" }}>
          {user && <SideDrawer />}
        </div>
      </div>

      <div className="container">
        <form className="formMatches" onSubmit={handleSubmit}>
          <h1>View Matches</h1>
          <Button colorScheme="blue" onClick={handleRandomUserClick}>Random</Button>
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
          <div className="react-flags-select-container">
            <ReactFlagsSelect
              name="country"
              id="country"
              searchable={true}
              required
              className="react-flags-select"
              selected={country}
              onSelect={handleCountryChange}
            />
          </div>

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

          <label className="labelMatches" htmlFor="search">
            Search by name
          </label>
          <input
            type="text"
            id="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search"
            className="inputMatches"
          />

          <button type="submit">Submit</button>
        </form>

        {loading ? (
          <p>Loading...</p>
        ) : searchResult.length > 0 ? (
          <div className="user-cards-container">
            <ul className="user-list">
            {usersToShow.map((user) => (
              <li key={user._id} className="user-card">
               <ReactCountryFlag
                  countryCode={user.country}
                  svg
                  className="flagMatches"
                  style={{ width: "300px", height: "250px" }}
                />
    <ReactCountryFlag
      countryCode={user.country}
      svg
      className="flagMatches2"
      style={{ width: "50px", height: "25px" }}
    />
    {user.pic ? (
      <Image
        marginTop="0px"
        marginLeft="0px"
        width="100%"
        height="50%"
        borderRadius="0%"
        opacity="0.9"
        src={user.pic}
      />
    ) : (
      <Image
        marginTop="-10px"
        marginLeft="40px"
        width="70%"
        height="50%"
        borderRadius="45%"
        opacity="0.9"
        src="./images/avatar.jpg"
        alt="Default Avatar"
      />
    )}
    <div style={{ marginTop: "10px", marginLeft: "10px", fontFamily: "'Dancing Script', cursive" }}>
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
          marginLeft="20px"
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
  </li>
))}
</ul>

{totalPages > 1 && (
  <div className="navigation-buttons">
    <div>
      {currentPage > 0 && <Button colorScheme="blue" onClick={prevPage}>Previous</Button>}
    </div>
    <div>
      <Button colorScheme="blue" onClick={nextPage} disabled={currentPage === totalPages - 1} marginTop="20px">Next</Button>
    </div>
  </div>
)}
</div>
) : (
<p>Searching...</p>
)}

    </div>
    </main>
  );
}
