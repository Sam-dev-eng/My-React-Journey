import Home from "../HomeFolder/Home";

function ClientDashboard(props) {
  return (
    <>
      <Home isAuthenticated={props.isAuthenticated} role={props.role} />
    </>
  );
}

export default ClientDashboard;
