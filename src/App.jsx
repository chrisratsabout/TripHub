import { createBrowserRouter, Route, createRoutesFromElements, RouterProvider } from "react-router-dom"
import Trips from "./components/Trips"
import StartPage, { handleSubmit } from "./components/StartPage"
import './style.css'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<StartPage />} action={handleSubmit}/>
      <Route path="/trips" element={<Trips />} />
    </Route>
  )
)

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
