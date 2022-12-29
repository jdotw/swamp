import React from "react";
import { useParams } from "react-router-dom";

function TribeRoleTypeHome() {
  const { roleTypeId: id } = useParams();
  return <div>TribeRoleTypeHome: {id}</div>;
}

export default TribeRoleTypeHome;
