import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import { People } from "./People/People";
import PeopleList from "./People/PeopleList";
import Individual from "./People/Individual";
import { MantineProvider } from "@mantine/core";
import CapabilityShell from "./Capability/CapabilityShell";
import TribeHome from "./Delivery/Tribes/Tribe/TribeHome";
import TribeList from "./Delivery/Tribes/TribeList";
import Practice from "./Capability/Practices/Practice/PracticeHome";
import PracticeList from "./Capability/Practices/PracticeList";
import TribeRoleTypeList from "./Delivery/TribeRoleTypes/TribeRoleTypeList";
import TribeRoleTypeHome from "./Delivery/TribeRoleTypes/TribeRoleType/TribeRoleTypeHome";
import DeliveryShell from "./Delivery/DeliveryShell";
import DeliveryHome from "./Delivery/DeliveryHome";
import SquadHome from "./Delivery/Squads/SquadHome";
import CapabilityHome from "./Capability/CapabilityHome";
import PracticeHome from "./Capability/Practices/Practice/PracticeHome";
import ChapterHome from "./Capability/Chapters/ChapterHome";
import PracticeRoleTypeList from "./Capability/PracticeRoleTypes/PracticeRoleTypeList";
import PracticeRoleTypeHome from "./Capability/PracticeRoleTypes/PracticeRoleType/PracticeRoleTypeHome";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />

          {/* People */}
          <Route path="people" element={<People />}>
            <Route index element={<PeopleList />} />
            <Route path=":individualId" element={<Individual />} />
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

            {/* Practice Roles */}
            <Route path="practiceroletypes">
              <Route index element={<PracticeRoleTypeList />} />
              <Route
                path="practiceroletypes/:roleTypeId"
                element={<PracticeRoleTypeHome />}
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

            {/* Tribe Roles */}
            <Route path="triberoletypes">
              <Route index element={<TribeRoleTypeList />} />
              <Route
                path="triberoletypes/:roleTypeId"
                element={<TribeRoleTypeHome />}
              />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
