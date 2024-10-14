import Output from "../components/Output";
import "../css/InputForm.css";
import PasswordValidator from "../components/PasswordValidator";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { loginRequest } from "../Auth/AuthConfig";
import { useState } from "react";

export default function InputForm() {
  const dispatch = useDispatch();
  const { firstName, lastName } = useSelector((state) => {
    return state.user;
  });
  const [phone, setPhone] = useState("");

  const phoneChange = (event) => {
    console.log("setPhone");

    setPhone(event.target.value);
  };

  const phoneSubmit = () => {
    console.log("validating phone");
    const phoneCheckRegex = /^\(?(\d{3})\)?[- ]?(\d{3})?[- ]?(\d{4})$/;
    const isValid = phoneCheckRegex.test(phone);
    console.log("Phone valid:", isValid);
    return isValid;
  };

  const onChange = (event) => {
    const { value, name } = event.target;
    dispatch({ type: "add_field", name, value });
    console.log(`${name}: ${value}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("submitted");

    if (!phoneSubmit()) {
      alert("please input number in this format:\n 012-345-6789");
      return;
    }
    alert(`timestamp: ${event.timeStamp}`);
    console.log(
      event.target[0].name,
      ":",
      event.target[0].value,
      event.target[1].name,
      ":",
      event.target[1].value,
      event.target[2].name,
      ":",
      event.target[2].value
    );
  };

  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleLoginRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };

  const handleLogOutRedirect = () => {
    instance.logoutPopup({
      postLogoutRedirectUri: "/",
    });
    window.location.reload();
  };

  return (
    <div className="InputForm">
      <AuthenticatedTemplate>
        {activeAccount ? (
          <div className="Container">
            <div className="inputContainer">
              <form
                action=""
                method="get"
                onSubmit={handleSubmit}
                type="text"
                name="form"
                className="form"
              >
                <div className="input_field">
                  <label>First Name:</label>
                  <input
                    name="firstName"
                    placeholder="john"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Last Name:</label>
                  <input
                    name="lastName"
                    placeholder="walker"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Age:</label>
                  <input
                    name="age"
                    placeholder="Age"
                    type="number"
                    onChange={onChange}
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Phone Number:</label>
                  <input
                    type="tel"
                    pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                    value={phone}
                    onChange={phoneChange}
                    placeholder="012-345-6789"
                    name="phoneNumber"
                    required
                  />
                </div>
                <div className="input_field">
                  <label>Email:</label>
                  <input
                    name="email"
                    type="email"
                    placeholder="email@gmail.com"
                    autoComplete="off"
                    onChange={onChange}
                  />
                </div>
                <PasswordValidator />
                <button name="submit">Submit</button>
              </form>
            </div>
            <div className="outputContainer">
              <Output firstName={firstName} lastName={lastName} />
            </div>
            <button onClick={handleLogOutRedirect}>Logout</button>
          </div>
        ) : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <button
          className="signInButton"
          onClick={handleLoginRedirect}
          variant="primary"
        >
          Sign in
        </button>
      </UnauthenticatedTemplate>
    </div>
  );
}
