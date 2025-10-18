import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router";


export default function PublicRoute() {
  const { user } = useSelector((state) => state.userSlice);
  return user ? <Navigate to= "/" replace/> : <Outlet/>;
}
