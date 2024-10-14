import * as React from "react";
import { createBrowserRouter } from "react-router-dom";
import "../index.css";
import Root, { loader as rootLoader, action as rootaction } from "./Root";
import Errorpage from "../error-page";
import Contact, { loader as contactLoader } from "./Contact";
import EditContact, { action as editAction } from "./Edit";
import { action as destroyAction } from "./Destroy";
import NavBar from "./Navbar";
import Simpsons from "./Simpsons";
import Image from "./Image";
import Input from "./Reverse";
import InputForm from "./InputForm";
import Weather from "./Weather";

const router = createBrowserRouter([
  {
    path: "/",
    element: <NavBar />,
    errorElement: <Errorpage />,
  },
  {
    path: "/simpsons",
    element: <Simpsons />,
  },
  {
    path: "image",
    element: <Image />,
  },
  {
    path: "input",
    element: <Input />,
  },
  {
    path: "inputform",
    element: <InputForm />,
  },
  {
    path: "weather",
    element: <Weather />,
  },
  {
    path: "/root",
    element: <Root />,
    errorElement: <Errorpage />,
    loader: rootLoader,
    action: rootaction,
    children: [
      {
        path: "contacts/:contactId",
        element: <Contact />,
        loader: contactLoader,
      },
      {
        path: "contacts/:contactId/edit",
        element: <EditContact />,
        loader: contactLoader,
        action: editAction,
      },
      {
        path: "contacts/:contactId/destroy",
        action: destroyAction,
      },
    ],
  },
]);

export default router;
