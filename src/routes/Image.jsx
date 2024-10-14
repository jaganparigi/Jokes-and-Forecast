import { React, useState, useEffect } from "react";

const Image = () => {
  const [index, setIndex] = useState(0);

  const onNext = () => {
    if (index >= 5) {
      setIndex(0);
    } else {
      setIndex(index + 1);
    }
  };

  const onPrevious = () => {
    if (index === 0) {
      setIndex(5);
    } else {
      setIndex(index - 1);
    }
  };

  return (
    <div>
      <img
        src={`https://picsum.photos/id/${index}/200/500`}
        alt="Image"
        width="500"
        height="500"
      />
      {index}
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
    </div>
  );
};

export default Image;
