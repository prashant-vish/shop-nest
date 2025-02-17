import React from "react";
import { increment, incrementAsync, selectCount } from "./counterSlice";
import { useDispatch, useSelector } from "react-redux";

const Counter = () => {
  const count = useSelector(selectCount);
  const dispatch = useDispatch();
  return (
    <div>
      <div></div>
    </div>
  );
};

export default Counter;
