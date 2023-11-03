import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";
//import { ChatState } from "../../Context/ChatProvider";

const UserListItem = ({ user, handleFunction }) => {
    
  function calculateAge(dateOfBirth) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  const userAge = calculateAge(new Date(user.dob));

  return (
    <Box
      onClick={handleFunction}
      cursor="pointer"
      bg="#E8E8E8"
      _hover={{
        background: "#38B2AC",
        color: "white",
      }}
      w="100%"
      d="flex"
      alignItems="center"
      color="black"
      px={3}
      py={2}
      mb={2}
      borderRadius="lg"
    >
      
      <Avatar
        mr={2}
        size="lg"
        cursor="pointer"
        name={user.name}
        src={user.pic}
      />
      <Box>
        <Text>{user.name}</Text>
        <Text fontSize="xs">
          <b>Country : </b>
          {user.country}
        </Text>
        <Text fontSize="xs">
          <b>Age : </b>
          {userAge}
        </Text>
      </Box>
    </Box>
  );
};

export default UserListItem;