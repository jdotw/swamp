import { Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { MutateRoleType, useRoleType } from "../../../Client/RoleType";
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

function RolesList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useRoleType();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewRoleType = async (newRoleType: MutateRoleType) => {
    await createItem(newRoleType);
    setAddModalOpen(false);
  };

  const roleTypeElements = items.map((roleType) => (
    <tr key={roleType.id.toString()}>
      <td>
        <Link to={roleType.id.toString()}>{roleType.title}</Link>
      </td>
      <td>TODO</td>
      <td>TODO</td>
    </tr>
  ));

  return (
    <>
      <div>
        <Title order={3}>Role Types</Title>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Vacant</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>{roleTypeElements}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Role Type</Button>
        </div>
      </div>
      <MutateRoleTypeModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewRoleType}
        mode="create"
      />
    </>
  );
}

export default RolesList;
