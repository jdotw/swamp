import { createStyles, Navbar } from "@mantine/core";
import {
  IconLogout,
  IconUsers,
  IconBulb,
  IconClipboardList,
} from "@tabler/icons";
import { LinksGroup } from "./NavbarLinksGroup";

const useStyles = createStyles((theme) => ({
  navbar: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.white,
    paddingBottom: 0,
  },

  header: {
    padding: theme.spacing.md,
    paddingTop: 0,
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },

  links: {
    marginLeft: -theme.spacing.md,
    marginRight: -theme.spacing.md,
  },

  linksInner: {
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },

  footer: {
    borderTop: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
  },
}));

const data = [
  { link: "/people", label: "People", icon: IconUsers },
  {
    link: "/capability",
    label: "Capability",
    icon: IconBulb,
    links: [
      { label: "Home", link: "/capability" },
      { label: "Practices", link: "/capability/practices" },
      { label: "Roles", link: "/capability/roletypes" },
    ],
  },
  {
    link: "/delivery",
    label: "Delivery",
    icon: IconClipboardList,
    links: [
      { label: "Home", link: "/delivery" },
      { label: "Tribes", link: "/delivery/tribes" },
      { label: "Roles", link: "/delivery/roletypes" },
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
