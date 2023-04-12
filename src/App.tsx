import { gql, useQuery, useLazyQuery } from "@apollo/client";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Chat from "./pages/Chat";
import ChatList from "./pages/ChatList";
import Login from "./pages/Login";

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/chat" element={<Chat />} />
          <Route path="/chatlist" element={<ChatList />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
