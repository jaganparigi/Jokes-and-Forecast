import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { useAuthProvider } from "./Auth/Hooks/AuthProvider";
import { RouterProvider } from "react-router-dom";
import router from "./routes/Router";
import { Provider } from "react-redux";
import store from "./Store/Store";

const { AuthProvider } = useAuthProvider();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </AuthProvider>
  </StrictMode>
);
