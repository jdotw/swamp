
import { Text, Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CapabilityType, MutateCapabilityType, useCapabilityType } from "../../../Client/CapabilityTypes";
import Loading from "../../../Components/Loading/Loading";
import { MutateCapabilityTypeModal } from "./MutateCapabilityTypeModal";
// import { MutateCapabilityTypeModal } from "./MutateCapabilityTypeModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function CapabilityTypeList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useCapabilityType();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewCapabilityType = async (newCapabilityType: MutateCapabilityType) => {
    await createItem(newCapabilityType);
    setAddModalOpen(false);
  };

  const capabilityTypeRow = (capabilityType: CapabilityType, level: number) => (
    <tr key={capabilityType.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={capabilityType.id.toString()}>
          {capabilityType.name}
        </Link>
      </td>
    </tr>
  );

  const capabilityTypeRows = (items: CapabilityType[], parent?: CapabilityType, level = 0) =>
    items.reduce((acc, capabilityType) => {
      if (capabilityType.parent_id == (parent?.id ?? 0)) {
        acc.push(capabilityTypeRow(capabilityType, level));
        acc.push(...capabilityTypeRows(items, capabilityType, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Capability Types</Title>
        <Text>Capability Types describe how a Capability is deployed into a Team. For example, the Capability might be a member of the team (contributor), the Manager of the team, or a Support role in the team.</Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{capabilityTypeRows(items)}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Capability Type</Button>
        </div>
      </div>
      <MutateCapabilityTypeModal
        parentCandidates={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewCapabilityType}
        mode="create"
      />
    </>
  );
}

export default CapabilityTypeList;
