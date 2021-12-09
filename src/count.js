import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "./store";

function useOurDispatch() {
  const dispatch = useDispatch();
  console.count("count");
  return (action) => {
    console.log(`action`, action);
    return new Promise((resolve, reject) => {
      const ac = {
        type: action.type1.toString(),
        payload: { resolve, reject },
      };
      dispatch(ac);
    });
  };
}

export default function Count() {
  const state = useSelector((state) => state);
  // const dispatch = useDispatch();
  const dispatch = useOurDispatch();
  console.log(`state`, state);
  console.log(`2999`, 2999);
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
      </button>{" "}
      <button
        onClick={() => {
          //   console.log(`state`, state);
          dispatch({ type: "saga" });
        }}
        style={{ padding: "4px 8px" }}
      >
        Click1
      </button>{" "}
      <button
        onClick={() => {
          //   console.log(`state`, state);
          dispatch({ type: "saga" });

          dispatch({ type: "saga2" });
        }}
        style={{ padding: "4px 8px" }}
      >
        Click2saga1
      </button>{" "}
      <button
        onClick={() => {
          //   console.log(`state`, state);
          // dispatch({ type: "saga" });

          dispatch({ type1: "saga2" }).then((res) => console.log(`res`, res));
        }}
        style={{ padding: "4px 8px" }}
      >
        Click2saga2
      </button>
    </div>
  );
}
