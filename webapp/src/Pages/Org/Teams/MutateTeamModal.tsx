import { Box, Button, Group, Modal, Select, TextInput, Title } from "@mantine/core";
import { useForm } from "@mantine/form";
import React, { FormEvent, useEffect } from "react";
import { MutateTeam, Team } from "../../../Client/Team";

export const MutateTeamModalTestID = "mutate-team-modal";

export interface MutateTeamModalProps {
  mode: "edit" | "create";
  team?: MutateTeam;
  parentCandidates: Team[];
  opened: boolean;
  onSubmit: (updatedTeam: MutateTeam) => void;
  onClose: () => void;
}

function MutateTeamModal({
  mode = "create",
  team,
  opened,
  onSubmit,
  onClose,
  parentCandidates,
}: MutateTeamModalProps) {

  const form = useForm({
    initialValues: {
      name: "",
      type: "delivery",
      parentId: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
      type: (value) => (/^(?!\s*$).+/.test(value) ? null : "Type is required"),
    },
  });

  const submitForm = (values: Record<string,string>) => {
    // Make sure we update a copy, not the actual individual
    let updatedTeam: MutateTeam = { 
      ...team!, 
      name: values.name, 
      type: values.type, 
      parent_id: values.parentId ? parseInt(values.parentId) : undefined 
    };
    onSubmit(updatedTeam);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    form.reset();
    if (team) {
     form.setValues({
      name: team?.name ?? "",
      type: team?.type ?? "delivery",
      parentId: team?.parent_id?.toString() ?? "",
      });
    } else {
     form.reset();
    }
  }, [team]);
  
  const title = mode === "create" ? "Add Team" : "Edit Team";

  return (
    <Modal opened={opened} onClose={onClose}>
      <Box sx={{ maxWidth: 300 }} mx="auto" data-testid={MutateTeamModalTestID}>
        <Title>{title}</Title>
        <form onSubmit={form.onSubmit(submitForm)}>
          <Select
            key="type"
            label="Type"
            placeholder="select team type"
            defaultValue="delivery"
            data={[
              { label: "Delivery", value: "delivery" },
              { label: "Home", value: "home" },
              ]}
            {...form.getInputProps("type")}
          />
          <TextInput
            withAsterisk
            label="Name"
            placeholder="team name"
            {...form.getInputProps("name")}
          />
          <Select
            key="parentId"
            label="Parent"
            placeholder="none"
            data={parentCandidates.map((team) => {
              return {
                value: team.id.toString(),
                label: team.name,
              };
            })}
            {...form.getInputProps("parentId")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" && "Add"}
              {mode === "edit" && "Update"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}

export default MutateTeamModal;
