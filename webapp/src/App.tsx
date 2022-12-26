import {
  AppShell,
  Aside,
  Burger,
  Footer,
  Header,
  MantineProvider,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Outlet } from "react-router";

import "./App.css";
import { HeaderSimple } from "./Header/Header";
import { NavbarSimpleColored } from "./Navbar/Navbar";

function App() {
  const [burgerOpened, { toggle: toggleBurgerOpened }] = useDisclosure(false);
  return (
    <AppShell
      padding="md"
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <NavbarSimpleColored
          hidden={!burgerOpened}
          onLinkClicked={toggleBurgerOpened}
        ></NavbarSimpleColored>
      }
      // aside={
      //   <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
      //     <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
      //       <Text>Application sidebar</Text>
      //     </Aside>
      //   </MediaQuery>
      // }
      header={
        <HeaderSimple
          burgerOpened={burgerOpened}
          onBurgerClicked={toggleBurgerOpened}
        ></HeaderSimple>
        // <Header height={{ base: 50, md: 70 }} p="md">
        //   <div
        //     style={{ display: "flex", alignItems: "center", height: "100%" }}
        //   >
        //     <MediaQuery largerThan="sm" styles={{ display: "none" }}>
        //       <Burger
        //         opened={opened}
        //         onClick={() => setOpened((o) => !o)}
        //         size="sm"
        //         color={theme.colors.gray[6]}
        //         mr="xl"
        //       />
        //     </MediaQuery>

        //     <Text>Application header</Text>
        //   </div>
        // </Header>
      }
      // footer={
      //   <Footer height={60} p="md">
      //     Application footer
      //   </Footer>
      // }
      styles={(theme) => ({
        main: {
          backgroundColor:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      })}
    >
      <Outlet />
    </AppShell>
  );
}

export default App;
