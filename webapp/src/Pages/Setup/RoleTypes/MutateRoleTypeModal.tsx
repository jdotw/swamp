import { Select, SelectItem } from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  RoleType,
  RoleTypeCreateInput,
  RoleTypeUpdateInput,
} from "@/Utils/trpc";

export interface MutateRoleTypeModalProps {
  roleType?: RoleType;
  roleTypes?: RoleType[];
  opened: boolean;
  onSubmit: (roleType: RoleTypeCreateInput | RoleTypeUpdateInput) => void;
  onClose: () => void;
}

export function MutateRoleTypeModal({
  roleType,
  roleTypes,
  opened,
  onSubmit,
  onClose,
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
    const roleType = {
      name: values.name,
      parent_id: values.parent_id ? parseInt(values.parent_id) : undefined,
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
      title={roleType ? "Edit RoleType" : "Add RoleType"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={roleType ? "edit" : "create"}
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
