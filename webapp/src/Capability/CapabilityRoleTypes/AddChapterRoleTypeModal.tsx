import { Button, Modal, Group } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateChapterRoleType } from "../../Client/ChapterRoleType";

interface AddChapterRoleTypeModalProps {
  opened: boolean;
  onSubmit: (roleType: MutateChapterRoleType) => void;
  onClose: () => void;
}

type AddChapterRoleTypeModalValues = {
  name: string;
};

export function AddChapterRoleTypeModal({
  opened,
  onSubmit,
  onClose,
}: AddChapterRoleTypeModalProps) {
  const form = useForm({
    initialValues: {
      name: "",
    },

    validate: {
      name: (value) => (/^(?!\s*$).+/.test(value) ? null : "Name is required"),
    },
  });

  const submitForm = (values: AddChapterRoleTypeModalValues) => {
    let newRoleType: MutateChapterRoleType = {
      name: values.name,
    };
    onSubmit(newRoleType);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Chapter Role Type">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <TextInput
            withAsterisk
            label="Name"
            placeholder="chapter role type name"
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
