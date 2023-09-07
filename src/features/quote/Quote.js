import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getQuote } from "./quoteSlice";
import "./quote.css";

const Quote = () => {
  const { quote, author } = useSelector((state) => state.quote);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuote());
  }, [dispatch]);

  return (
    <div id="quote">
      <blockquote className="quote-message">“{quote}”</blockquote>
      <cite className="quote-author">{author}</cite>
    </div>
  );
};

export default Quote;
