import {
  Button,
  createStyles,
  NumberInputHandlers,
  ScrollArea,
  Table,
} from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Role, useRole } from "../../Client/Role";
import { MutateRoleModal } from "../../Pages/Delivery/Squads/MutateRoleModal";
import Loading from "../Loading/Loading";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  vacantRole: {
    backgroundColor: "#ff000040",
  },
  filledRole: {},
}));

export interface RoleListTableProps {
  unitId?: number;
  parentUnitId?: number;
  unitType?: "tribe" | "squad" | "practice" | "chapter" | "team";
  showCapability?: boolean;
}

export const RoleListTablePropsDefaults = {
  showCapability: false,
};

const RoleListTable = ({
  unitId,
  parentUnitId,
  unitType,
  showCapability = true,
}: RoleListTableProps) => {
  const { classes, theme } = useStyles();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const {
    loading,
    items: roles,
    createItem: createRole,
  } = useRole({
    unitId,
    parentUnitId,
    unitType,
  });

  const submitNewRole = async (newRole: any) => {
    await createRole(newRole);
    setAddModalOpen(false);
  };

  const roleTitle = (role: Role) => {
    if (
      (role.delivery_unit_assignment &&
        !role.delivery_unit_assignment.function_type
          .is_individual_contributor) ||
      (role.capability_unit_assignment &&
        !role.capability_unit_assignment.function_type
          .is_individual_contributor)
    ) {
      return role.active_level_assignment.level.manager_title;
    } else {
      return role.active_level_assignment.level.individual_contributor_title;
    }
  };

  const roleUrlPrefix = "/org/roles";

  const roleElements = roles.map((role) => (
    <tr key={role.id.toString()}>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {role.role_type!.title}
        </Link>
      </td>
      <td>
        <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
          {roleTitle(role)}
        </Link>
      </td>
      <td>
        {role.delivery_unit_assignment ? (
          <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
            {role.delivery_unit_assignment.unit.name}
          </Link>
        ) : (
          "Not Assigned"
        )}
      </td>
      {showCapability && (
        <td>
          {role.capability_unit_assignment ? (
            <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
              {role.capability_unit_assignment.unit.name}
            </Link>
          ) : (
            "Not Assigned"
          )}
        </td>
      )}
      <td>
        {role.active_role_assignment?.person ? (
          <Link to={`${roleUrlPrefix}/${role.id.toString()}`}>
            {role.active_role_assignment.person.first_name}{" "}
            {role.active_role_assignment.person.last_name}
          </Link>
        ) : (
          "Vacant"
        )}
      </td>
      <td>TODO</td>
    </tr>
  ));

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <div>
        <ScrollArea>
          <Table verticalSpacing="xs">
            <thead>
              <tr>
                <th>Type</th>
                <th>Level</th>
                <th>Delivery</th>
                {showCapability && <th>Capability</th>}
                <th>Person</th>
                <th>Tenure</th>
              </tr>
            </thead>
            <tbody>{roleElements}</tbody>
          </Table>
        </ScrollArea>
        {unitId && unitType && (
          <div className={classes.buttonBar}>
            <Button onClick={() => setAddModalOpen(true)}>Add Role</Button>
          </div>
        )}
      </div>
      {unitId && unitType && (
        <MutateRoleModal
          unitId={unitId}
          unitType={unitType}
          opened={addModalOpen}
          onClose={() => setAddModalOpen(false)}
          onSubmit={submitNewRole}
        />
      )}
    </>
  );
};

export default RoleListTable;
