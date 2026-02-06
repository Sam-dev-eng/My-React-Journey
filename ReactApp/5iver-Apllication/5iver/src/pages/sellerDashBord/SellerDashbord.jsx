import { Link } from "react-router";
import Navbar from "../../components/navBarfolder/NavBar";
import Home from "../HomeFolder/Home";

function SellerDashboard(props) {

  const id = sessionStorage.getItem("id");
  




  return (
    <>
      <Home isAuthenticated={props.isAuthenticated} role={props.role} />
    </>
  );
}

export default SellerDashboard;
