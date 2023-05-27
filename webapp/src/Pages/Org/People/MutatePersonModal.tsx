import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { Person, PersonCreateInput, PersonUpdateInput } from "@/Utils/trpc";

export interface MutatePersonModalProps {
  person?: Person;
  opened: boolean;
  onSubmit: (updatedPerson: PersonCreateInput | PersonUpdateInput) => void;
  onClose: () => void;
  title: string;
}

export function MutatePersonModal({
  person,
  opened,
  onSubmit,
  onClose,
  title,
}: MutatePersonModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "first_name",
      value: person?.first_name,
      validation: (value) => nonEmptyString(value, "First name is required"),
    },
    {
      key: "external_id",
      value: person?.external_id,
      validation: (value) => nonEmptyString(value, "External ID is required"),
    },
    {
      key: "middle_names",
      value: person?.middle_names,
    },
    {
      key: "last_name",
      value: person?.last_name,
      validation: (value) => nonEmptyString(value, "Last name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const updatedPerson = {
      ...person,
      external_id: values.external_id,
      first_name: values.first_name,
      middle_names: values.middle_names,
      last_name: values.last_name,
    };
    onSubmit(updatedPerson);
  };

  return (
    <MutateItemModal
      mode={person ? "edit" : "create"}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={title}
    >
      <TextInput
        key="external_id"
        withAsterisk
        label="External ID"
        placeholder="external ID"
        disabled={person !== undefined}
      />
      <TextInput
        key="first_name"
        withAsterisk
        label="First Name"
        placeholder="first name"
      />
      <TextInput
        key="middle_names"
        label="Middle Names"
        placeholder="middle names (optional)"
      />
      <TextInput
        key="last_name"
        withAsterisk
        label="Last Name"
        placeholder="last name"
      />
    </MutateItemModal>
  );
}
