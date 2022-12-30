import React from "react";
import { useParams } from "react-router-dom";

function SquadHome() {
  const { tribeId, squadId: id } = useParams();
  return (
    <div>
      SquadHome: tribe:{tribeId} squad:{id}
    </div>
  );
}

export default SquadHome;
