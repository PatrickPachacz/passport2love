import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Flex,
} from "@chakra-ui/react";
import ReactCountryFlag from 'react-country-flag';

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  

  function calculateAge(dateOfBirth) {
    const diff = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  }
  
  const userAge = calculateAge(new Date(user.dob));
 
  
  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton d={{ base: "flex" }} icon={<ViewIcon />} onClick={onOpen} />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="410px">
          <ModalHeader
            fontSize="40px"
            fontFamily="Work sans"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            d="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Flex alignItems="center" justifyContent="center" mb={4}>
              <Image
                borderRadius="full"
                boxSize="150px"
                src={user.pic}
                alt={user.name}
              />
            </Flex>
            
            <Text 
              fontSize={{ base: "20px", md: "20px" }}
              fontFamily="Work sans"
              textAlign="center">
              Country: {user.country}
            </Text>
            <Text
              fontSize={{ base: "18px", md: "20px" }}
              fontFamily="Work sans"
              textAlign="center">
              Age: {userAge}
            </Text>

            <Text
              fontSize={{ base: "18px", md: "20px" }}
              fontFamily="Work sans"
              textAlign="center">
              Gender: {user.gender}
            </Text>

            <Text
              fontSize={{ base: "18px", md: "20px" }}
              fontFamily="Work sans"
              textAlign="center">
              Looking for (Gender): {user.genderPreference}
            </Text>

           <div>
              <ReactCountryFlag className="flag" countryCode={user.country} svg style={{ top: "0%", left: "0%", width: "100%", height: "100%" }} />
           </div>

          </ModalBody>
          
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
