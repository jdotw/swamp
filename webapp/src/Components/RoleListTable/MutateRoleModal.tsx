import { Select } from "@mantine/core";
import { useLevel } from "../../Client/Level";
import { MutateRole, Role } from "../../Client/Role";
import { useRoleType } from "../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../MutateItemModal/MutateItemModal";

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
  const { items: levels, loading: loadingLevels } = useLevel();
  const { items: role_types, loading: loadingRoleTypes } = useRoleType();

  if (loadingLevels || loadingRoleTypes) {
    return <div>Loading...</div>;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "role_type",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Type is required"),
    },
    {
      key: "level",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Level is required"),
    },
  ];

  const formValuesChanged = (_: MutateItemFormValues) => {
  };

  const submitFormValues = (values: MutateItemFormValues) => {
    let updatedRole: MutateRole = {
      role_type_id: parseInt(values.role_type),
      level_id: parseInt(values.level),
    };
    onSubmit(updatedRole);
  };

  return (
    <MutateItemModal
      mode={role ? "edit" : "create"}
      fields={fields}
      opened={opened}
      onChange={formValuesChanged}
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
        key="level"
        label="Level"
        placeholder="select role type"
        data={levels.reduce((acc, level) => {
          const title = `${level.individual_contributor_title} / ${level.manager_title}`;
          acc.push({
            value: level.id.toString(),
            label: title,
          });
          return acc;
        }, [] as { value: string; label: string }[])}
      />
    </MutateItemModal>
  );
}
