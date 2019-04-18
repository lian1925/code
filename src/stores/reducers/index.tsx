import { combineReducers } from "redux";

interface PostState {
  postList: string[];
}
const initState: PostState = {
  postList: []
};

/**
 *
 *
 * @export
 * @param {*} [state=initState]
 * @param {*} action
 * @returns
 */
export function postReducer(state = initState, action: any) {
  switch (action.type) {
    case "FETCH_POST":
      return {
        postList: [...state.postList, action.payload]
      };
  }
  return state;
}

const rootReducer = combineReducers({
  posts: postReducer
});

export default rootReducer;
