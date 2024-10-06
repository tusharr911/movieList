import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import SignUp from "./pages/SignUp.tsx";
import "./index.css";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout.tsx";
import Login from "./pages/Login.tsx";
import { Provider } from "react-redux";
import { store } from "./store/ReduxStore.ts";
import MovieDetails from "./pages/MovieDetails.tsx";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import WatchList from "./pages/WatchList.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="/signup" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route index element={<App />} />
        <Route path=":imdbID" element={<MovieDetails />} />
        <Route path="/watchlist" element={<WatchList />} />
      </Route>
    </Route>
  )
);

const queryClient = new QueryClient();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
