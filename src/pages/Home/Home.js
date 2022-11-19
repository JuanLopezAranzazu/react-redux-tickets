import React, { useEffect, useState } from "react";
import "./Home.css";
// redux
import { useSelector } from "react-redux";
// components
import Ticket from "./../../components/Ticket/Ticket";
import Modal from "./../../components/Modal/Modal";
// containers
import ListTicket from "./../../containers/ListTicket/ListTicket";

const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [state, setState] = useState("Priority");
  const selector = useSelector((state) => state.tickets);
  const [tickets, setTickets] = useState(selector.tickets);

  useEffect(() => {
    setTickets(selector.tickets);
    sortTickets();
  }, [selector.tickets]);

  function getTicketsByPriority(type = "High") {
    return tickets.filter((ticketItem) => {
      return ticketItem.priority === type;
    });
  }

  function sortTickets() {
    switch (state) {
      case "Priority":
        setTickets(
          selector.tickets.sort((a, b) => {
            if (a.priority === "High" && b.priority === "Low") {
              return -1;
            }
            if (a.priority === "Low" && b.priority === "High") {
              return 1;
            }
            return 0;
          })
        );
        setState("Message");
        break;

      default:
        setTickets(
          selector.tickets.sort((a, b) => {
            if (a.message > b.message) {
              return -1;
            }
            if (a.message < b.message) {
              return 1;
            }
            return 0;
          })
        );
        setState("Priority");
        break;
    }
  }

  return (
    <div className="home">
      <div className="home-options">
        <button className="btn btn-primary" onClick={() => setOpenModal(true)}>
          Create
        </button>
        <button className="btn btn-primary" onClick={() => sortTickets()}>
          Sort by {state}
        </button>
      </div>
      <div className="content-home">
        <div className="container-tickets">
          {tickets?.map((ticketItem) => {
            return (
              <Ticket {...ticketItem} type="TICKET_PAGE" key={ticketItem.id} />
            );
          })}
        </div>
        <div className="container-priority">
          <ListTicket
            title={"Priority high"}
            tickets={getTicketsByPriority("High")}
          />
          <ListTicket
            title={"Priority low"}
            tickets={getTicketsByPriority("Low")}
          />
        </div>
      </div>
      {openModal && <Modal setOpenModal={setOpenModal} />}
    </div>
  );
};

export default Home;
