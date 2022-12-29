import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import Home from "./Components/Home";
import { People } from "./People/People";
import PeopleList from "./People/PeopleList";
import Individual from "./People/Individual";
import { MantineProvider } from "@mantine/core";
import Capability from "./Capability/Capability";
import TribeHome from "./Delivery/Tribes/Tribe/TribeHome";
import TribeList from "./Delivery/Tribes/TribeList";
import Practice from "./Capability/Practice";
import PracticeList from "./Capability/PracticeList";
import TribeRoleTypeList from "./Delivery/TribeRoleTypes/TribeRoleTypeList";
import TribeRoleTypeHome from "./Delivery/TribeRoleTypes/TribeRoleType/TribeRoleTypeHome";
import DeliveryShell from "./Delivery/DeliveryShell";
import DeliveryHome from "./Delivery/DeliveryHome";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people" element={<People />}>
            <Route index element={<PeopleList />} />
            <Route path=":individualId" element={<Individual />} />
          </Route>
          <Route path="capability" element={<Capability />}>
            <Route index element={<PracticeList />} />
            <Route path=":practiceId" element={<Practice />} />
          </Route>
          <Route path="delivery" element={<DeliveryShell />}>
            <Route index element={<DeliveryHome />} />
            <Route path="tribes" element={<TribeList />}>
              <Route path=":tribeId" element={<TribeHome />} />
            </Route>
            <Route path="triberoletypes" element={<TribeRoleTypeList />}>
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
