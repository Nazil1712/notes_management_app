import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./HomePage";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <HomePage/>
  },
  /* {
    path: "/sign-in",
    element: <SignInPage/>
  } */
])


export default function App() {

  return(
    <div className="App">
      <RouterProvider router={appRouter}/>
    </div>
  )
}
