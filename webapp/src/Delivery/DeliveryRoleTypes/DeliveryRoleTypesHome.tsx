import { useState } from "react";
import { createStyles, Table, ScrollArea, Button, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../Loading/Loading";
import {
  NewTribeRoleType,
  TribeRoleType,
  useTribeRoleTypes,
} from "../../Client/TribeRoleTypes";
import {
  NewSquadRoleType,
  SquadRoleType,
  useSquadRoleTypes,
} from "../../Client/SquadRoleTypes";
import { AddTribeRoleTypeModal } from "./AddTribeRoleTypeModal";
import { AddSquadRoleTypeModal } from "./AddSquadRoleTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface DeliveryRoleTypesHomeProps {}

export function DeliveryRoleTypesHome(props: DeliveryRoleTypesHomeProps) {
  const { classes, theme } = useStyles();
  const {
    roleTypes: tribeRoleTypes,
    addTribeRoleType,
    loading: loadingTribeRoleTypes,
  } = useTribeRoleTypes();
  const {
    roleTypes: squadRoleTypes,
    addSquadRoleType,
    loading: loadingSquadRoleTypes,
  } = useSquadRoleTypes();
  const [addTribeRoleTypeModalOpen, setAddTribeRoleTypeModalOpen] =
    useState(false);
  const [addSquadRoleTypeModalOpen, setAddSquadRoleTypeModalOpen] =
    useState(false);

  if (loadingTribeRoleTypes || loadingSquadRoleTypes) {
    return <Loading />;
  }

  const tribeRows = tribeRoleTypes.map((row: TribeRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`triberoletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const squadRows = squadRoleTypes.map((row: SquadRoleType) => {
    const id = row.id.toString();
    return (
      <tr key={id}>
        <td>
          <Link to={`squadroletypes/${id}`}>{row.name}</Link>
        </td>
      </tr>
    );
  });

  const submitTribeRoleType = async (newTribe: NewTribeRoleType) => {
    await addTribeRoleType(newTribe);
    setAddTribeRoleTypeModalOpen(false);
  };

  const submitSquadRoleType = async (newSquad: NewSquadRoleType) => {
    await addSquadRoleType(newSquad);
    setAddSquadRoleTypeModalOpen(false);
  };

  return (
    <>
      <div>
        <Title order={3}>Tribe Role Types</Title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid={"tribe-role-types-table"}>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{tribeRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddTribeRoleTypeModalOpen(true)}>
            Add Tribe Role Type
          </Button>
        </div>
      </div>
      <div>
        <Title order={3}>Squad Role Types</Title>
        <ScrollArea>
          <Table verticalSpacing="xs" data-testid={"squad-role-types-table"}>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{squadRows}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddSquadRoleTypeModalOpen(true)}>
            Add Squad Role Type
          </Button>
        </div>
      </div>
      <AddTribeRoleTypeModal
        opened={addTribeRoleTypeModalOpen}
        onClose={() => setAddTribeRoleTypeModalOpen(false)}
        onSubmit={submitTribeRoleType}
      />
      <AddSquadRoleTypeModal
        opened={addSquadRoleTypeModalOpen}
        onClose={() => setAddSquadRoleTypeModalOpen(false)}
        onSubmit={submitSquadRoleType}
      />
    </>
  );
}

export default DeliveryRoleTypesHome;
