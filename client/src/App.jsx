import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from "react-router-dom";
import RoomPage from "./pages/Room/index"
import HomePage from "./pages/Home/index"


function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' >
      <Route path='' element={<HomePage />} />
      <Route path=':roomID/whiteboard' element={<RoomPage />} />
    </Route>
  ))

  return (

    <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-custom p-10">
      <RouterProvider router={router}>
        <div className="blur-circle"></div>
        <div className="">
          <h1 className="text-5xl font-bold text-center">Collab_Palette</h1>
          <p className="text-center text-xl">A Real-Time Collaborative Whiteboard</p>
        </div>
      </RouterProvider>
    </div >

  );
}

export default App;
