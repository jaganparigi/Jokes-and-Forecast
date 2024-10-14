import { useState } from "react";

export default function Input() {
  const [name, setName] = useState("");

  const Reverse = (event) => {
    event.preventDefault();
    const inputValue = event.target.elements.name.value;
    setName(inputValue);
  };

  const rev_text = name.split("").reverse().join("");

  return (
    <form onSubmit={Reverse}>
      <label>Name</label>
      <input type="text" id="name" required />
      <button>Submit</button>
      {rev_text}
    </form>
  );
}
