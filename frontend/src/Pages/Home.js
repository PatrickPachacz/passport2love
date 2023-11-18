import React, { useEffect } from 'react';
import { Container, Box, Tabs, Text, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from '../components/Auth/Login';
import Signup from '../components/Auth/Signup';
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/dashboard");
  }, [navigate]);

  return (

    <main className="image-container">
      <div className="black-bar" style={{ background: 'rgb(227, 226, 222)', height: '100px', width: '100%', opacity: '0.9', top: 0, left: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <img src="./images/logolarge.png" style={{ height: '80px', width: 'auto' }} alt="logo" />
        <Text fontSize="2xl" color="black" marginRight="50px" marginLeft="40px">Passport2Love</Text>
      </div>

      <div className="imageWrapper">
          <img src="./images/beige.jpg" className="imageHome" alt="background" />
      </div>

    <Container maxW='xl' centerContent>
      <Box
        d='flex'
        justifyContent="center"
        p={10}
        bg={'rgba(255, 255, 255, 0)'} // Change the opacity value here
        color="rgb(128, 0, 0)"
        w="100%"
        m="40px 0 20px 0"
      >
        
      </Box>
      <Box bg={'rgba(255, 255, 255, 0.8)'} w="100%" p={4} borderRadius="lg" color="black" borderWidth="1px" m="0 0 260px 0">
        <Tabs variant='soft-rounded' colorScheme='gray'>
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
    </Container>

    <div className="app-info">
        
        <div className="video-and-text-container">
          <video src="./images/globe.mp4" className="videoGlobe" autoPlay loop muted></video>
          <div className="text-container">
            <h2>Grab your passport</h2>
            <h3>Looking for someone, somewhere? Let us help you...</h3>
          </div>
        </div>
        
      </div>

            <section class="testimonials">
                <h2>Passport2Love - International Dating App</h2>
                <div class="testimonial-container">
                    <div class="testimonial">
                    <img className="testImg" src="./images/camera.jpg" alt="test" />
                    <h1 className="testh1">Video Upload:</h1>
                    <p>Sometimes a photo is just not enough</p>
                    <p>Share a brief video expressing your desires in life</p>
                    <p>What are you looking for in a partner</p>
                    <p>Short details about yourself and where you're from</p>
                    
                    </div>
                    <div class="testimonial">
                    <img className="testImg" src="./images/mobile.jpg" alt="test"/>
                    <h1 className="testh1">Real-Time Messaging:</h1>
                    <p>Open a dialogue</p>
                    <p>Keep in contact with potential matches</p>
                    <p>Be open to the possibilites</p>
                    
                    </div>
                    <div class="testimonial">
                    <img className="testImg" src="./images/testimonial3.jpg" alt="test"/>
                    <h1 className="testh1">Find your match based on your criteria</h1>
                    <p>Everyone has their preferences</p>
                    <p>Searches made by country of origin, age, and gender</p>
                    <p>Why restrict your search to local areas</p>
                    <p>Expand your ultimate search to around the globe</p>
                    
                    </div>
                </div>
            </section>

            <section className="couple-sitting-container">
              <img src="./images/bottomcouple.jpg" alt="couple" className="imgCoupleSitting" />
              <div className="download-now-container">
              <div className="download-now">
              <p>Download Now</p>
              <div className="blank-box"></div> {/* Replace with Google Play logo */}
              </div>
              </div>
            </section>

            <section class="social-media">
                <a href="https://www.facebook.com/yourpage" rel="noopener noreferrer" target="_blank">
                    <img width="50" height="50" viewBox="0 0 24 24" fill="none" src="https://cdn.iconscout.com/icon/free/png-256/facebook-social-media-fb-logo-square-44659.png" alt="couple"/>
                </a>
                <a href="https://www.youtube.com/channel/yourchannel" rel="noopener noreferrer" target="_blank">
                    <img width="50" height="50" viewBox="0 0 24 24" fill="none" src="https://cdn.iconscout.com/icon/free/png-256/youtube-1464540-1239451.png" alt="couple"/>
                </a>
                <a href="https://www.tiktok.com/@yourhandle" rel="noopener noreferrer" target="_blank">
                    <img width="50" height="50" viewBox="0 0 24 24" fill="none" src="https://cdn.iconscout.com/icon/free/png-256/tiktok-2270636-1891163.png" alt="couple"/>
                </a>
                <a href="https://www.instagram.com/yourpage" rel="noopener noreferrer" target="_blank">
                    <img width="50" height="50" viewBox="0 0 24 24" fill="none" src="https://cdn.iconscout.com/icon/free/png-256/instagram-86-433323.png" alt="couple"/> 
                </a>
                <p>Copyright passport2love.com 2023. All rights reserved.</p>
            </section>
            

    </main>
  );
};

export default Home;
