import produce from "immer";

const todos = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "LOAD_TODOS": {
        draft.loaded = true;
        draft.items = action.payload;
        return;
      }
      case "ADD_TODO": {
        draft.items[action.payload.id] = action.payload;
        return;
      }
      default:
        return draft;
    }
  });

export default todos;
