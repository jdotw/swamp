import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import { MantineProvider } from "@mantine/core";
import CapabilityShell from "./Pages/Capability/CapabilityShell";
import TribeHome from "./Pages/Delivery/Tribes/Tribe/TribeHome";
import TribeList from "./Pages/Delivery/Tribes/TribeList";
import PracticeList from "./Pages/Capability/Practices/PracticeList";
import DeliveryShell from "./Pages/Delivery/DeliveryShell";
import DeliveryHome from "./Pages/Delivery/DeliveryHome";
import SquadHome from "./Pages/Delivery/Squads/SquadHome";
import CapabilityHome from "./Pages/Capability/CapabilityHome";
import PracticeHome from "./Pages/Capability/Practices/Practice/PracticeHome";
import ChapterHome from "./Pages/Capability/Chapters/ChapterHome";
import OrgShell from "./Pages/Org/OrgShell";
import OrgHome from "./Pages/Org/OrgHome";
import PersonList from "./Pages/Org/People/PersonList";
import PersonHome from "./Pages/Org/People/Person/PersonHome";
import RolesList from "./Pages/Org/Roles/RolesList";
import RoleHome from "./Pages/Org/Roles/RoleHome";
import TeamsList from "./Pages/Org/Teams/TeamList";
import TeamHome from "./Pages/Org/Teams/Team/TeamHome";

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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
