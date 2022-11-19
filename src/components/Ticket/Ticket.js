import React from "react";
import "./Ticket.css";
// redux
import { useDispatch } from "react-redux";

const Ticket = ({ id, message, date, priority, type }) => {
  const dispatch = useDispatch();

  const style =
    priority === "High"
      ? { backgroundColor: "red" }
      : { backgroundColor: "green" };

  function handleClickUpdate() {
    const newPriority = priority === "High" ? "Low" : "High";
    dispatch({
      type: "UPDATE_STATE_TICKET",
      payload: { id, priority: newPriority },
    });
  }

  switch (type) {
    case "TICKET_PAGE":
      return (
        <div className="ticket" onClick={() => handleClickUpdate()} key={id}>
          <div className="ticket-header">
            <h2>{message}</h2>
            <p>{date?.toLocaleString()}</p>
          </div>
          <div className="ticket-footer">
            <div className="circle" style={style}></div>
            <p>{priority}</p>
          </div>
        </div>
      );

    default:
      return (
        <div className="ticket-priority">
          <p>{message}</p>
          <p>{date?.toLocaleString()}</p>
        </div>
      );
  }
};

export default Ticket;
