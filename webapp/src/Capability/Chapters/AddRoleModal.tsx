import { Button, Modal, Group, Select } from "@mantine/core";
import { TextInput, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { MutateChapterRole } from "../../Client/ChapterRole";
import { useChapterRoleType } from "../../Client/ChapterRoleType";
import { useIndividual } from "../../Client/Individual";
import Loading from "../../Loading/Loading";

interface AddRoleModalProps {
  practiceId: string;
  chapterId: string;
  opened: boolean;
  onSubmit: (role: MutateChapterRole) => void;
  onClose: () => void;
}

type AddChapterFormValues = {
  individual_id: string;
  role_type_id: string;
};

export function AddRoleModal({
  opened,
  onSubmit,
  onClose,
  practiceId,
  chapterId,
}: AddRoleModalProps) {
  const { loading: loadingRoleTypes, roleTypes } = useChapterRoleType();
  const { loading: loadingPeople, items: individuals } = useIndividual();

  const form = useForm({
    initialValues: {
      individual_id: "",
      role_type_id: "",
    },

    validate: {
      // name: (value) => (/^[\s\w]+$/.test(value) ? null : "Name is required"),
    },
  });

  if (loadingRoleTypes || loadingPeople) {
    return <Loading />;
  }

  const roleTypesData = roleTypes.map((roleType) => {
    return { value: roleType.id.toString(), label: roleType.name };
  });

  const individualsData = individuals.map((individual) => {
    return {
      value: individual.id.toString(),
      label: individual.first_name + " " + individual.last_name,
    };
  });

  const submitForm = (values: AddChapterFormValues) => {
    let role: MutateChapterRole = {
      chapter_id: chapterId,
      practice_id: practiceId,
      individual_id: values.individual_id,
      chapter_role_type_id: values.role_type_id,
    };
    onSubmit(role);
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Add Role">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          <Select
            label="Role Type"
            placeholder="select role type"
            data={roleTypesData}
            {...form.getInputProps("role_type_id")}
          />
          <Select
            label="Individual"
            placeholder="select individual"
            data={individualsData}
            {...form.getInputProps("individual_id")}
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
