import axios from '../utils/axios'
import {
  goToSignin,
  signin
} from './resource';

/* 将接口再做一层封装 */
export default {
  goToSignin(param, callback, errorback){
    return axios.post( goToSignin, param, callback, errorback )
  },

  signin(param, callback) {
		return axios.post( signin, param, callback )
	},

}
