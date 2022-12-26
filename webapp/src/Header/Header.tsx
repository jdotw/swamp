import { useState } from "react";
import {
  createStyles,
  Header,
  Container,
  Group,
  Burger,
  Text,
} from "@mantine/core";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    height: "100%",
    margin: 0,
  },

  linkContainer: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    height: "100%",
    margin: 0,
    flex: 1,
    padding: 0,
  },

  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },

  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },

  link: {
    display: "block",
    lineHeight: 1,
    padding: "8px 12px",
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

const links = [
  {
    link: "/logout",
    label: "Logout",
  },
];

interface HeaderSimpleProps {
  burgerOpened: boolean;
  onBurgerClicked: () => void;
}

export function HeaderSimple({
  burgerOpened,
  onBurgerClicked,
}: HeaderSimpleProps) {
  const [active, setActive] = useState(links[0].link);
  const { classes, cx } = useStyles();

  const items = links.map((link) => (
    <a
      key={link.label}
      href={link.link}
      className={cx(classes.link, {
        [classes.linkActive]: active === link.link,
      })}
      onClick={(event) => {
        event.preventDefault();
        setActive(link.link);
      }}
    >
      {link.label}
    </a>
  ));

  return (
    <Header height={{ base: 50, md: 70 }} p="md">
      <Container className={classes.header}>
        {/* <MantineLogo size={28} /> */}
        <Burger
          opened={burgerOpened}
          onClick={onBurgerClicked}
          className={classes.burger}
          size="sm"
          mr="xl"
        />
        <Text mr="xl">SWAMP</Text>
        <Container className={classes.linkContainer}>
          <Group spacing={5} className={classes.links}>
            {items}
          </Group>
        </Container>
      </Container>
    </Header>
  );
}
