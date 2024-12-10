import React, { useEffect, useState } from 'react';
import { ChatState } from '../Context/ChatProvider';
import { useToast } from '@chakra-ui/toast';
import { Box, Stack, Text, Flex, Button } from '@chakra-ui/react';
import ChatLoading from './ChatLoading';
import { getSender } from '../config/ChatLogics';
import axios from 'axios';

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState(null);
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get('https://passport2love.onrender.com/api/chat', config);

      // Filter out chats marked as deleted
      const nonDeletedChats = data.filter((chat) => !chat.deleted);
      setChats(nonDeletedChats);
    } catch (error) {
      toast({
        title: 'Error Occurred!',
        description: 'Failed to Load the chats',
        status: 'error',
        duration: 5000,
        isClosable: true,
        position: 'bottom-left',
      });
    }
  };

  const handleDeleteChat = async (chatId) => {
    const confirmation = window.confirm('Are you sure you want to delete this chat?');
  
    if (confirmation) {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        };
  
        // Mark the chat as deleted on the server
        await axios.delete(`https://passport2love.onrender.com/api/chat/${chatId}`, config);
  
        // Update the client-side state to reflect the deletion
        const updatedChats = chats.filter((chat) => chat._id !== chatId); // Remove the deleted chat from the state
  
        setChats(updatedChats);
  
        toast({
          title: 'Chat Deleted',
          description: 'The chat has been permanently deleted.',
          status: 'success',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      } catch (error) {
        toast({
          title: 'Error Occurred!',
          description: 'Failed to delete the chat.',
          status: 'error',
          duration: 5000,
          isClosable: true,
          position: 'bottom-left',
        });
      }
    }
  };

  useEffect(() => {
    const userFromLocalStorage = JSON.parse(localStorage.getItem('userInfo'));
    setLoggedUser(userFromLocalStorage);
    fetchChats(); // Include fetchChats as a dependency
  }, []);

  return (
    <Box
      display={{ base: selectedChat ? 'none' : 'flex', md: 'flex' }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: '100%', md: '30%' }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={5}
        fontSize={{ base: '17px', md: '20px' }}
        fontFamily="Work sans"
        display="flex"
        w="100%"
        justifyContent="space-between"
        alignItems="center"
      >
        My Chats
      </Box>
      <Box
        display="flex"
        flexDir="column"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="85%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => setSelectedChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? '#38B2AC' : '#E8E8E8'}
                color={selectedChat === chat ? 'white' : 'black'}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Flex justifyContent="space-between" alignItems="center">
                  <Text>
                    {!chat.isGroupChat && loggedUser
                      ? getSender(loggedUser, chat.users)
                      : chat.chatName}
                  </Text>
                  <Button
                    colorScheme="red"
                    size="sm"
                    onClick={() => handleDeleteChat(chat._id)}
                  >
                    Delete
                  </Button>
                </Flex>
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
