const createStore = function (reducer) {
  let state;
  let listeners = [];

  function subscribe(listener) {
    listeners.push(listener);
  }

  function dispatch(action) {
    state = reducer(state, action);
    for (let listener of listeners) {
      listener();
    }
    return;
  }
  function getState() {
    return state;
  }
  return {
    subscribe,
    getState,
    dispatch,
  };
};

// Test my redux
const initialState = {
  counter: 0,
  login: true,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  if (action.type === "INC_COUNTER") {
    return {
      ...state,
      counter: state.counter + 1,
    };
  }
  if (action.type === "ADD_COUNTER") {
    return {
      ...state,
      counter: state.counter + action.value,
    };
  }
  return state;
};

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
  console.log("[Subscription] 1", store.getState());
});
store.subscribe(() => {
  console.log("[Subscription] 2", store.getState());
});

// Dispatching Action
store.dispatch({ type: "INC_COUNTER" });
store.dispatch({ type: "ADD_COUNTER", value: 10 });
console.log(store.getState());
