import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./store";

export default function Count() {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  console.log(`state`, state);
  return (
    <div>
      <button
        onClick={() => {
          console.log(`state`, state);
        }}
        style={{ padding: "4px 8px" }}
      >
        Click
      </button>
      <button
        onClick={() => {
          //   console.log(`state`, state);
          dispatch(getUsers({ users: [1, 23] }));
        }}
        style={{ padding: "4px 8px" }}
      >
        Click
      </button>
    </div>
  );
}
