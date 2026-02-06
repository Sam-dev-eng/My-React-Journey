import { createBrowserRouter } from "react-router";
import Home from "../pages/HomeFolder/Home";
import Login from "../pages/Auth/Login/Login";
import Signup from "../pages/Auth/SignUp/SignUp";
import ClientDashboard from "../pages/clientDashbord/ClientDashbord";
import SellerDashboard from "../pages/sellerDashBord/SellerDashbord";
import FavoritePage from "../pages/FavoritePage/FavoritesPage";
import CreateGig from "../pages/createGig/CreateGig";
import GigDetails from "../pages/gigDetails/GigDetails";
import UserProfile from "../pages/UserProfile/UserProfile";
import ChatList from "../pages/chats/ChatList";
import Chat from "../pages/chats/Chats";
import ProtectedRoute from "./ProtectRout";




const Router = createBrowserRouter([
  {
    path: "/",
    element: <Home isAuthenticated={false} role={null} />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  
  {
    path: "/signup",
    element: <Signup role="CLIENT" />,
  },

  {
    path: "/signUpSeller",
    element: <Signup role="SELLER" />,
  },
  {
    path: "/client",
    element: (
      <ProtectedRoute>
      <ClientDashboard isAuthenticated={true} role={"client"} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/seller",
    element: (
      <ProtectedRoute>
      <SellerDashboard isAuthenticated={true} role={"seller"} />
      </ProtectedRoute>
    ),
  },
  {
    path: "/favorites",
    element: (
      <ProtectedRoute>
      <FavoritePage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-gig",
    element: (
      <ProtectedRoute>
      <CreateGig />
      </ProtectedRoute>
    ),
  },
  {
    path: "/gig/:id",
    element: (
      //<ProtectedRoute>
      <GigDetails />
      //</ProtectedRoute>
    ),
  },
  {
    path: "/user/:id",
    element: (
      <ProtectedRoute>
      <UserProfile />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chats",
    element: (
      <ProtectedRoute>
      <ChatList />
      </ProtectedRoute>
    ),
  },
  {
    path: "/chat/:chatId",
    element: (
      <ProtectedRoute>
      <Chat />
      </ProtectedRoute>
    ),
  },
]);

export default Router;