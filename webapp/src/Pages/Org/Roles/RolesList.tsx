import { Title, Text } from "@mantine/core";
import RoleListTable from "../../../Components/RoleListTable/RoleListTable";

function RolesList() {
  return (
    <div>
      <Title order={3}>Roles</Title>
      <Text>This is the list of Roles, or positions, that people can be assigned to.</Text>
      <RoleListTable />
    </div>
  );
}

export default RolesList;
