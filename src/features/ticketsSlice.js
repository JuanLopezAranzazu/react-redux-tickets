const initialState = {
  tickets: [
    {
      id: 1,
      message: "I did this by first importing the package",
      date: new Date(),
      priority: "High",
    },
    {
      id: 2,
      message: "hat's pretty much it, I hope it helps someone",
      date: new Date(),
      priority: "Low",
    },
    {
      id: 3,
      message: "I needed to mock the user's device and browser",
      date: new Date(),
      priority: "Low",
    },
    {
      id: 4,
      message: "I needed to mock the user's device and browser",
      date: new Date(),
      priority: "Low",
    },
    {
      id: 5,
      message: "I needed to mock the user's device and browser",
      date: new Date(),
      priority: "High",
    },
  ],
};

export default function ticketsReducer(state = initialState, action) {
  switch (action.type) {
    case "ADD_TICKET":
      console.log(action.payload);
      const dataForTicket = {
        id:
          state.tickets.length === 0
            ? 1
            : Math.max(...state.tickets.map((ticketItem) => ticketItem.id)) + 1,
        date: new Date(),
        ...action.payload,
      };
      console.log(dataForTicket);
      return { ...state, tickets: [...state.tickets, dataForTicket] };

    case "UPDATE_STATE_TICKET":
      console.log(action.payload);
      const ticketIndex = state.tickets.findIndex(
        (ticketItem) => ticketItem.id === action.payload.id
      );
      if (ticketIndex < 0) {
        throw new Error(`Ticket #${action.payload.id} not found`);
      }
      const updateTickets = [...state.tickets];
      updateTickets[ticketIndex] = {
        ...updateTickets[ticketIndex],
        priority: action.payload.priority,
      };
      return { ...state, tickets: updateTickets };

    case "DELETE_TICKET":
      const ticketsFilter = state.tickets.filter((ticketItem) => {
        return ticketItem.id !== action.payload.id;
      });
      return { ...state, tickets: ticketsFilter };

    default:
      return state;
  }
}
