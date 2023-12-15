import React, { useState } from "react";
import axios from "axios";
import {
  VStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Select,
  extendTheme,
  ChakraProvider,
  Checkbox,
  Flex,
  useToast,
} from "@chakra-ui/react";
import ReactFlagsSelect from "react-flags-select";
import TermsAndConditions from "./TermsAndConditions";
import VideoConditions from "./VideoConditions";
import { useNavigate } from "react-router-dom";

const customTheme = extendTheme({
  components: {
    Select: {
      variants: {
        filled: {
          field: {
            bg: "black",
            color: "white",
          },
        },
      },
    },
  },
});

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [password, setPassword] = useState("");
  const [pic, setPic] = useState("");
  const [Loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [video, setVideo] = useState("");
  const [genderPreference, setGenderPreference] = useState("");
  const [showTerms, setShowTerms] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [showVideoConditions, setShowVideoConditions] = useState(false);

  const handleClick = () => {
    setShow(!show);
  };

  const handleVideoConditionsToggle = () => {
    setShowVideoConditions(!showVideoConditions);
  };

  const handleTermsToggle = () => {
    setShowTerms(!showTerms);
  };

  const handleCheckboxChange = () => {
    setTermsAccepted(!termsAccepted);
  };

  const toast = useToast();
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.id === "country") {
      setSelectedCountry(e.target.value);
    } else if (e.target.id === "dob") {
      setDob(e.target.value);
    }
  };

  const calculateAge = (dob) => {
    const diff = Date.now() - dob.getTime();
    const age = new Date(diff);
    return Math.abs(age.getUTCFullYear() - 1970);
  };

  const submitHandler = async () => {
    if (!termsAccepted) {
      // Display an error message or prevent submission
      return;
    }

    // Password validation regex
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;

  if (
    !name ||
    !email ||
    !password ||
    !confirmpassword ||
    !dob ||
    !password.match(passwordRegex)
  ) {
    toast({
      title: "Please fill all the fields and ensure the password is at least 6 characters and includes letters and digits.",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

  if (password !== confirmpassword) {
    toast({
      title: "Passwords do not match",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setLoading(false);
    return;
  }

    // Validate email format using a regular expression
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailPattern.test(email)) {
      toast({
        title: "Invalid Email Format",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    setLoading(true);
    if (!name || !password || !confirmpassword || !dob) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmpassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "https://passport2love.onrender.com/api/user/",
        {
          name,
          email,
          password,
          pic,
          country: selectedCountry,
          dob: dob,
          gender,
          genderPreference,
          video,
        },
        config
      );
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const postVideo = (videoFile) => {
    setLoading(true);
    if (videoFile === undefined) {
      toast({
        title: "Please select a video!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (videoFile.type === "video/mp4") {
      const data = new FormData();
      data.append("file", videoFile);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dyk0onjht");
      fetch("https://api.cloudinary.com/v1_1/dyk0onjht/video/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setVideo(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please select a video file (mp4 format)!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dyk0onjht");
      fetch("https://api.cloudinary.com/v1_1/dyk0onjht/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <ChakraProvider theme={customTheme}>
      <VStack spacing="5px">
        <FormControl id="first-name" isRequired>
          <FormLabel>Name</FormLabel>
          <Input
            placeholder="Enter Your Name"
            onChange={(e) => setName(e.target.value)}
            borderColor="black"
          />
        </FormControl>
        <FormControl id="email" isRequired>
          <FormLabel>Email</FormLabel>
          <Input
            placeholder="Enter Your Email"
            onChange={(e) => setEmail(e.target.value)}
            borderColor="black"
          />
        </FormControl>

        <FormControl id="dob" isRequired>
          <FormLabel>Date of Birth</FormLabel>
          <Input
            type="date"
            name="dob"
            id="dob"
            value={dob}
            onChange={handleChange}
            required
            max={new Date().toISOString().split("T")[0]}
            borderColor="black"
          />
          {dob && (
            <p>You are currently {calculateAge(new Date(dob))} years old.</p>
          )}
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Enter Password"
              onChange={(e) => setPassword(e.target.value)}
              borderColor="black"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" color="black" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="password" isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <InputGroup size="md">
            <Input
              type={show ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(e) => setConfirmpassword(e.target.value)}
              borderColor="black"
            />
            <InputRightElement width="4.5rem">
              <Button h="1.75rem" size="sm" color="black" onClick={handleClick}>
                {show ? "Hide" : "Show"}
              </Button>
            </InputRightElement>
          </InputGroup>
        </FormControl>

        <FormControl id="country">
          <FormLabel className="formlabel">Country</FormLabel>
          <ReactFlagsSelect
            name="country"
            id="country"
            borderColor="black"
            searchable={true}
            required
            className="react-flags-select"
            onSelect={(code, name) => {
              setSelectedCountry(code);
            }}
            selected={selectedCountry} // Add this line to set the initial selected country
          />
        </FormControl>

        <FormControl id="pic">
          <FormLabel>Upload your Picture</FormLabel>
          <Input
            type="file"
            p={1.5}
            accept="image/*"
            onChange={(e) => postDetails(e.target.files[0])}
            borderColor="black"
          />
        </FormControl>

        <FormControl id="gender" isRequired>
          <FormLabel>Gender</FormLabel>
          <Select
            placeholder="Select gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            borderColor="black"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>

        <FormControl id="genderPreference" isRequired>
          <FormLabel>What are you looking for?</FormLabel>
          <Select
            placeholder="Select"
            value={genderPreference}
            onChange={(e) => setGenderPreference(e.target.value)}
            borderColor="black"
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </Select>
        </FormControl>
        <FormControl>
          <Flex align="center" justify="space-between">
            {/* Adjust alignment and justification */}
            <FormLabel>Video</FormLabel>
            {/* "Upload Video Conditions" link */}
            <Button variant="link" color="blue" onClick={handleVideoConditionsToggle}>
              Upload Video Conditions
            </Button>
          </Flex>
          {/* Video input */}
          <Input
            type="file"
            p={1.5}
            accept="video/mp4"
            onChange={(e) => postVideo(e.target.files[0])}
            borderColor="black"
          />
        </FormControl>

        {/* Checkbox to accept terms */}
        <Checkbox
          isChecked={termsAccepted}
          onChange={handleCheckboxChange}
        >
          I have read and agree to the{" "}
          <Button variant="link" color="blue" onClick={handleTermsToggle}>
            Terms and Conditions
          </Button>
        </Checkbox>

        <Button
          colorScheme="gray"
          width="100%"
          style={{ marginTop: 15 }}
          onClick={submitHandler}
          isLoading={Loading}
        >
          Sign Up
        </Button>

        {/* Terms and Conditions modal */}
        <TermsAndConditions isOpen={showTerms} onClose={handleTermsToggle} />
        {/* Video Upload Conditions modal */}
        <VideoConditions
          isOpen={showVideoConditions}
          onClose={handleVideoConditionsToggle}
        />
      </VStack>
    </ChakraProvider>
  );
};

export default Signup;
