import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateSquad, Squad } from "../../../../Client/Squad";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../../Components/MutateItemModal/MutateItemModal";

export interface MutateSquadModalProps {
  squad?: Squad;
  opened: boolean;
  onSubmit: (squad: MutateSquad) => void;
  onClose: () => void;
}

export function MutateSquadModal({
  squad,
  opened,
  onSubmit,
  onClose,
}: MutateSquadModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: squad?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    let squad: MutateSquad = {
      name: values.name,
      formed_date: new Date().toISOString(),
    };
    onSubmit(squad);
  };

  return (
    <MutateItemModal
      title={squad ? "Edit Squad" : "Add Squad"}
      mode={squad ? "edit" : "create"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
    >
      <TextInput
        key="name"
        withAsterisk
        label="Name"
        placeholder="squad name"
      />
    </MutateItemModal>
  );
}
