import { Navigate, Route, Routes } from "react-router-dom"
import { ReservationByRoomPage, 
         ReservationByUserPage, 
         ReservationCreatePage, 
         ReservationDetailPage, 
         ReservationEditPage, 
         ReservationsPage, 
         RoomCreatePage, 
         RoomDetailPage, 
         RoomEditPage, 
         RoomsPage, 
         SummaryPage, 
         UserDetailPage, 
         UserEditPage, 
         UsersPage } from "../pages"


export const MederiRoutes = () => {

  return (
    <Routes>
      
      <Route 
        path="/" 
        element={ <SummaryPage /> } 
      />

      <Route path="users" >
        <Route index element={ <UsersPage /> } />
        <Route path=":userId" element={ <UserDetailPage /> } />
        <Route path=":userId/edit" element={ <UserEditPage /> } />
      </Route>

      <Route path="rooms">
        <Route index element={ <RoomsPage /> } />
        <Route path="create" element={ <RoomCreatePage /> } />
        <Route path=":roomId" element={ <RoomDetailPage /> } />
        <Route path=":roomId/edit" element={ <RoomEditPage /> } />
      </Route>

      <Route path="reservations">
        <Route index element={ <ReservationsPage /> } />
        <Route path="create" element={ <ReservationCreatePage /> } />
        <Route path=":reservationId" element={ <ReservationDetailPage /> } />
        <Route path=":reservationId/edit" element={ <ReservationEditPage /> } />
        <Route path="user/:userId" element={ <ReservationByUserPage /> } />
        <Route path="room/:roomId" element={ <ReservationByRoomPage /> } />
      </Route>

      <Route path="/*" element={ <Navigate to="/" /> } />

    </Routes>
  )
}
