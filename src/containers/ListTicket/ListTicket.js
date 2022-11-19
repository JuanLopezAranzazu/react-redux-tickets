import React from "react";
import "./ListTicket.css";
// components
import Ticket from "./../../components/Ticket/Ticket";

const ListTicket = ({ title, tickets }) => {
  return (
    <div className="list-ticket">
      <h5>{title}</h5>
      {tickets.length > 0 ? (
        tickets.map((ticketItem) => {
          return (
            <Ticket {...ticketItem} type="TICKET_LIST" key={ticketItem.id} />
          );
        })
      ) : (
        <p>Tickets not found</p>
      )}
    </div>
  );
};

export default ListTicket;
