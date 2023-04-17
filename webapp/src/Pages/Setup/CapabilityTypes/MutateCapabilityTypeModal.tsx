import {
  Select,
  SelectItem,
} from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { CapabilityType, MutateCapabilityType } from "../../../Client/CapabilityTypes";

export interface MutateCapabilityTypeModalProps {
  capabilityType?: CapabilityType;
  parentCandidates?: CapabilityType[];
  opened: boolean;
  onSubmit: (capabilityType: MutateCapabilityType) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateCapabilityTypeModal({
  capabilityType,
  parentCandidates,
  opened,
  onSubmit,
  onClose,
  mode,
}: MutateCapabilityTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: capabilityType?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
    {
      key: "parent_id",
      initialValue: "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual capabilityType
    let capabilityType: MutateCapabilityType = {
      name: values.name,
      parent_id: parseInt(values.parent_id) ?? undefined,
    };
    onSubmit(capabilityType);
  };

  const parentCapabilityTypeData = () =>
    (parentCandidates ?? []).map((capabilityType) => ({
      value: capabilityType.id.toString(),
      label: capabilityType.name,
    })) as SelectItem[];
    
  return (
    <MutateItemModal
      title={mode === "edit" ? "Edit Capability Type" : "Add Capability Type"}
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
        placeholder="parent capabilityType"
        data={parentCapabilityTypeData()}
      />
    </MutateItemModal>
  );
}
