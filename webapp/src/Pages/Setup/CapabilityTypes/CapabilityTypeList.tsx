import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { MutateCapabilityTypeModal } from "./MutateCapabilityTypeModal";
import {
  CapabilityType,
  CapabilityTypeCreateInput,
  CapabilityTypeUpdateInput,
  RoleType,
  trpc,
} from "@/Utils/trpc";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
    marginRight: 10,
    gap: 10,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  roleRowName: {
    fontWeight: 800,
  },
  section: {
    marginTop: 20,
    paddingTop: 20,
    borderTop: "0.5px solid #ccc",
  },
}));

function CapabilityTypeList() {
  const { classes } = useStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [capabilityTypeToEdit, setCapabilityTypeToEdit] =
    useState<CapabilityType>();

  const query = trpc.capabilityTypes.list.useQuery();
  const create = trpc.capabilityTypes.create.useMutation();
  const update = trpc.capabilityTypes.update.useMutation();
  const remove = trpc.capabilityTypes.delete.useMutation();

  const roleTypesQuery = trpc.roleTypes.list.useQuery();

  if (query.isLoading || roleTypesQuery.isLoading) return <Loading />;

  const submitNewCapabilityType = async (
    newCapabilityType: CapabilityTypeUpdateInput | CapabilityTypeCreateInput
  ) => {
    if (capabilityTypeToEdit) {
      await update.mutateAsync({
        id: capabilityTypeToEdit.id,
        capabilityType: newCapabilityType as CapabilityTypeUpdateInput,
      });
    } else {
      await create.mutateAsync(newCapabilityType as CapabilityTypeCreateInput);
    }
    await query.refetch();
    setAddModalOpen(false);
  };

  const globalCapabilities = query.data?.filter(
    (capabilityType) => !capabilityType.role_type_id
  );

  const onEditClicked = (capabilityType: CapabilityType) => {
    setCapabilityTypeToEdit(capabilityType);
    setAddModalOpen(true);
  };

  const onDeleteClicked = (capabilityType: CapabilityType) => {
    remove.mutateAsync(capabilityType.id);
    query.refetch();
  };

  const onAddClicked = () => {
    setCapabilityTypeToEdit(undefined);
    setAddModalOpen(true);
  };

  const capabilityTypeRow = (capabilityType: CapabilityType, level: number) => (
    <tr key={capabilityType.id.toString()}>
      <td>
        <Link
          style={{ marginLeft: level * 20 }}
          to={capabilityType.id.toString()}
        >
          {capabilityType.name}
        </Link>
      </td>
      <td>
        <div className={classes.rowButtonBar}>
          <Button onClick={() => onEditClicked(capabilityType)}>Edit</Button>
          <Button onClick={() => onDeleteClicked(capabilityType)}>
            Delete
          </Button>
        </div>
      </td>
    </tr>
  );

  const capabilityTypeRows = (
    items: CapabilityType[],
    parent?: CapabilityType,
    level = 0
  ) =>
    items.reduce((acc, capabilityType) => {
      if (capabilityType.parent_id == parent?.id) {
        acc.push(capabilityTypeRow(capabilityType, level));
        acc.push(...capabilityTypeRows(items, capabilityType, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  const roleTypeRow = (roleType: CapabilityType, level: number) => (
    <tr key={`roleType-${roleType.id.toString()}`}>
      <td>
        <Link
          style={{ marginLeft: level * 20 }}
          className={classes.roleRowName}
          to={roleType.id.toString()}
        >
          {roleType.name}
        </Link>
      </td>
      <td></td>
    </tr>
  );

  const roleTypesWithCapbilitiesRows = (parent?: RoleType, level = 0) =>
    (roleTypesQuery.data ?? []).reduce((acc, roleType) => {
      if (roleType.parent_id == parent?.id) {
        acc.push(roleTypeRow(roleType, level));
        acc.push(
          ...capabilityTypeRows(roleType.capability_types, undefined, level + 1)
        );
        acc.push(...roleTypesWithCapbilitiesRows(roleType, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Capability Types</Title>
        <Text>
          Capability Types describe how a Capability is deployed into a Team.
          For example, the Capability might be a member of the team
          (contributor), the Manager of the team, or a Support role in the team.
        </Text>
        <div className={classes.section}>
          <Title order={4}>Global Capabilities</Title>
          <Text>
            Global Capabilities can be applied to any Role Type. These would
            typically be a capability that is not specific to a particular job
            family. For example, any job family could be a Chapter Lead.
          </Text>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{capabilityTypeRows(globalCapabilities ?? [])}</tbody>
          </Table>
        </div>
        <div className={classes.section}>
          <Title order={4}>Role-Specific Capabilities</Title>
          <Text>
            Role-Specific Capabilities can only be applied to a specific Role
            Type and any children of that Role Type. For example, a Software
            Engineer Role Type can have a React Web Capability, but a Product
            Role Type can not.
          </Text>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
                <th></th>
              </tr>
            </thead>
            <tbody>{roleTypesWithCapbilitiesRows()}</tbody>
          </Table>
          <div className={classes.buttonBar}>
            <Button onClick={onAddClicked}>Add Capability Type</Button>
          </div>
        </div>
      </div>
      <MutateCapabilityTypeModal
        capabilityType={capabilityTypeToEdit}
        parentCandidates={query.data}
        roleTypeCandidates={roleTypesQuery.data}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewCapabilityType}
      />
    </>
  );
}

export default CapabilityTypeList;
