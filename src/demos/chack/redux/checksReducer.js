import { startOfToday, format } from "date-fns";
import produce from "immer";

const checks = (state, action) =>
  produce(state, draft => {
    switch (action.type) {
      case "LOAD_ALL_CHECKS": {
        draft.loaded = true;
        draft.items = action.payload;
        return draft;
      }
      case "LOAD_CHECKS": {
        draft.items = draft.items || {};
        draft.items[action.payload.todo.id] = action.payload.checks;
        draft.loaded =
          draft.loaded || draft.countItems === Object.keys(draft.items).length;
        return draft;
      }
      case "LOAD_TODOS": {
        draft.countItems = Object.keys(action.payload).length;
        return draft;
      }
      case "ADD_TODO": {
        const { id } = action.payload;
        draft.items[id] = {};
        return draft;
      }
      case "TOGGLE_CHECK": {
        const { id } = action.payload;
        const today = format(startOfToday(), "X");
        if (!draft.items[id]) {
          draft.items[id] = {};
        }
        if (draft.items[id][today]) {
          delete draft.items[id][today];
        } else {
          draft.items[id][today] = 1;
        }
        return draft;
      }
      default:
        return draft;
    }
  });

export default checks;
