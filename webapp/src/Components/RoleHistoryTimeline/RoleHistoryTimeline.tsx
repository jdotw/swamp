import { Text, Timeline } from "@mantine/core";
import { IconGitBranch, IconStar } from "@tabler/icons-react";
import { RoleHistory } from "../../Client/RoleHistory";
import Loading from "../Loading/Loading";

export interface RoleHistoryTimelineProps {
  items: RoleHistory[];
  loading: boolean;
}

export const roleHistoryTimelineTestId = "role-history-timeline";

export const roleHistoryTitle = (item: RoleHistory) => {
  switch (item.type) {
    case "opened":
      return "Role Opened";
    case "title_assignment":
      return "Title Changed";
    case "person_assignment":
      return "Person Assigned";
    case "capability_added":
      return "Capability Added";
    case "capability_removed":
      return "Capability Removed";
    case "closed":
      return "Closed";
    default:
      return item.type;
  }
};

export const roleHistoryDetail = (item: RoleHistory) => {
  switch (item.type) {
    case "title_assignment":
      return item.title_assignment?.title.name;
    case "person_assignment":
      return (
        item.role_assignment?.person.first_name +
        " " +
        item.role_assignment?.person.last_name
      );
    case "capability_added":
    case "capability_removed":
      return item.capability?.capability_type.name;
    default:
      return undefined;
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

export const RoleHistoryTimeline = ({ items, loading }: RoleHistoryTimelineProps) => {
  if (items.length < 1 && loading) {
    return <Loading />;
  }

  const roleHistoryTimelineItems = items.map((item, index) => {
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
