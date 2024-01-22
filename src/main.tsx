import React from "react";
import ReactDOM from "react-dom/client";
// import App from "./App.tsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import Home from "./pages/Home.tsx";
import Detail from "./pages/Detail.tsx";
import Favourite from "./pages/Favourite.tsx";
import Watchlist from "./pages/Watchlist.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route index element={<Home />} />
      <Route path="/movie/:id" element={<Detail />} />
      <Route path="/favorite" element={<Favourite />} />
      <Route path="/watchlist" element={<Watchlist />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
