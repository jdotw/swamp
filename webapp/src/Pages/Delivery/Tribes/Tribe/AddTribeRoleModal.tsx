import { Select, TextInput } from "@mantine/core";
import { Practice } from "../../../../Client/Practice";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../../Components/MutateItemModal/MutateItemModal";

export interface AddTribeRoleModalProps {
  opened: boolean;
  onSubmit: (updatedPractice: any) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
  title: string;
}

export function AddTribeRoleModal({
  opened,
  onSubmit,
  onClose,
  mode,
  title,
}: AddTribeRoleModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "function_type",
      initialValue: "member",
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual practice
    // let updatedPractice: AddTribeRole = {
    //   name: values.name,
    //   formed_date: new Date().toISOString(),
    // };
    onSubmit(values);
  };

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={title}
    >
      <Select
        key="role_type"
        label="Role Type"
        placeholder="select role type"
        data={[
          { value: "1", label: "Software Engineer" },
          { value: "2", label: "Quality Engineer" },
          { value: "3", label: "Product Manager" },
          { value: "4", label: "Product Designer" },
          { value: "5", label: "Engineering Manager" },
        ]}
      />
      <Select
        key="level"
        label="Level"
        placeholder="select role type"
        data={[
          { value: "1", label: "Graduate" },
          { value: "2", label: "Junior" },
          { value: "3", label: "Associate" },
          { value: "4", label: "Senior" },
          { value: "5", label: "Principal" },
          { value: "5", label: "Chief" },
          { value: "5", label: "Director" },
        ]}
      />
    </MutateItemModal>
  );
}
