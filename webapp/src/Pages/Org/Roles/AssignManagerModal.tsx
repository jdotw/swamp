import {
  Select,
} from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import { Role } from "../../../Client/Role";
import Loading from "../../../Components/Loading/Loading";
import { MutateManagerAssignment } from "@/Client/ManagerAssignment";
import { usePerson } from "@/Client/Person";

export interface AssignManagerModalProps {
  role: Role;
  opened: boolean;
  onSubmit: (roleAssignment: MutateManagerAssignment) => void;
  onClose: () => void;
}

export function AssignManagerModal({
  role,
  opened,
  onSubmit,
  onClose,
}: AssignManagerModalProps) {
  const { items: people, loading: loadingPeople } = usePerson();

  if (loadingPeople) {
    return <Loading />;
  }

  const managerCandidates = people.filter((person) => (person.active_role_assignment && person.active_role_assignment.role_id != role.id));

  const fields: MutateItemModalFormField[] = [
    {
      key: "manager_id",
      initialValue: "",
      validation: (value) => nonEmptyString(value, "Manager must be selected"),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    let roleAssignment: MutateManagerAssignment = {
      manager_id: parseInt(values.manager_id),
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
      title={"Assign Manager to Role"}
    >
      <Select
        key="manager_id"
        label="Manager"
        placeholder="select manager role"
        data={managerCandidates.map((person) => {
          return {
            value: person.active_role_assignment.role_id.toString(),
            label: `${person.first_name} ${person.last_name}`,
          };
        })}
      />
    </MutateItemModal>
  );
}
