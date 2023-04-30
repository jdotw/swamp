import { MutateItemFormValues, MutateItemModal, MutateItemModalFormField, nonEmptyString } from "@/Components/MutateItemModal/MutateItemModal";
import { Select, TextInput } from "@mantine/core";
import { MutateTeam, Team } from "../../../Client/Team";

export const MutateTeamModalTestID = "mutate-team-modal";

export interface MutateTeamModalProps {
  mode: "edit" | "create";
  team?: MutateTeam;
  parentCandidates: Team[];
  opened: boolean;
  onSubmit: (updatedTeam: MutateTeam) => void;
  onClose: () => void;
}

function MutateTeamModal({
  mode = "create",
  team,
  opened,
  onSubmit,
  onClose,
  parentCandidates,
}: MutateTeamModalProps) {

  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      initialValue: "",
      // initialValue: team?.name ?? "",
      validation: (value) => nonEmptyString(value, "Name is required"),
      value: team?.name ?? "",
    },
    {
      key: "type",
      initialValue: "",
      // initialValue: team?.type ?? "delivery",
      validation: (value) => nonEmptyString(value, "Type is required"),
      value: team?.type ?? "delivery",
    },
    {
      key: "parent_id",
      initialValue: "",
      // initialValue: team?.parent_id?.toString() ?? "",
      value: team?.parent_id?.toString() ?? "",
    },
  ];

  const submitForm = (values: MutateItemFormValues) => {
    let updatedTeam: MutateTeam = {
      ...team!,
      name: values.name,
      type: values.type,
      parent_id: values.parentId ? parseInt(values.parentId) : undefined
    };
    onSubmit(updatedTeam);
  };

  const title = mode === "create" ? "Add Team" : "Edit Team";

  return (
    <MutateItemModal
      mode={mode}
      fields={fields}
      opened={opened}
      onSubmit={submitForm}
      onClose={onClose}
      title={title}
    >
      <Select
        key="type"
        label="Type"
        placeholder="select team type"
        defaultValue="delivery"
        data={[
          { label: "Delivery", value: "delivery" },
          { label: "Home", value: "home" },
        ]}
      />
      <TextInput
        key="name"
        withAsterisk
        label="Name"
        placeholder="team name"
      />
      <Select
        key="parentId"
        label="Parent"
        placeholder="none"
        data={parentCandidates.map((team) => {
          return {
            value: team.id.toString(),
            label: team.name,
          };
        })}
      />
    </MutateItemModal>
  );
}

export default MutateTeamModal;
