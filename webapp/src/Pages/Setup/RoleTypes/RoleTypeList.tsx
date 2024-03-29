import {
  Button,
  createStyles,
  ScrollArea,
  Table,
  Title,
  Text,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateRoleTypeModal } from "./MutateRoleTypeModal";
import { DeleteRoleTypeConfirmModal } from "./DeleteRoleTypeConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  retired: {
    color: "gray",
  },
}));

function RoleTypeList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem } = useRoleType();
  const [selectedRoleType, setSelectedRoleType] = useState<RoleType>();
  const [mutateModalOpen, setMutateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitRoleType = async (newRoleType: MutateRoleType) => {
    if (selectedRoleType) {
      await updateItem(selectedRoleType.id, newRoleType);
    } else {
      await createItem(newRoleType);
    }
    setMutateModalOpen(false);
  };

  const deleteRoleType = async () => {
    if (selectedRoleType) {
      const mutatation: MutateRoleType = {
        name: selectedRoleType.name,
        parent_id: selectedRoleType.parent_id,
        retired_at_date: new Date().toISOString(),
      };
      await updateItem(selectedRoleType.id, mutatation);
    }
    setDeleteModalOpen(false);
  }

  const roleTypeRow = (roleType: RoleType, level: number) => (
    <tr key={roleType.id.toString()}>
      <td>
        <Link className={roleType.retired_at_date ? classes.retired : ""} style={{ marginLeft: level * 20 }} to={roleType.id.toString()}>
          {roleType.name}
        </Link>
      </td>
      <td>TODO</td>
      <td>TODO</td>
      <td className={classes.rowButtonBar}>
        {!roleType.retired_at_date && (<>
          <Button onClick={() => {
            setSelectedRoleType(roleType);
            setMutateModalOpen(true);
          }}>Edit</Button>
          <Button onClick={() => {
            setSelectedRoleType(roleType);
            setDeleteModalOpen(true);
          }}>Delete</Button></>)}
      </td>
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
        <Text>
          Role Types are the job families or archetypes of the Roles to which
          people are assigned.
        </Text>
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
          <Button onClick={() => { setSelectedRoleType(undefined); setMutateModalOpen(true) }}>Add Role Type</Button>
        </div>
      </div>
      <MutateRoleTypeModal
        roleType={selectedRoleType}
        roleTypes={items}
        opened={mutateModalOpen}
        onSubmit={submitRoleType}
        onClose={() => setMutateModalOpen(false)}
      />
      <DeleteRoleTypeConfirmModal
        roleType={selectedRoleType}
        opened={deleteModalOpen}
        onConfirm={deleteRoleType}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}

export default RoleTypeList;
