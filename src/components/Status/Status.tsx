import React from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';
import './Status.css';



interface Status{
    status: string
}

function Status({status}:Status) {
  return (
    <div className="status">
      <h3>{status}</h3>
      <RiLogoutBoxFill className="btnLogout" />
    </div>
  );
}

export default Status;
