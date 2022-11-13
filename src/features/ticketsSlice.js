const initialState = {
  tickets: [
    { id: 1, message: "Message1", date: new Date(), priority: "High" },
    { id: 2, message: "Message2", date: new Date(), priority: "Low" },
  ],
};

function validateMessageTicket(inputMessage) {
  if (typeof inputMessage !== "string") {
    throw new Error("Incorrect or missing message");
  }
  return inputMessage;
}

function validatePriorityTicket(inputPriority) {
  if (inputPriority !== "High" && inputPriority !== "Low") {
    throw new Error("Incorrect or missing priority");
  }
  return inputPriority;
}

function validateTicketPayload(payload) {
  const { message, priority } = payload;
  return {
    message: validateMessageTicket(message),
    priority: validatePriorityTicket(priority),
  };
}

export default function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TICKET":
      try {
        console.log(action.payload);
        const payloadTicket = validateTicketPayload(action.payload);
        const dataForTicket = {
          id:
            state.tickets.length === 0
              ? 1
              : Math.max(...state.tickets.map((ticketItem) => ticketItem.id)) +
                1,
          date: new Date(),
          ...payloadTicket,
        };
        console.log(dataForTicket);
        return { ...state, tickets: [...state.tickets, dataForTicket] };
      } catch (error) {
        console.log(error.message);
      }
      break;

    case "UPDATE_STATE_TICKET":
      try {
        console.log(action.payload);
        const ticketIndex = state.tickets.findIndex(
          (ticketItem) => ticketItem.id === action.payload.id
        );
        if (ticketIndex < 0) {
          throw new Error(`Ticket #${action.payload.id} not found`);
        }
        const newPriority = validatePriorityTicket(action.payload.priority);
        const updateTickets = [...state.tickets];
        updateTickets[ticketIndex] = {
          ...updateTickets[ticketIndex],
          priority: newPriority,
        };
        return {
          ...state,
          tickets: updateTickets,
        };
      } catch (error) {
        console.log(error.message);
      }
      break;

    default:
      return state;
  }
}
