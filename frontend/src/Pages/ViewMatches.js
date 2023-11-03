import { useState } from "react";
import { Input } from "@chakra-ui/input";
import { Button } from "@chakra-ui/button";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import { ChatState } from "../Context/ChatProvider";
import ReactCountryFlag from 'react-country-flag';
import ReactFlagsSelect from 'react-flags-select';
import { Link } from "react-router-dom"
import { Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDisclosure } from "@chakra-ui/hooks";

function ViewMatches() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [minAge, setMinAge] = useState("");
  const [maxAge, setMaxAge] = useState("");
  const [country, setCountry] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const { setSelectedChat, user, setUser, chats, setChats } = ChatState();

  
  const toast = useToast();
  const { onClose } = useDisclosure();
  const navigate = useNavigate();

  const navigateToChats = () => {
    navigate("/chats");
  };

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

      const { data } = await axios.get("https://passport2love.onrender.com/api/user", {
        params,
        ...config,
      });

      setLoading(false);
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
    }
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

  return (
    <main>
      <div className="imageWrapper">
        <img
          src="https://images.pexels.com/photos/592753/pexels-photo-592753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          className="imageHome"
          alt="Background"
        />
        
        
      </div>
      <h1>View Matches</h1>
      <p>Select filters:</p>
      <form className="formMatches" onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>
      </form>

      <h2>Matched Users:</h2>
      {searchResult.length > 0 ? (
        <ul className="user-list">
        {searchResult.map((user) => (
          <li key={user.id} className="user-card">
            <div className="user-info">
              <span className="username">Name: {user.name}</span>
              <span className="country">Country: {user.country}</span>
            </div>
            <div className="user-picture">
              <Image
                borderRadius="10%"
                boxSize="200px"
                opacity="0.9"
                src={user.pic}
              />
            </div>
            <ReactCountryFlag
              countryCode={user.country}
              svg
              className="flagMatches"
            />
            <Button onClick={() => accessChat(user._id)}>Message</Button>
          </li>
        ))}
      </ul>
      
      ) : (
        <p>No users found.</p>
      )}
    </main>
  );
}

export default ViewMatches;
