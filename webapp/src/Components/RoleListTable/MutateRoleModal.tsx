import { Select } from "@mantine/core";
import { MutateRole, Role } from "../../Client/Role";
import { useRoleType } from "../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../MutateItemModal/MutateItemModal";
import { useTitle } from "@/Client/Title";

export interface MutateRoleModalProps {
  role?: Role;
  opened: boolean;
  onSubmit: (updatedRole: MutateRole) => void;
  onClose: () => void;
}

export function MutateRoleModal({
  role,
  opened,
  onSubmit,
  onClose,
}: MutateRoleModalProps) {
  const { items: titles, loading: loadingTitles } = useTitle();
  const { items: role_types, loading: loadingRoleTypes } = useRoleType();

  if (loadingRoleTypes || loadingTitles) {
    return <div>Loading...</div>;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "role_type",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Type is required"),
    },
    {
      key: "title",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Title is required"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const updatedRole: MutateRole = {
      role_type_id: parseInt(values.role_type),
      title_id: parseInt(values.title),
    };
    onSubmit(updatedRole);
  };

  return (
    <MutateItemModal
      mode={role ? "edit" : "create"}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={role ? "Edit Role" : "Add Role"}
    >
      <Select
        key="role_type"
        label="Type"
        placeholder="select role type"
        data={role_types.map((role_type) => {
          return {
            value: role_type.id.toString(),
            label: role_type.name,
          };
        })}
      />
      <Select
        key="title"
        label="Title"
        placeholder="select role title"
        data={titles.reduce((acc, title) => {
          acc.push({
            value: title.id.toString(),
            label: title.name,
          });
          return acc;
        }, [] as { value: string; label: string }[])}
      />
    </MutateItemModal>
  );
}
