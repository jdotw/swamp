
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { addTestPolyfills } from "../../../test/UITestHelpers";
import { MutateItemModal, _valuesFromFormFields } from "./MutateItemModal";

addTestPolyfills();

// const renderPage = () =>
//   render(
//     <MemoryRouter>
//       <MutateItemModal />
//     </MemoryRouter>
//   );

describe("_valuesFromFormFields function", () => {
  it("should never use undefined as a value even if no value is specified in the fields", () => {
    const fields: MutateItemModalFormField[] = [
      {
        key: "first_name",
      },
      {
        key: "external_id",
      },
      {
        key: "middle_names",
      },
      {
        key: "last_name",
      },
    ];
    const values = _valuesFromFormFields(fields);
    expect(values).toEqual({
      "first_name": "",
      "external_id": "",
      "middle_names": "",
      "last_name": "",
    });
  });
});
