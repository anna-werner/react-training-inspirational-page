import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearErrorMessage } from "./errorSlice";
import "./error.css";

const Error = () => {
  const { errorMessage, retryHandler } = useSelector((state) => state.error);
  const dispatch = useDispatch();

  if (!errorMessage) {
    return null;
  }

  return (
    <div id="error-message-container">
      <p>{errorMessage}</p>
      <button
        aria-label="Dismiss error"
        onClick={() => {
          dispatch(retryHandler());
          dispatch(clearErrorMessage());
        }}
      >
        X
      </button>
    </div>
  );
};

export default Error;
