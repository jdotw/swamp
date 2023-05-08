import {
  Select,
  SelectItem,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import { MutateRoleType, RoleType } from "../../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateRoleTypeModalProps {
  roleType?: RoleType;
  roleTypes?: RoleType[];
  opened: boolean;
  onSubmit: (roleType: MutateRoleType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateRoleTypeModal({
  roleType,
  roleTypes,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateRoleTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: roleType?.name,
    },
    {
      key: "parent_id",
      value: roleType?.parent_id?.toString(),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual roleType
    const roleType: MutateRoleType = {
      name: values.name,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(roleType);
  };

  const parentRoleTypeData = () =>
    (roleTypes ?? []).map((roleType) => ({
      value: roleType.id.toString(),
      label: roleType.name,
    })) as SelectItem[];

  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit RoleType" : "Add RoleType"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={mode}
    >
      <TextInput key="name" withAsterisk label="Name" placeholder="name" />
      <Select
        key="parent_id"
        label="Parent"
        placeholder="parent role type"
        data={parentRoleTypeData()}
      />
    </MutateItemModal>
  );
}
