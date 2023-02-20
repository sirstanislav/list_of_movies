import "./App.scss";
import { Main } from "../Main/Main";
import { Header } from "../Header/Header";
import { NotFoundPage } from "../../NotFoundPage/NotFoundPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const mainRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Header />
        <Main url={"/"}/>
      </>
    ),
    errorElement: <NotFoundPage />,
  },
  {
    path: "/upcoming",
    element: (
      <>
        <Header />
        <Main url={"/upcoming"}/>
      </>
    ),
    errorElement: <NotFoundPage />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={mainRouter} />
    </div>
  );
}

export default App;
