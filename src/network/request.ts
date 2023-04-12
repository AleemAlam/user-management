import Axios from "axios";
import { User } from "../pages/UserListPage";

const axios = Axios.create({
  baseURL: "https://reqres.in/api/",
});

const getUsers = (page = 1) => {
  return axios.get(`users?page=${page}`);
};

const getSingleUser = (id: string) => {
  return axios.get(`users/${id}`);
};

const updateUser = (user: User, id: string) => {
  return axios.put(`users/${id}`, {
    ...user,
  });
};

export { getUsers, getSingleUser, updateUser };
