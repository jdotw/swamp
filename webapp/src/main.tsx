import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Pages/Home/Home";
import { MantineProvider } from "@mantine/core";
import CapabilityShell from "./Pages/Capability/CapabilityShell";
import DeliveryShell from "./Pages/Delivery/DeliveryShell";
import DeliveryHome from "./Pages/Delivery/DeliveryHome";
import CapabilityHome from "./Pages/Capability/CapabilityHome";
import OrgShell from "./Pages/Org/OrgShell";
import OrgHome from "./Pages/Org/OrgHome";
import PersonList from "./Pages/Org/People/PersonList";
import PersonHome from "./Pages/Org/People/Person/PersonHome";
import RolesList from "./Pages/Org/Roles/RolesList";
import RoleHome from "./Pages/Org/Roles/RoleHome";
import TeamsList from "./Pages/Org/Teams/TeamList";
import TeamHome from "./Pages/Org/Teams/Team/TeamHome";
import LevelList from "./Pages/Setup/Levels/LevelList";
import LevelHome from "./Pages/Setup/Levels/LevelHome";
import RoleTypeList from "./Pages/Setup/RoleTypes/RoleTypeList";
import RoleTypeHome from "./Pages/Setup/RoleTypes/RoleTypeHome";
import SetupHome from "./Pages/Setup/SetupHome";
import SetupShell from "./Pages/Setup/SetupShell";
import DeploymentTypeList from "./Pages/Setup/DeploymentTypes/DeploymentTypeList";
import CapabilityTypeList from "./Pages/Setup/CapabilityTypes/CapabilityTypeList";
import TrackList from "./Pages/Setup/Tracks/TrackList";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          {/* Organisation */}
          <Route path="org" element={<OrgShell />}>
            <Route index element={<OrgHome />} />

            {/* People */}
            <Route path="people">
              <Route index element={<PersonList />} />
              <Route path=":personId" element={<PersonHome />} />
            </Route>

            {/* Roles */}
            <Route path="roles">
              <Route index element={<RolesList />} />
              <Route path=":roleId">
                <Route index element={<RoleHome />} />
              </Route>
            </Route>

            {/* Teams */}
            <Route path="teams">
              <Route index element={<TeamsList />} />
              <Route path=":teamId">
                <Route index element={<TeamHome />} />
              </Route>
            </Route>

          </Route>

          {/* Capability */}
          <Route path="capability" element={<CapabilityShell />}>
            <Route index element={<CapabilityHome />} />

            {/* Capability Types */}
            <Route path="types">
              <Route index element={<CapabilityTypeList />} />
            </Route>
          </Route>

          {/* Delivery */}
          <Route path="delivery" element={<DeliveryShell />}>
            <Route index element={<DeliveryHome />} />
          </Route>

          {/* Setup */}
          <Route path="setup" element={<SetupShell />}>
            <Route index element={<SetupHome />} />

            {/* Role Types */}
            <Route path="roletypes">
              <Route index element={<RoleTypeList />} />
              <Route path=":roleTypeId">
                <Route index element={<RoleTypeHome />} />
              </Route>
            </Route>

            {/* Levels */}
            <Route path="levels">
              <Route index element={<LevelList />} />
              <Route path=":levelId">
                <Route index element={<LevelHome />} />
              </Route>
            </Route>

            {/* Deployment Types */}
            <Route path="deploymenttypes">
              <Route index element={<DeploymentTypeList />} />
              {/*
              <Route path=":deploymentTypeId">
                <Route index element={<DeploymentTypeHome />} />
              </Route>
              */}
            </Route>

            {/* Capability Types */}
            <Route path="capabilitytypes">
              <Route index element={<CapabilityTypeList />} />
              {/*
              <Route path=":capabilityTypeId">
                <Route index element={<CapabilityTypeHome />} />
              </Route>
              */}
            </Route>

            {/* Career Tracks */}
            <Route path="tracks">
              <Route index element={<TrackList />} />
              {/*
              <Route path=":trackId">
                <Route index element={<TrackHome />} />
              </Route>
              */}
            </Route>

            {/* Titles */}
            <Route path="titles">
              <Route index element={<TitleList />} />
              {/*
              <Route path=":trackId">
                <Route index element={<TrackHome />} />
              </Route>
              */}
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
