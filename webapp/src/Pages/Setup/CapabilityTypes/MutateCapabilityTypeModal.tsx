import { Select, SelectItem } from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  CapabilityType,
  CapabilityTypeCreateInput,
  CapabilityTypeUpdateInput,
  RoleType,
} from "@/Utils/trpc";

export interface MutateCapabilityTypeModalProps {
  capabilityType?: CapabilityType;
  parentCandidates?: CapabilityType[];
  roleTypeCandidates?: RoleType[];
  opened: boolean;
  onSubmit: (
    capabilityType: CapabilityTypeCreateInput | CapabilityTypeUpdateInput
  ) => void;
  onClose: () => void;
}

export function MutateCapabilityTypeModal({
  capabilityType,
  parentCandidates,
  roleTypeCandidates,
  opened,
  onSubmit,
  onClose,
}: MutateCapabilityTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: capabilityType?.name,
    },
    {
      key: "parent_id",
      value: capabilityType?.parent_id?.toString(),
    },
    {
      key: "role_type_id",
      value: capabilityType?.role_type_id?.toString(),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const capabilityType = {
      name: values.name,
      parent_id: values.parent_id ? parseInt(values.parent_id) : undefined,
      role_type_id: values.role_type_id
        ? parseInt(values.role_type_id)
        : undefined,
    };
    onSubmit(capabilityType);
  };

  const parentCapabilityTypeData = () =>
    (parentCandidates ?? []).map((capabilityType) => ({
      value: capabilityType.id.toString(),
      label: capabilityType.name,
    })) as SelectItem[];

  const roleTypeData = () =>
    (roleTypeCandidates ?? []).map((capabilityType) => ({
      value: capabilityType.id.toString(),
      label: capabilityType.name,
    })) as SelectItem[];

  return (
    <MutateItemModal
      title={capabilityType ? "Edit Capability Type" : "Add Capability Type"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={capabilityType ? "edit" : "create"}
    >
      <TextInput key="name" withAsterisk label="Name" placeholder="name" />
      <Select
        key="parent_id"
        label="Parent"
        placeholder="parent capabilityType"
        data={parentCapabilityTypeData()}
      />
      <Select
        key="role_type_id"
        label="Role Type"
        placeholder="role type"
        data={roleTypeData()}
      />
    </MutateItemModal>
  );
}
