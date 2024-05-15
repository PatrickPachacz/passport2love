import React from 'react';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

export default function Blog() {
  const { user } = ChatState();
  

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


    </main>
  );
}
