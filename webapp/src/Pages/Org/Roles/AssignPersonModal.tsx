import { useState } from "react";
import {
  Avatar,
  Text,
  Button,
  Paper,
  Modal,
  Group,
  Select,
} from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Person, usePerson } from "../../../Client/Person";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  MutateItemModalMode,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { Role } from "../../../Client/Role";
import Loading from "../../../Components/Loading/Loading";
import { MutateRoleAssignment } from "../../../Client/RoleAssignment";

export interface AssignPersonModalProps {
  role: Role;
  opened: boolean;
  onSubmit: (roleAssignment: MutateRoleAssignment) => void;
  onClose: () => void;
}

export function AssignPersonModal({
  role,
  opened,
  onSubmit,
  onClose,
}: AssignPersonModalProps) {
  const { items: people, loading: loadingPeople } = usePerson();

  if (loadingPeople) {
    return <Loading />;
  }

  const fields: MutateItemModalFormField[] = [
    {
      key: "person_id",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Person must be selected"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    // Make sure we update a copy, not the actual person
    let roleAssignment: MutateRoleAssignment = {
      person_id: parseInt(values.person_id),
      role_id: role.id,
    };
    onSubmit(roleAssignment);
  };

  return (
    <MutateItemModal
      mode={"create"}
      fields={fields}
      opened={opened}
      onSubmit={submitFormValues}
      onClose={onClose}
      title={"Assign Person to Role"}
    >
      <Select
        key="person_id"
        label="Person"
        placeholder="select person"
        data={people.map((person) => {
          return {
            value: person.id.toString(),
            label: `${person.first_name} ${person.last_name}`,
          };
        })}
      />
    </MutateItemModal>
  );
}
