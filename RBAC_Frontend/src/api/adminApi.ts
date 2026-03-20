import api from "./axios";


export const getAllUsers = () => {
  return api.get("/admin/users");
};


export const deleteUser = (id: number) => {
  return api.delete(`/admin/user/${id}`);
};