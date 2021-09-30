import React, { useState, useEffect, useRef } from 'react';
import { FaThumbsUp } from 'react-icons/fa';

const Like = () => {
  // Hooks
  // -- state
  // --- local
  const [likes, setLikes] = useState(0);

  // -- side effect
  useEffect(() => {
    // fetching (using axios ir fetch) data from API using GET method
    setLikes(6);
  }, []);

  // Custom funtions
  let liked = useRef(false);

  const clickHandler = () => {
    if (!liked.current) {
      setLikes(likes + 1);

      liked.current = true;

      // fetching (using axios ir fetch) with POST/PUT method
    }

    return;
  };

  return (
    <button onClick={clickHandler}>
      <FaThumbsUp /> {likes}
    </button>
  );
};

export default Like;
