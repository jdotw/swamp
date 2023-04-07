import { createStyles, Navbar } from "@mantine/core";
import {
  IconLogout,
  IconUsers,
  IconBulb,
  IconClipboardList,
  IconSettings
} from "@tabler/icons";
import { LinksGroup } from "./NavbarLinksGroup";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },
  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const data = [
  {
    link: "/org",
    label: "Organisation",
    icon: IconUsers,
    links: [
      { label: "People", link: "/org/people" },
      { label: "Roles", link: "/org/roles" },
      { label: "Teams", link: "/org/teams" },
    ],
  },
  {
    link: "/capability",
    label: "Capabilities",
    icon: IconBulb,
    links: [{ label: "Practices", link: "/capability/practices" }],
  },
  {
    link: "/delivery",
    label: "Delivery",
    icon: IconClipboardList,
    links: [{ label: "Tribes", link: "/delivery/tribes" }],
  },
  {
    link: "/setup",
    label: "Setup",
    icon: IconSettings,
    links: [
      { label: "Role Types", link: "/org/roletypes" },
      { label: "Levels", link: "/org/levels" },
      { label: "Deployments", link: "/org/deployments" },
    ],
  },
];

const footerData = [{ link: "/logout", label: "Logout", icon: IconLogout }];

interface NavbarSimpleColoredProps {
  hidden: boolean;
  onLinkClicked: () => void;
}

export function SideNavbar(props: NavbarSimpleColoredProps) {
  const { classes, cx } = useStyles();
  const { hidden, onLinkClicked } = props;

  const links = data.map((item) => (
    <LinksGroup onLinkClicked={onLinkClicked} {...item} key={item.label} />
  ));
  const footerLinks = footerData.map((item) => (
    <LinksGroup onLinkClicked={onLinkClicked} {...item} key={item.label} />
  ));

  return (
    <Navbar
      p="xs"
      className={classes.navbar}
      hiddenBreakpoint="sm"
      hidden={hidden}
      width={{ sm: 200, lg: 200 }}
    >
      <Navbar.Section grow>{links}</Navbar.Section>
      <Navbar.Section className={classes.footer}>{footerLinks}</Navbar.Section>
    </Navbar>
  );
}
