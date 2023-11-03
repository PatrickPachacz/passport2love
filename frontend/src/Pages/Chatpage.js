import { Box, Flex } from "@chakra-ui/layout";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";

const Chatpage = () => {
  const { user } = ChatState();
  const [fetchAgain, setFetchAgain] = useState(false);

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Flex height="91.5vh">
        {user && <MyChats fetchAgain={fetchAgain}/>}
        <Box flex="1" display="flex" justifyContent="flex-end">
          {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
        </Box>
      </Flex>
    </div>
  );
};

export default Chatpage;