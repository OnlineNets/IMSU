const initialState = {
    name: "",
    email: "",
    gender: "",
    role: "normal",
    company: "",
    accountnumber: ""    
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_MYINFOR':
        return {
          ...state,
          users: [...state.users, action.payload],
        };
      default:
        return state;
    }
  };
  
  export default userReducer;