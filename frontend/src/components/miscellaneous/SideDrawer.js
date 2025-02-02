import { Button } from "@chakra-ui/button";
import { Badge } from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text, Flex } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon } from "@chakra-ui/icons";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../UserAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";

function SideDrawer() {
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  const {
    setSelectedChat,
    user,
    chats,
    setChats,
    notification,
    setNotification,
    setSelectedUser,
  } = ChatState();

  console.log(user);

  const navigateToChats = () => {
    navigate("/chats");
  };

  const navigateToChat = (chat) => {
    setSelectedChat(chat);
    setNotification(notification.filter((n) => n.chat._id !== chat._id));
    navigate("/chats"); // Navigate to the chat page
  };

  const navigateToProfile = () => {
    navigate(`/Profile/${user._id}`);
  };

  const navigateToEditProfile = () => {
    navigate(`/EditProfile/${user._id}`);
  };


  const navigate = useNavigate();
  const location = useLocation();

const navigateToDashboard = () => {
  if (location.pathname === "/dashboard") {
    window.location.reload();
  } else {
    navigate("/dashboard");
  }
};

  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please enter something in the search",
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

      const { data } = await axios.get(`https://passport2love.onrender.com/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error occurred!",
        description: "Failed to load the search results",
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
      const { data } = await axios.post("https://passport2love.onrender.com/api/chat", { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
    
      setSelectedUser(data.users.find((u) => u._id === userId));
      setLoadingChat(false);
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
    }
  };

  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      bg="rgba(227, 226, 222)"
      p="10px 30px"
      color="white"
      borderWidth="5px"
      flexWrap="wrap"
      border="1px solid black"
      backgroundColor="black"
    >
    
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button variant="ghost" color="white" onClick={onOpen} _hover={{ color: 'gray' }} _active={{ backgroundColor: 'black' }}>
            <i className="fas fa-search"></i>
            <Text d={{ base: "none", md: "flex" }} px={2} marginTop="10px">
              Search User
            </Text>
          </Button>
        </Tooltip>
  
        <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
          <DrawerOverlay />
          <DrawerContent>
            <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
            <DrawerBody>
              <Box d="flex" pb={2} alignItems="center">
                <Input
                  placeholder="Search by name or email"
                  mr={2}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                <Button onClick={handleSearch} ml="auto">
                  Go
                </Button>
              </Box>
              {loading ? (
                <ChatLoading />
              ) : (
                searchResult?.map((user) => (
                  <UserListItem
                    key={user._id}
                    user={user}
                    handleFunction={() => accessChat(user._id)}
                  />
                ))
              )}
  
              {loadingChat && <Spinner ml="auto" d="flex" />}
            </DrawerBody>
          </DrawerContent>
        </Drawer>
  
        <Button
          variant="ghost"
          color="white"
          onClick={navigateToChats}
          _hover={{ color: 'gray' }}
          ml={2}
          _active={{ backgroundColor: 'black' }}
        >
          <Text d={{ base: "none", md: "flex" }} px={4} marginTop="10px">
            Go to Chats
          </Text>
        </Button>
      
  
      <Flex alignItems="center" justifyContent="center" flex="1" color="black">
        <Button
          variant="ghost"
          onClick={navigateToDashboard}
          ml={-24}
          _active={{ backgroundColor: 'black' }}
          _hover={{ backgroundColor: 'black' }}
          backgroundColor="black"
        >
          <Text
            fontSize="25px"
            fontFamily="Dancing Script"
            px={5}
            color= 'white'
            _hover={{ color: 'gray' }}
            
          >
            Passport2Love
          </Text>
        </Button>
      </Flex>
  
  
        <Button
          variant="ghost"
          color="white"
          onClick={navigateToProfile}
          _hover={{ color: 'gray' }}
          mr={2}
          _active={{ backgroundColor: 'black' }}
        >
          {user ? (
            <Link to={`/Profile/${user._id}`}>
              <Text d={{ base: "none", md: "flex" }} px={2} marginTop="10px">
                View Profile
              </Text>
            </Link>
          ) : null}
        </Button>
  
        <div>
          <Menu>
            <MenuButton p={1}>
            {notification.length > 0 && (
            <Badge
              colorScheme="red"  
              fontSize="0.8em"   
              borderRadius="full"
              px={2}
              py={1}
              position="relative"
              top="-8px"
              right="-8px"
            >
              {notification.length}
            </Badge>
          )}
              <BellIcon fontSize="2xl" m={1} />
            </MenuButton>
            <MenuList color="purple" bg="white" pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                   onClick={() => navigateToChat(notif.chat)} 
              >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
              <MenuDivider />
              <MenuItem color="black" bg="white" onClick={navigateToEditProfile}>
                Edit Profile
              </MenuItem>
              <MenuItem color="black" bg="white" onClick={logoutHandler}>
                Logout
              </MenuItem>
            </MenuList>
          </Menu>
        </div>
  
    </Flex>
  );
  
  
}  

export default SideDrawer;
