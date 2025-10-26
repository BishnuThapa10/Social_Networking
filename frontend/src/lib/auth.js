import { jwtDecode } from "jwt-decode"
import { getUserFromLocal } from "../features/local/local.js";

export const getAuthUser = () => {
  const user = getUserFromLocal();
  if (user?.token){
    try {
    const decoded = jwtDecode(user.token)
    return decoded // contains id, username, etc.
  } catch (error) {
    console.error("Invalid token", error)
    return null
  }

  } return null

  
}