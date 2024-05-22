import React, { useState } from 'react';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

export default function Blog() {
  const { user } = ChatState();
  const [selectedContinent, setSelectedContinent] = useState(null);

  // Dummy posts data for each continent (replace this with your actual data)
  const continentPosts = {
    Africa: ["Post 1", "Post 2", "Post 3"],
    Asia: ["Post 4", "Post 5"],
    Europe: ["Post 6", "Post 7", "Post 8"],
    "North America": ["Post 9", "Post 10"],
    "South America": ["Post 11"],
    Oceania: ["Post 12", "Post 13", "Post 14"]
  };

  // Function to handle click on continent
  const handleContinentClick = (continent) => {
    setSelectedContinent(continent);
  };

  // Render posts based on selected continent
  const renderPosts = () => {
    if (selectedContinent) {
      return continentPosts[selectedContinent].map((post, index) => (
        <div key={index}>{post}</div>
      ));
    } else {
      return <div>Please select a continent to view posts.</div>;
    }
  };

  return (
    <main>
      <div className="imageWrapper">
        <img
          src="./images/backgroundair2.jpg"
          alt="background"
          className="imageHome"
        />
        <div style={{ width: "100%", opacity: "0.9"}}>
          {user && <SideDrawer />}
        </div>
      </div>

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <div className="continentWrapper" style={{ width: "60%", background: "white", padding: "20px", borderRadius: "8px", boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)" }}>
          <h2>Continents</h2>
          <ul style={{ listStyle: "none", padding: 0, display: "flex", justifyContent: "center" }}>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("Africa")}>Africa</li>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("Asia")}>Asia</li>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("Europe")}>Europe</li>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("North America")}>North America</li>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("South America")}>South America</li>
            <li style={{ margin: "0 30px", cursor: "pointer" }} onClick={() => handleContinentClick("Oceania")}>Oceania</li>
          </ul>
          <div style={{ marginTop: "20px" }}>
            {renderPosts()}
          </div>
        </div>
      </div>
    </main>
  );
}
