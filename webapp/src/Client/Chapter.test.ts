import { vi } from "vitest";
import { Chapter, MutateChapter, useChapter, UseChapterProps } from "./Chapter";
import { expectHookAdoptsUseCRUDCorrectly } from "./UseCRUDTestHelpers";

const practiceId = Math.floor(Math.random() * 1000);
const path = `/api/org/practices/${practiceId}/chapters`;
const defaultProps = { practiceId, path } as UseChapterProps;

vi.mock("./CRUD/CRUD", () => {
  return {
    useCRUD: vi.fn(),
  };
});

expectHookAdoptsUseCRUDCorrectly<Chapter, MutateChapter>({
  hookFactory: (props) => useChapter({ ...defaultProps, ...props }),
  itemFactory: (props) => {
    const practiceChapter: Chapter = {
      ...props,
      id: 1,
      name: "name",
      description: "description",
      formed_date: "2021-01-01",
      disbanded_date: "2021-01-01",
      type: "chapter",
      practice_id: 2,
    };
    return practiceChapter;
  },
  mutateItemFactory: (props) => {
    const mutateChapter: MutateChapter = {
      name: "new name",
      formed_date: "2021-01-01",
      disbanded_date: "2023-01-01",
      ...props,
    };
    return mutateChapter;
  },
});
