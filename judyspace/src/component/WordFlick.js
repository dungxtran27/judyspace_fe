import React, { useEffect, useState } from "react";

const WordFlick = () => {
  const [part, setPart] = useState("");
  const words = [
    "content creator",
    "the dreamer",
    "the Conqueror",
    "exiter trộm chó",
  ];
  let i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 10,
    speed = 150;

  useEffect(() => {
    const interval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count === skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset === 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      setPart(words[i].substr(0, offset));
      if (skip_count === 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
    }, speed);
    return () => clearInterval(interval);
  }, []);

  return <div className="word">{part}</div>;
};

export default WordFlick;
