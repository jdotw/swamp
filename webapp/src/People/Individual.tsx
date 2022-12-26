import React from "react";
import { useParams } from "react-router";

function Individual() {
  let { individualId } = useParams();
  return <div>Individual: {individualId}</div>;
}

export default Individual;
