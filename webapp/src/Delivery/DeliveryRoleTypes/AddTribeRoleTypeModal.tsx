import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { NewTribe } from "../../Client/Tribe";
import { NewTribeRoleType } from "../../Client/TribeRoleTypes";

interface AddTribeRoleTypeModalProps {
  opened: boolean;
  onSubmit: (roleType: NewTribeRoleType) => void;
  onClose: () => void;
}

type AddTribeRoleTypeModalValues = {
  name: string;
};

export function AddTribeRoleTypeModal({
  opened,
  onSubmit,
  onClose,
}: AddTribeRoleTypeModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddTribeRoleTypeModalValues) => {
    let newRoleType: NewTribeRoleType = {
      name: values.name,
    };
    onSubmit(newRoleType);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Tribe Role Type">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="tribe role type name"
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
