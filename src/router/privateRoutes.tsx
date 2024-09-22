import { Navigate } from "react-router-dom";
import { SummaryPage, 
         UsersPage, 
         UserDetailPage, 
         UserEditPage, 
         RoomsPage, 
         RoomCreatePage, 
         RoomDetailPage, 
         RoomEditPage, 
         ReservationsPage, 
         ReservationDetailPage, 
         ReservationByUserPage, 
         ReservationByRoomPage } from "../mederi/pages";


interface IRoute {
    path: string;
    element: JSX.Element;
    children?: IRoute[];
  }
  
  export const privateRoutes: IRoute[] = [
    {
      path: "/",
      element: <SummaryPage />,
    },
    {
      path: "users",
      element: <UsersPage />,
      children: [
        {
          path: ":userId",
          element: <UserDetailPage />,
        },
        {
          path: ":userId/edit",
          element: <UserEditPage />,
        },
      ],
    },
    {
      path: "rooms",
      element: <RoomsPage />,
      children: [
        {
          path: "create",
          element: <RoomCreatePage />
        },
        {
          path: ":roomId",
          element: <RoomDetailPage />
        },
        {
          path: ":roomId/edit",
          element: <RoomEditPage />
        },
      ],
    },
    {
      path: "reservations",
      element: <ReservationsPage />,
      children: [
        {
          path: ":reservationId",
          element: <ReservationDetailPage />,
        },
        {
          path: "user/:userId",
          element: <ReservationByUserPage />,
        },
        {
          path: "room/:roomId",
          element: <ReservationByRoomPage />,
        },
      ],
    },
    {
      path: "/*",
      element: <Navigate to="/" />,
    },
    
  ]