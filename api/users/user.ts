
import { Get, Login } from '../baseApi';

interface LoginParams {
  username: string;
  password: string;

}
interface SignupParams{
  first_name: string;
  last_name: string;
  username: string;
  password: string;
}

async function login(params: LoginParams) {
  return Login('/User/login', params);
}
async function signup(para: SignupParams) {
  return Login('/User/signup', para);
}

async function getAllUsers() {
  return Get('/Users');
}

const apiUser = {
  login,
  getAllUsers,
  signup
};

export default apiUser;
