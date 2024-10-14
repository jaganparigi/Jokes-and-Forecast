import { useState } from "react";

export default function PasswordValidator() {
  const [password, setPassword] = useState("");

  const patterns = [
    { regex: /(?=.*[a-z])/, description: "lowercase letter" },
    { regex: /(?=.*[A-Z])/, description: "uppercase letter" },
    { regex: /(?=.*\d)/, description: "number" },
    { regex: /(?=.*[!@#$%^&*])/, description: "special character" },
    { regex: /.{8,}/, description: "minimum of 8 characters" },
  ];

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const renderIndicators = () => {
    if (password.length === 0) {
      return null;
    }
    return patterns.map((pattern, index) => {
      const isValid = pattern.regex.test(password) && password.length > 0;
      return (
        <li key={index}>
          {`Password contains: ${pattern.description}`}
          <span
            style={{
              color: isValid ? "darkgreen" : "red",
              fontSize: "20px",
            }}
          >
            {isValid ? "✓" : "x"}
          </span>
        </li>
      );
    });
  };
  return (
    <div className="input_field">
      <label>Password:</label>
      <input
        name="password"
        type="password"
        pattern="/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/"
        placeholder="*********"
        required
        onChange={handlePasswordChange}
        autoComplete="off"
      />
      <ul>{renderIndicators()}</ul>
    </div>
  );
}
