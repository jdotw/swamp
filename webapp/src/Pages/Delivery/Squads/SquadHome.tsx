import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import Loading from "../../../Components/Loading/Loading";
import { useSquad } from "../../../Client/Squad";
import { MutateRoleModal } from "./MutateRoleModal";
import { useRole } from "../../../Client/Role";
import RoleListTable from "../../../Components/RoleListTable/RoleListTable";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
}));

interface SquadHomeProps {}

function SquadHome(props: SquadHomeProps) {
  const tribeId = +useParams().tribeId!;
  const id = +useParams().squadId!;
  const { classes, theme } = useStyles();
  const { items, loading } = useSquad({
    tribeId,
    id,
  });

  if (loading) {
    return <Loading />;
  }

  const squad = items && items.length > 0 ? items[0] : undefined;

  if (!id || !tribeId || !squad) {
    return <div>Squad not found</div>;
  }

  return (
    <>
      <div>
        <Title order={3}>Squad: {squad.name}</Title>
        <br />
        <Title order={4}>Roles</Title>
        <RoleListTable parentUnitId={tribeId} unitId={id} unitType={"squad"} />
      </div>
    </>
  );
}

export default SquadHome;
