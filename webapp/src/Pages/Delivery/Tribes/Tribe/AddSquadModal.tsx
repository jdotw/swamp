import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateSquad } from "../../../../Client/Squad";

interface AddSquadModalProps {
  opened: boolean;
  onSubmit: (squad: MutateSquad) => void;
  onClose: () => void;
}

type AddSquadModalValues = {
  name: string;
};

export function AddSquadModal({
  opened,
  onSubmit,
  onClose,
}: AddSquadModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddSquadModalValues) => {
    let squad: MutateSquad = {
      name: values.name,
      formed_date: new Date().toISOString(),
    };
    onSubmit(squad);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Squad">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="squad name"
            {...form.getInputProps("name")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
