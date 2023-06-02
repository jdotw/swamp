import { Select, SelectItem } from "@mantine/core";
import { TextInput } from "@mantine/core";
import {
  MutateItemFormValues,
  MutateItemModal,
  MutateItemModalFormField,
  nonEmptyString,
} from "../../../Components/MutateItemModal/MutateItemModal";
import {
  DeploymentType,
  MutateDeploymentType,
} from "../../../Client/DeploymentTypes";

export interface MutateDeploymentTypeModalProps {
  deploymentType?: DeploymentType;
  parentCandidates?: DeploymentType[];
  opened: boolean;
  onSubmit: (deploymentType: MutateDeploymentType) => void;
  onClose: () => void;
}

export function MutateDeploymentTypeModal({
  deploymentType,
  parentCandidates,
  opened,
  onSubmit,
  onClose,
}: MutateDeploymentTypeModalProps) {
  const fields: MutateItemModalFormField[] = [
    {
      key: "name",
      value: deploymentType?.name,
      validation: (value) => nonEmptyString(value, "Name is required"),
    },
    {
      key: "parent_id",
      value: deploymentType?.parent_id?.toString(),
    },
  ];

  const submitFormValues = (values: MutateItemFormValues) => {
    const deploymentType: MutateDeploymentType = {
      name: values.name,
      parent_id: values.parent_id ? parseInt(values.parent_id) : undefined,
    };
    onSubmit(deploymentType);
  };

  const parentDeploymentTypeData =
    parentCandidates?.reduce((acc, dt) => {
      if (dt.id === deploymentType?.id) {
        return acc;
      } else {
        acc.push({
          value: dt.id.toString(),
          label: dt.name,
        });
        return acc;
      }
    }, [] as SelectItem[]) ?? [];

  return (
    <MutateItemModal
      title={deploymentType ? "Edit Deployment Type" : "Add Deployment Type"}
      opened={opened}
      onClose={onClose}
      fields={fields}
      onSubmit={submitFormValues}
      mode={deploymentType ? "edit" : "create"}
    >
      <TextInput key="name" withAsterisk label="Name" placeholder="name" />
      <Select
        clearable
        key="parent_id"
        label="Parent"
        placeholder="parent deployment type"
        data={parentDeploymentTypeData}
      />
    </MutateItemModal>
  );
}
