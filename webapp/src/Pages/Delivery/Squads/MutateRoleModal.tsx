import { Select, TextInput } from "@mantine/core";
import { useState } from "react";
import { formatPostcssSourceMap } from "vite";
import { FunctionType, useFunctionType } from "../../../Client/FunctionType";
import { useLevel } from "../../../Client/Level";
import { Practice } from "../../../Client/Practice";
import { MutateRole, Role } from "../../../Client/Role";
import { useRoleType } from "../../../Client/RoleType";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";

export interface MutateRoleModalProps {
  unit_id: number;
  unit_type: "squad" | "practice" | "team" | "tribe" | "chapter";
  role?: Role;
  opened: boolean;
  onSubmit: (updatedPractice: any) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
}

export function MutateRoleModal({
  role,
  opened,
  onSubmit,
  onClose,
  mode,
  unit_id,
  unit_type,
}: MutateRoleModalProps) {
  const { items: levels, loading: loadingLevels } = useLevel();
  const { items: role_types, loading: loadingRoleTypes } = useRoleType();
  const { items: function_types, loading: loadingFunctionTypes } =
    useFunctionType();
  const [selectedFunctionType, setSelectedFunctionType] =
    useState<FunctionType>();

  if (loadingLevels || loadingRoleTypes || loadingFunctionTypes) {
    return <div>Loading...</div>;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "role_type",
      initialValue: "",
      // initialValue: role?.role_type_id ?? "",
      validation: (value) => nonEmptyString(value, "Type is required"),
    },
    {
      key: "level",
      initialValue: "",
      // initialValue: role?.level_assignments?[0].id ?? "",
      validation: (value) => nonEmptyString(value, "Level is required"),
    },
    {
      key: "function_type",
      initialValue: "",
      // initialValue: role?.function_type_id ?? "",
      validation: (value) => nonEmptyString(value, "Function is required"),
    },
  ];

  const formValuesChanged = (values: MutateItemFormValues) => {
    let function_type = function_types.find(
      (function_type) => function_type.id === parseInt(values.function_type)
    );
    setSelectedFunctionType(function_type);
  };

  const submitFormValues = (values: MutateItemFormValues) => {
    let updatedRole: MutateRole = {
      role_type_id: parseInt(values.role_type),
      level_id: parseInt(values.level),
      function_type_id: parseInt(values.function_type),
      unit_id,
      unit_type,
    };
    onSubmit(updatedRole);
  };

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onChange={formValuesChanged}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={mode === "edit" ? "Edit Role" : "Add Role"}
    >
      <Select
        key="function_type"
        label="Function"
        placeholder="select function type"
        data={function_types.map((function_type) => {
          return {
            value: function_type.id.toString(),
            label: function_type.name,
          };
        })}
      />
      <Select
        key="role_type"
        label="Type"
        placeholder="select role type"
        data={role_types.map((role_type) => {
          return {
            value: role_type.id.toString(),
            label: role_type.title,
          };
        })}
      />
      <Select
        key="level"
        label="Level"
        placeholder="select role type"
        data={levels.reduce((acc, level) => {
          const title = selectedFunctionType?.is_individual_contributor
            ? level.individual_contributor_title
            : level.manager_title;
          if (title) {
            acc.push({
              value: level.id.toString(),
              label: title,
            });
          }
          return acc;
        }, [] as { value: string; label: string }[])}
      />
    </MutateItemModal>
  );
}
