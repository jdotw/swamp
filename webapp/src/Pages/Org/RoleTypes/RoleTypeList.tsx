import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateRoleTypeModal } from "./MutateRoleTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function RoleTypeList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useRoleType();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewRoleType = async (newRoleType: MutateRoleType) => {
    await createItem(newRoleType);
    setAddModalOpen(false);
  };

  const roleTypeRow = (roleType: RoleType, level: number) => (
    <tr key={roleType.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={roleType.id.toString()}>
          {roleType.name}
        </Link>
      </td>
      <td>TODO</td>
      <td>TODO</td>
    </tr>
  );

  const roleTypeElements = (parent?: RoleType, level = 0) =>
    items.reduce((acc, roleType) => {
      if (roleType.parent?.id == parent?.id) {
        acc.push(roleTypeRow(roleType, level));
        acc.push(...roleTypeElements(roleType, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Role Types</Title>
        <Text>Role Types are the job families or archetypes of the Roles to which people are assigned.</Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Vacant</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{roleTypeElements()}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role Type</Button>
        </div>
      </div>
      <MutateRoleTypeModal
        roleTypes={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewRoleType}
        mode="create"
      />
    </>
  );
}

export default RoleTypeList;
