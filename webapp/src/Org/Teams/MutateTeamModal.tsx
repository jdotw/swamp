import { Box, Button, Group, Modal, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React from "react";
import { MutateTeam } from "../../Client/Team";

export const MutateTeamModalTestID = "mutate-team-modal";

export enum MutateTeamModalMode {
  Create = "Create",
  Edit = "Edit",
}

type MutateTeamModalValues = {
  name: string;
};

export interface MutateTeamModalProps {
  mode?: MutateTeamModalMode;
  team?: MutateTeam;
  opened: boolean;
  onSubmit: (updatedTeam: MutateTeam) => void;
  onClose: () => void;
}

function MutateTeamModal({
  mode = MutateTeamModalMode.Create,
  team,
  opened,
  onSubmit,
  onClose,
}: MutateTeamModalProps) {
  const form = useForm({
    initialValues: {
      name: team?.name ?? "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const title = mode === MutateTeamModalMode.Create ? "Add Team" : "Edit Team";

  const submitForm = (values: MutateTeamModalValues) => {
    // Make sure we update a copy, not the actual individual
    let updatedTeam: MutateTeam = { ...team, name: values.name };
    onSubmit(updatedTeam);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose}>
      <Box sx={{ maxWidth: 300 }} mx="auto" data-testid={MutateTeamModalTestID}>
        <Title>{title}</Title>
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="team name"
            {...form.getInputProps("name")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === MutateTeamModalMode.Create && "Add"}
              {mode === MutateTeamModalMode.Edit && "Update"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}

export default MutateTeamModal;
