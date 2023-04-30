import {
  Select,
  SelectItem,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { CapabilityType, MutateCapabilityType } from "../../../Client/CapabilityTypes";
import { RoleType } from "../../../Client/RoleType";

export interface MutateCapabilityTypeModalProps {
  capabilityType?: CapabilityType;
  parentCandidates?: CapabilityType[];
  roleTypeCandidates?: RoleType[];
  opened: boolean;
  onSubmit: (capabilityType: MutateCapabilityType) => void;
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
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: capabilityType?.name
    },
    {
      key: "parent_id",
      initialValue: "",
      value: capabilityType?.parent_id?.toString()
    },
    {
      key: "role_type_id",
      initialValue: "",
      value: capabilityType?.role_type_id?.toString()
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual capabilityType
    console.log("SUBMIT VALUES: ", values);
    let capabilityType: MutateCapabilityType = {
      name: values.name,
      parent_id: parseInt(values.parent_id) ?? undefined,
      role_type_id: parseInt(values.role_type_id) ?? undefined,
    };
    console.log("SUBMIT: ", capabilityType);
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
