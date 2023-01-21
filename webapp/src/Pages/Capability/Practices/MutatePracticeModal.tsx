import { TextInput } from "@mantine/core";
import { MutatePractice, Practice } from "../../../Client/Practice";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutatePracticeModalProps {
  practice?: Practice;
  opened: boolean;
  onSubmit: (updatedPractice: MutatePractice) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
  title: string;
}

export function MutatePracticeModal({
  practice,
  opened,
  onSubmit,
  onClose,
  mode,
  title,
}: MutatePracticeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: practice?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual practice
    let updatedPractice: MutatePractice = {
      name: values.name,
      formed_date: new Date().toISOString(),
    };
    onSubmit(updatedPractice);
  };

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={title}
    >
      <TextInput
        key="name"
        withAsterisk
        label="Name"
        placeholder="practice name"
      />
    </MutateItemModal>
  );
}
