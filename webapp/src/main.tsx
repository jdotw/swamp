import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import { PeopleShell } from "./People/PeopleShell";
import { MantineProvider } from "@mantine/core";
import CapabilityShell from "./Capability/CapabilityShell";
import TribeHome from "./Delivery/Tribes/Tribe/TribeHome";
import TribeList from "./Delivery/Tribes/TribeList";
import PracticeList from "./Capability/Practices/PracticeList";
import DeliveryShell from "./Delivery/DeliveryShell";
import DeliveryHome from "./Delivery/DeliveryHome";
import SquadHome from "./Delivery/Squads/SquadHome";
import CapabilityHome from "./Capability/CapabilityHome";
import PracticeHome from "./Capability/Practices/Practice/PracticeHome";
import ChapterHome from "./Capability/Chapters/ChapterHome";
import CapabilityRoleTypesHome from "./Capability/CapabilityRoleTypes/CapabilityRoleTypesHome";
import PracticeRoleTypeHome from "./Capability/CapabilityRoleTypes/PracticeRoleType/PracticeRoleTypeHome";
import ChapterRoleTypeHome from "./Capability/CapabilityRoleTypes/ChapterRoleType/ChapterRoleTypeHome";
import DeliveryRoleTypesHome from "./Delivery/DeliveryRoleTypes/DeliveryRoleTypesHome";
import SquadRoleTypeHome from "./Delivery/DeliveryRoleTypes/SquadRoleType/SquadRoleTypeHome";
import TribeRoleTypeHome from "./Delivery/DeliveryRoleTypes/TribeRoleType/TribeRoleTypeHome";
import OrgShell from "./Org/OrgShell";
import OrgHome from "./Org/OrgHome";
import OrgUnitList from "./Org/Units/OrgUnitList";
import OrgUnitHome from "./Org/Units/OrgUnitHome";
import OrgRoleTypesList from "./Org/Roles/RoleTypesList";
import RoleTypeHome from "./Org/Roles/RoleTypeHome";
import IndividualList from "./People/IndividualList";
import IndividualHome from "./People/Individuals/IndividualHome";
import RolesList from "./Org/Roles/RolesList";
import RoleHome from "./Org/Roles/RoleHome";
import TeamsList from "./Org/Teams/TeamsList";
import TeamHome from "./Org/Teams/TeamHome";

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
              <Route index element={<IndividualList />} />
              <Route path=":individualId" element={<IndividualHome />} />
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

            {/* Practices */}
            <Route path="practices">
              <Route index element={<PracticeList />} />
              <Route path=":practiceId">
                <Route index element={<PracticeHome />} />

                {/* Chapters */}
                <Route path="chapters">
                  <Route path=":chapterId">
                    <Route index element={<ChapterHome />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Roles Types */}
            <Route path="roletypes">
              <Route index element={<CapabilityRoleTypesHome />} />
              <Route
                path="practiceroletypes/:roleTypeId"
                element={<PracticeRoleTypeHome />}
              />
              <Route
                path="chapterroletypes/:roleTypeId"
                element={<ChapterRoleTypeHome />}
              />
            </Route>
          </Route>

          {/* Delivery */}
          <Route path="delivery" element={<DeliveryShell />}>
            <Route index element={<DeliveryHome />} />

            {/* Tribes */}
            <Route path="tribes">
              <Route index element={<TribeList />} />
              <Route path=":tribeId">
                <Route index element={<TribeHome />} />

                {/* Squads */}
                <Route path="squads">
                  <Route path=":squadId">
                    <Route index element={<SquadHome />} />
                  </Route>
                </Route>
              </Route>
            </Route>

            {/* Roles Types */}
            <Route path="roletypes">
              <Route index element={<DeliveryRoleTypesHome />} />
              <Route
                path="triberoletypes/:roleTypeId"
                element={<TribeRoleTypeHome />}
              />
              <Route
                path="squadroletypes/:roleTypeId"
                element={<SquadRoleTypeHome />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
