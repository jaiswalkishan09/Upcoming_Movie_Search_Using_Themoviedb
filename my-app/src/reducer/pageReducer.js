const initialData = 1;

const pageReducer = (state = initialData, action) => {
  switch (action.type) {
    case "PAGE_SET":
      return action.data;
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
};
export default pageReducer;
