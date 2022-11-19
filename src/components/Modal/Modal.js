import React, { useEffect, useState } from "react";
import "./Modal.css";
// redux
import { useDispatch } from "react-redux";

const Modal = ({ setOpenModal }) => {
  const [message, setMessage] = useState("");
  const [priority, setPriority] = useState("High");
  const dispatch = useDispatch();

  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "ADD_TICKET", payload: { message, priority } });
    setOpenModal(false);
  }

  useEffect(() => {
    const closeClickModal = (event) => {
      const arrayPath = event.path;
      const pathItem = arrayPath.find((pathItem) => {
        return pathItem.tagName === "FORM" || pathItem.tagName === "BUTTON";
      });
      if (!pathItem) {
        setOpenModal(false);
      }
    };
    document.body.addEventListener("click", closeClickModal);
    return () => document.body.removeEventListener("click", closeClickModal);
  }, [setOpenModal]);

  return (
    <div className="main-modal">
      <form
        className="container-modal"
        onSubmit={(event) => handleSubmit(event)}
      >
        <h2>Create ticket</h2>
        <input
          className="form-control"
          type="text"
          placeholder="Enter message..."
          onChange={(event) => setMessage(event.target.value)}
        />
        <select
          className="form-control"
          onChange={(event) => setPriority(event.target.value)}
        >
          <option value="High">High</option>
          <option value="Low">Low</option>
        </select>
        <input className="btn btn-primary" type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default Modal;
