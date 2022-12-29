import { useState } from "react";
import { createStyles, Navbar } from "@mantine/core";
import {
  IconLogout,
  IconUsers,
  IconBulb,
  IconClipboardList,
} from "@tabler/icons";
import { NavLink } from "react-router-dom";
import { LinksGroup } from "./NavbarLinksGroup";

const useStyles = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");
  return {
    navbar: {
      backgroundColor: theme.fn.variant({
        variant: "filled",
        color: theme.primaryColor,
      }).background,
      borderRight: 0,
    },

    version: {
      backgroundColor: theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      ),
      color: theme.white,
      fontWeight: 700,
    },

    header: {
      paddingBottom: theme.spacing.md,
      marginBottom: theme.spacing.md * 1.5,
      borderBottom: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    footer: {
      paddingTop: theme.spacing.md,
      marginTop: theme.spacing.md,
      borderTop: `1px solid ${theme.fn.lighten(
        theme.fn.variant({ variant: "filled", color: theme.primaryColor })
          .background!,
        0.1
      )}`,
    },

    link: {
      ...theme.fn.focusStyles(),
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.sm,
      color: theme.white,
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.1
        ),
      },
    },

    linkIcon: {
      ref: icon,
      color: theme.white,
      opacity: 0.75,
      marginRight: theme.spacing.sm,
    },

    linkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.lighten(
          theme.fn.variant({ variant: "filled", color: theme.primaryColor })
            .background!,
          0.15
        ),
        [`& .${icon}`]: {
          opacity: 0.9,
        },
      },
    },
  };
});

const data = [
  { link: "/people", label: "People", icon: IconUsers },
  { link: "/capability", label: "Capability", icon: IconBulb },
  {
    link: "/delivery",
    label: "Delivery",
    icon: IconClipboardList,
    links: [
      { label: "Overview", link: "/" },
      { label: "Forecasts", link: "/" },
      { label: "Outlook", link: "/" },
      { label: "Real time", link: "/" },
    ],
  },
];

interface NavbarSimpleColoredProps {
  hidden: boolean;
  onLinkClicked: () => void;
}

export function NavbarSimpleColored(props: NavbarSimpleColoredProps) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("People");
  const { hidden, onLinkClicked } = props;

  const links = data.map((item) => <LinksGroup {...item} key={item.label} />);

  // const links = data.map((item) => (
  //   <NavLink
  //     to={item.link}
  //     key={item.label}
  //     className={({ isActive }) =>
  //       cx(classes.link, {
  //         [classes.linkActive]: isActive,
  //       })
  //     }
  //     onClick={(event) => {
  //       setActive(item.label);
  //       onLinkClicked();
  //     }}
  //   >
  //     <item.icon className={classes.linkIcon} stroke={1.5} />
  //     <span>{item.label}</span>
  //   </NavLink>
  // ));

  return (
    <Navbar
      p="xs"
      className={classes.navbar}
      hiddenBreakpoint="sm"
      hidden={hidden}
      width={{ sm: 200, lg: 200 }}
    >
      <Navbar.Section grow>{links}</Navbar.Section>

      <Navbar.Section className={classes.footer}>
        <a
          href="#"
          className={classes.link}
          onClick={(event) => {
            event.preventDefault();
            onLinkClicked();
          }}
        >
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </a>
      </Navbar.Section>
    </Navbar>
  );
}
