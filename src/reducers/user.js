import { CURRENT_USER } from 'actions/types';

export default function(state = {}, action) {
  switch (action.type) {
    case CURRENT_USER:
      return { ...state, currentUser: action.payload };
    default:
      return state;
  }
}