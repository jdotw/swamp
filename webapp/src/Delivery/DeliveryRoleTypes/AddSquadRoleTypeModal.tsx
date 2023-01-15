import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NewSquadRoleType } from "../../Client/SquadRoleTypes";

interface AddSquadRoleTypeModalProps {
  opened: boolean;
  onSubmit: (roleType: NewSquadRoleType) => void;
  onClose: () => void;
}

type AddSquadRoleTypeModalValues = {
  name: string;
};

export function AddSquadRoleTypeModal({
  opened,
  onSubmit,
  onClose,
}: AddSquadRoleTypeModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddSquadRoleTypeModalValues) => {
    let newRoleType: NewSquadRoleType = {
      name: values.name,
    };
    onSubmit(newRoleType);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Squad Role Type">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="squad role type name"
            {...form.getInputProps("name")}
          />
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">Add</Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}
