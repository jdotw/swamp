import React from "react";
import { Outlet, useParams } from "react-router";

function Practice() {
  let { practiceId } = useParams();
  return <div>Practice: {practiceId}</div>;
}

export default Practice;
