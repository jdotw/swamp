import { Text, Timeline } from "@mantine/core";
import { IconGitBranch, IconStar, TablerIcon } from "@tabler/icons-react";
import { Role } from "../../Client/Role";
import { RoleHistory, useRoleHistory } from "../../Client/RoleHistory";
import Loading from "../Loading/Loading";

export interface RoleHistoryTimelineProps {
  role: Role;
}

export const roleHistoryTimelineTestId = "role-history-timeline";

export const roleHistoryTitle = (item: RoleHistory) => {
  switch (item.type) {
    case "opened":
      return "Opened";
    case "level_assignment":
      return "Level Change";
    case "person_assignment":
      return "Person Assignment";
    case "unit_assignment":
      return "Unit Assignment";
    case "closed":
      return "Closed";
    default:
      return item.type;
  }
};

export const roleHistoryDetail = (item: RoleHistory) => {
  switch (item.type) {
    case "opened":
      return "Opened";
    case "level_assignment":
      return "Level Change";
    case "person_assignment":
      return (
        item.role_assignment?.person.first_name +
        " " +
        item.role_assignment?.person.last_name
      );
    case "unit_assignment":
      return "Unit Assignment";
    case "closed":
      return "Closed";
    default:
      return item.type;
  }
};

const roleHistoryIcon = (item: RoleHistory) => {
  const defaultProps = {
    size: 12,
  };
  switch (item.type) {
    case "opened":
      return <IconStar {...defaultProps} />;
    default:
      return <IconGitBranch {...defaultProps} />;
  }
};

export const RoleHistoryTimeline = ({ role }: RoleHistoryTimelineProps) => {
  const { items: roleHistory, loading } = useRoleHistory({ id: role.id });

  if (loading) {
    return <Loading />;
  }

  const roleHistoryTimelineItems = roleHistory.map((item, index) => {
    return (
      <Timeline.Item
        key={index.toString()}
        bullet={roleHistoryIcon(item)}
        title={roleHistoryTitle(item)}
      >
        <Text color="dimmed" size="sm">
          {new Date(item.date).toDateString()}
        </Text>
        <Text size="xs" mt={4}>
          {roleHistoryDetail(item)}
        </Text>
      </Timeline.Item>
    );
  });

  return (
    <div data-testid={roleHistoryTimelineTestId}>
      <Timeline active={1} bulletSize={24} lineWidth={2}>
        {roleHistoryTimelineItems}
      </Timeline>
    </div>
  );
};

export default RoleHistoryTimeline;
