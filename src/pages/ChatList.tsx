import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLazyQuery, useQuery } from "@apollo/client";
import { FIND_CHAT_BY_ID } from "../queries/FIND_CHAT_BY_ID";

function ChatList() {
  const [findChatsById,{ data, error, loading }] = useLazyQuery(FIND_CHAT_BY_ID);

  const currentUser = JSON.parse(localStorage.getItem("currentUser")!!);

  const navigate = useNavigate();

  useEffect(() => {
    findChatsById({ variables: { findChatsByIdId: currentUser.id } });
  }, []);

  const handleChat = (chat:any) => {
    navigate("/chat", {state:{...chat}});
  }

  if(loading) return <div>loading......</div>;
  if (error) return <div>`Error! ${error.message}`</div>;

  return (
    <div style={{color: "black"}}>

      <input type="search" name="chatSearch" id="chatSearch" />

      {
      data 
      ? data.findChatsById.map((chat:any) => {
        const { participants } = chat;
        const reciver = participants.find(
          (participant:any) => participant.id != currentUser.id
        );

        return <li key={chat.id} onClick={()=>handleChat(chat)}> {reciver.username}</li>;
      })
      : '' 
    }
    </div>
  );
}

export default ChatList;
