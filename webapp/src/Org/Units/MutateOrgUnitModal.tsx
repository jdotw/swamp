import { Box, Button, Group, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { MutateOrg } from "../../Client/Org";

export const MutateOrgUnitModalTestID = "mutate-org-unit-modal";

export enum MutateOrgUnitModalMode {
  Create = "Create",
  Edit = "Edit",
}

type MutateOrgUnitModalValues = {
  name: string;
};

export interface MutateOrgUnitModalProps {
  mode?: MutateOrgUnitModalMode;
  org?: MutateOrg;
  opened: boolean;
  onSubmit: (updatedOrgUnit: MutateOrg) => void;
  onClose: () => void;
}

function MutateOrgUnitModal({
  mode = MutateOrgUnitModalMode.Create,
  org,
  opened,
  onSubmit,
  onClose,
}: MutateOrgUnitModalProps) {
  const form = useForm({
    initialValues: {
      name: org?.name ?? "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const title =
    mode === MutateOrgUnitModalMode.Create ? "Add Org Unit" : "Edit Org Unit";

  const submitForm = (values: MutateOrgUnitModalValues) => {
    // Make sure we update a copy, not the actual individual
    let updatedOrgUnit: MutateOrg = { ...org, name: values.name };
    onSubmit(updatedOrgUnit);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Box
        sx={{ maxWidth: 300 }}
        mx="auto"
        data-testid={MutateOrgUnitModalTestID}
      >
        <Title>{title}</Title>
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="org unit name"
            {...form.getInputProps("name")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === MutateOrgUnitModalMode.Create && "Add"}
              {mode === MutateOrgUnitModalMode.Edit && "Update"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}

export default MutateOrgUnitModal;