import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  sub: string;
  role: string;
  exp: number;
}

export const getUserRole = () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.role;
  } catch (err) {
    return null;
  }
};

export const isTokenValid = () => {
  const token = localStorage.getItem("token");
  if (!token) return false;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};
