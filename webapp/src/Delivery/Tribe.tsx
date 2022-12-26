import React from "react";
import { useParams } from "react-router";

function Tribe() {
  let { tribeId } = useParams();
  return <div>Tribe: {tribeId}</div>;
}

export default Tribe;
