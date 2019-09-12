import { handleActions } from 'redux-actions'
import { GETUSERINFO } from '../types/userInfo'

export default handleActions({
  [GETUSERINFO](state, action) {
    state.userInfo = action.payload;
    return {
      ...state
    }
  }
}, {
  userInfo: null,
})