import React from "react";

function Symbol({ item }) {
  return (
    <div>
      <img
        src={item.src}
        alt=""
        // ref={(element) => (reelOneImages.current[index] = element)}
        id={item.value}
      />
    </div>
  );
}

export default Symbol;
