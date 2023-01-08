import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutatePractice } from "../../Client/Practice";
import { MutatePracticeRoleType } from "../../Client/PracticeRoleType";

interface AddPracticeRoleTypeModalProps {
  opened: boolean;
  onSubmit: (roleType: MutatePracticeRoleType) => void;
  onClose: () => void;
}

type AddPracticeRoleTypeModalValues = {
  name: string;
};

export function AddPracticeRoleTypeModal({
  opened,
  onSubmit,
  onClose,
}: AddPracticeRoleTypeModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddPracticeRoleTypeModalValues) => {
    let newRoleType: MutatePracticeRoleType = {
      name: values.name,
    };
    onSubmit(newRoleType);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Practice Role Type">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="practice role type name"
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
