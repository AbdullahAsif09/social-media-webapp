const ReducerContext = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        ...state,
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_FAIL":
      return {
        ...state,
        user: null,
        isFetching: false,
        error: true,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_OUT":
      return {
        user: null,
        isFetching: false,
        error: false,
        darkmode: false,
      };
    case "DARK_MODE":
      return {
        ...state, 
        darkmode:action?.payload,
      };
    case "FOLLOW":
      return {
        ...state,
        user: {
          ...state?.user,
          followings: [...state?.user.followings, action?.payload],
        },
      };
    case "UNFOLLOW":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter(
            (following) => following !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};

export default ReducerContext;
