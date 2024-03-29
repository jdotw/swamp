import { useState } from "react";
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  createStyles,
} from "@mantine/core";
import {
  TablerIcon,
  IconCalendarStats,
  IconChevronLeft,
  IconChevronRight,
} from "@tabler/icons-react";
import { NavLink } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  control: {
    fontWeight: 500,
    display: "block",
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    color: theme.colorScheme === "dark" ? theme.colors.dark[0] : theme.black,
    // fontSize: theme.fontSizes.sm,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  link: {
    fontWeight: 500,
    display: "block",
    textDecoration: "none",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,
    paddingLeft: 31,
    marginLeft: 30,
    fontSize: theme.fontSizes.sm,
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    borderLeft: `2px solid ${theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[7]
          : theme.colors.gray[0],
      color: theme.colorScheme === "dark" ? theme.white : theme.black,
    },
  },

  chevron: {
    transition: "transform 200ms ease",
  },
}));

interface LinksGroupProps {
  icon: TablerIcon;
  label: string;
  initiallyOpened?: boolean;
  link: string;
  links?: { label: string; link: string }[];
  onLinkClicked: () => void;
}

export function LinksGroup({
  icon: Icon,
  label,
  initiallyOpened,
  link,
  links,
  onLinkClicked,
}: LinksGroupProps) {
  const { classes, theme } = useStyles();
  const hasLinks = Array.isArray(links);
  const [opened, setOpened] = useState(initiallyOpened || false);
  const ChevronIcon = theme.dir === "ltr" ? IconChevronRight : IconChevronLeft;
  const items = (hasLinks ? links : []).map((link) => (
    <NavLink
      to={link.link}
      key={link.label}
      className={classes.link}
      onClick={() => onLinkClicked()}
    >
      {link.label}
    </NavLink>
  ));

  return (
    <>
      <NavLink to={link}>
        <UnstyledButton
          onClick={() => {
            onLinkClicked();
            setOpened(true);
          }}
          className={classes.control}
        >
          <Group position="apart" spacing={0}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <ThemeIcon variant="light" size={30}>
                <Icon size={18} />
              </ThemeIcon>
              <Box ml="md">{label}</Box>
            </Box>
            {hasLinks && (
              <ChevronIcon
                className={classes.chevron}
                size={14}
                stroke={1.5}
                style={{
                  transform: opened
                    ? `rotate(${theme.dir === "rtl" ? -90 : 90}deg)`
                    : "none",
                }}
                onClick={(e) => {
                  // Just toggle the opened flag
                  // and avoid the event causing navigation
                  // This is to ensure that on small screens the chevron
                  // can be opened and closed without the navbar being
                  // hidden on click
                  setOpened((o) => !o);
                  e.stopPropagation();
                  e.preventDefault();
                }}
              />
            )}
          </Group>
        </UnstyledButton>
      </NavLink>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  );
}
