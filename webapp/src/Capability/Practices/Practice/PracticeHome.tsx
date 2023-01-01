import React from "react";
import { Outlet, useParams } from "react-router";

function PracticeHome() {
  let { practiceId } = useParams();
  return <div>PracticeHome: {practiceId}</div>;
}

export default PracticeHome;
