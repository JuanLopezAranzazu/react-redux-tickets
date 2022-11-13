import React, { useState } from "react";
import "./App.css";
// components
import Ticket from "./components/Ticket/Ticket";
// redux
import { useSelector } from "react-redux";
import Modal from "./components/Modal/Modal";

const App = () => {
  const [openModal, setOpenModal] = useState(false);
  const selector = useSelector((state) => state.tickets);
  console.log(selector);
  const tickets = selector.tickets.sort((a, b) => {
    if (a.priority === "High" && b.priority === "Low") return -1;
    if (a.priority === "Low" && b.priority === "High") return 1;
    return 0;
  });

  return (
    <div className="main">
      <div className="header">
        <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
          Create
        </button>
      </div>
      <div className="tickets">
        {tickets.length > 0 ? (
          <h3>Tickets {tickets.length}</h3>
        ) : (
          <h3>Tickets not found</h3>
        )}
        {tickets.map((ticketItem) => {
          return <Ticket {...ticketItem} key={ticketItem.id} />;
        })}
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default App;
