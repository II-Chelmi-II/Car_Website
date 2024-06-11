
import { Get, Login } from '../baseApi';

interface LoginParams {
  username: string;
  password: string;
}

async function login(params: LoginParams) {
  return Login('/User/login', params);
}

async function getAllUsers() {
  return Get('/Users');
}

const apiUser = {
  login,
  getAllUsers,
};

export default apiUser;
