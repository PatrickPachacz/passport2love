import React from 'react';
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

export default function Blog() {
  const { user } = ChatState();

  return (
    <main>
      <div className="imageWrapper">
        <img
          src="./images/service.png"
          alt="background"
          className="imageHome"
        />
        <div style={{ width: "100%", opacity: "0.9"}}>
          {user && <SideDrawer />}
        </div>
      </div>

    </main>
  );
}
