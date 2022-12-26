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
import Tribe from "./Delivery/Tribe";
import TribeList from "./Delivery/TribeList";
import Practice from "./Capability/Practice";
import PracticeList from "./Capability/PracticeList";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <MantineProvider withGlobalStyles withNormalizeCSS>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="people" element={<People />}>
            <Route path=":individualId" element={<Individual />} />
            <Route index element={<PeopleList />} />
          </Route>
          <Route path="capability" element={<Capability />}>
            <Route path=":practiceId" element={<Practice />} />
            <Route index element={<PracticeList />} />
          </Route>
          <Route path="delivery" element={<Capability />}>
            <Route path=":tribeId" element={<Tribe />} />
            <Route index element={<TribeList />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </MantineProvider>
  // </React.StrictMode>
);
