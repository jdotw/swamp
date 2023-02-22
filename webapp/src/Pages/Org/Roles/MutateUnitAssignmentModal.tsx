import { Select, TextInput } from "@mantine/core";
import {
  MutateUnitAssignment,
  UnitAssignment,
} from "../../../Client/UnitAssignment";
import { Role } from "../../../Client/Role";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { useFunctionType } from "../../../Client/FunctionType";
import { useState } from "react";
import { useTribe } from "../../../Client/Tribe";
import { useSquad } from "../../../Client/Squad";
import { usePractice } from "../../../Client/Practice";
import { useChapter } from "../../../Client/Chapter";
import Loading from "../../../Components/Loading/Loading";

export type MutateUnitAssignmentType = "delivery" | "capability";

export interface MutateUnitAssignmentModalProps {
  role: Role;
  unitAssignment?: UnitAssignment;
  opened: boolean;
  onSubmit: (updatedUnitAssignment: MutateUnitAssignment) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
  assignmentType: MutateUnitAssignmentType;
}

export function MutateUnitAssignmentModal({
  role,
  unitAssignment,
  opened,
  onSubmit,
  onClose,
  mode,
  assignmentType,
}: MutateUnitAssignmentModalProps) {
  const { items: function_types, loading: loadingFunctionTypes } =
    useFunctionType();
  const [parentUnitId, setParentUnitId] = useState<number>();
  const { items: tribes, loading: loadingTribes } = useTribe({
    loadOnMount: assignmentType === "delivery",
  });
  const { items: squads, loading: loadingSquads } = useSquad({
    tribeId: parentUnitId,
    loadOnMount: assignmentType === "delivery" && parentUnitId !== undefined,
  });
  const { items: practices, loading: loadingPractices } = usePractice({
    loadOnMount: assignmentType === "capability",
  });
  const { items: chapters, loading: loadingChapters } = useChapter({
    practiceId: parentUnitId,
    loadOnMount: assignmentType === "capability" && parentUnitId !== undefined,
  });

  const fields: MutateItemModalFormField[] = [
    {
      key: "function_type_id",
      initialValue: unitAssignment?.function_type.id.toString() ?? "",
      validation: (value) => nonEmptyString(value, "Function type is required"),
    },
    {
      key: "parent_unit_id",
      initialValue: unitAssignment?.unit.id.toString() ?? "",
      validation: (value) => nonEmptyString(value, "Unit is required"),
    },
    {
      key: "unit_id",
      initialValue: unitAssignment?.unit.id.toString() ?? "",
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual practice
    let unitAssignment: MutateUnitAssignment = {
      role_id: role.id,
      function_type_id: parseInt(values.function_type_id),
      unit_id: parseInt(values.unit_id),
    };
    onSubmit(unitAssignment);
  };

  const onFormChanged = (values: MutateItemFormValues) => {
    if (values.parent_unit_id) {
      setParentUnitId(parseInt(values.parent_unit_id));
    } else {
      setParentUnitId(undefined);
    }
  };

  const parentUnits = assignmentType === "delivery" ? tribes : practices;
  const units = assignmentType === "delivery" ? squads : chapters;

  if (loadingFunctionTypes || loadingTribes || loadingPractices)
    return <Loading />;

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      onChange={onFormChanged}
      title={mode === "edit" ? "Change Assignment" : "Assign Role"}
    >
      <Select
        key="function_type_id"
        label="Function"
        placeholder="select function type"
        data={function_types.map((function_type) => {
          return {
            value: function_type.id.toString(),
            label: function_type.name,
          };
        })}
        defaultValue={unitAssignment?.function_type.id.toString()}
      />
      <Select
        key="parent_unit_id"
        label={assignmentType === "delivery" ? "Tribe" : "Practice"}
        placeholder={`select ${
          assignmentType === "delivery" ? "tribe" : "practice"
        }`}
        data={parentUnits.map((unit) => {
          return {
            value: unit.id.toString(),
            label: unit.name,
          };
        })}
      />
      <Select
        disabled={parentUnitId === undefined}
        key="unit_id"
        label={assignmentType === "delivery" ? "Squad" : "Chapter"}
        placeholder={`select ${
          assignmentType === "delivery" ? "squad" : "chapter"
        }`}
        data={units.map((unit) => {
          return {
            value: unit.id.toString(),
            label: unit.name,
          };
        })}
      />
    </MutateItemModal>
  );
}
