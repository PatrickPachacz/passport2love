import React, { useEffect } from 'react';
import { Container, Box, Tabs, Text, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate } from "react-router-dom";
import useIntersectionObserver from '../hooks/useIntersectionObserver';




const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));
    if (user) navigate("/dashboard");
  }, [navigate]);

 
  const loginSignupVisible = useIntersectionObserver({ target: '.login-signup-box' });
  const textVisible = useIntersectionObserver({ target: '.centered-text' });
  const montageVisible = useIntersectionObserver({ target: '.image-montage' });
  const testimonialVisible = useIntersectionObserver({ target: '.testimonial-container' });

  return (
    <main className="image-container" style={{ background: "linear-gradient(to bottom right,rgb(247, 249, 254),rgb(217, 77, 17))" }}>
      <div className="black-bar" style={{ bbackground: "linear-gradient(to bottom right,rgb(247, 249, 254),rgb(79, 102, 130))", height: '50px', width: '100%', opacity: '0.9', top: 0, left: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: "42px", fontFamily: "'Dancing Script', cursive" }} color="black" marginRight="50px" marginLeft="40px" marginTop="100px" >Passport2Love</Text>
      </div>

      
      <Container maxW='xl' centerContent className={`login-signup-box ${loginSignupVisible ? 'fade-in' : ''}`}>
        <Box
          d='flex'
          justifyContent="center"
          p={10}
          bg={'rgba(255, 255, 255, 0)'} 
          color="rgb(128, 0, 0)"
          w="100%"
          m="40px 0 20px 0"
        />
        <Box bg={'rgba(255, 255, 255, 0.8)'} w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px" m="0 0 260px 0">
          <Tabs variant='soft-rounded' colorScheme='cyan'>
            <TabList mb="1em">
              <Tab width="50%">Login</Tab>
              <Tab width="50%">Sign up</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Login />
              </TabPanel>
              <TabPanel>
                <Signup />
              </TabPanel>
            </TabPanels>
          </Tabs>
          
        </Box>

        <i
          className="fas fa-arrow-down"
          style={{
           fontSize: '30px',
            marginTop: '-40px',
            marginBottom: '20px',
           position: 'relative',
            top: '-50px',
            color: 'rgb(128, 0, 0)',
          }}
        ></i>
       
      </Container>

      

      <div className="app-info">
        <div className={`image-montage ${montageVisible ? 'fade-in' : ''}`}>
          <div className="montage-column">
            <img src="./images/self1.jpg" loading="lazy" alt="self1" className="montage-image" />
            <img src="./images/self4.jpg" loading="lazy" alt="self4" className="montage-image" />
          </div>
          <div className="montage-column">
            <img src="./images/self2.jpg" loading="lazy" alt="self2" className="montage-image" />
            <img src="./images/self5.jpg" loading="lazy" alt="self5" className="montage-image" />
          </div>
          <div className="montage-center">
            <img src="./images/self3.jpg" loading="lazy" alt="self3" className="montage-image" />
            <img src="./images/self6.jpg" loading="lazy" alt="self6" className="montage-image" />
          </div>
        </div>

        <div className={`centered-text ${textVisible ? 'fade-in' : ''}`}>
          <div style={{  display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Text fontSize="xl" fontFamily="'Dancing Script'" color="black" textAlign="center">
              International Dating
              <h3>Looking for someone, somewhere?</h3>
              <h2 style={{ fontSize: "42px", fontFamily: "'Dancing Script', cursive" }}>Search here...</h2>
            </Text>
          </div>
        </div>

        <div className={`image-montage ${montageVisible ? 'fade-in' : ''}`}>
          <div className="montage-center">
            <img src="./images/self7.jpg" loading="lazy" alt="self7" className="montage-image" />
            <img src="./images/self10.jpg" loading="lazy" alt="self10" className="montage-image" />
          </div>
          <div className="montage-column">
            <img src="./images/self8.jpg" loading="lazy" alt="self8" className="montage-image" />
            <img src="./images/self11.jpg" loading="lazy" alt="self11" className="montage-image" />
          </div>
          <div className="montage-column">
            <img src="./images/self9.jpg" loading="lazy" alt="self9" className="montage-image" />
            <img src="./images/self12.jpg" loading="lazy" alt="self12" className="montage-image" />
          </div>
        </div>
      </div>

      <section className="testimonials">
        <h2>About us</h2>
        <div className={`testimonial-container ${testimonialVisible ? 'fade-in' : ''}`}>
          <div className="testimonial">
            <img className="testImg" loading="lazy" src="./images/iphone.jpg" alt="message"/>
            <h1 className="testh1">Real-Time Messaging:</h1>
            <p>Open a dialogue</p>
            <p>Keep in contact with potential matches</p>
          </div>
          <div className="testimonial">
            <img className="testImg" loading="lazy" src="./images/couplenoirhug.jpg" alt="couplehugging"/>
            <h1 className="testh1">Find your match</h1>
            <p>Country of origin, age, and gender</p>
            <p>Ultimate search to around the globe</p>
          </div>
        </div>
      </section>

      <section className="couple-sitting-container" >
        <img src="./images/aiimage.jpg" loading="lazy" alt="couple" className="couplenoir" />
      </section>

      <section className="social-media">
        <p>Copyright passport2love.com 2025. All rights reserved.</p>
      </section>
    </main>
  );
};

export default Home;
