import { Text } from "@mantine/core";

export const loadingComponentTestID = "loading-component";

export interface LoadingProps {
  "data-testid"?: string;
}

function Loading({ "data-testid": dataTestId }: LoadingProps = {}) {
  dataTestId = dataTestId || loadingComponentTestID;
  return (
    <div data-testid={dataTestId}>
      <Text>Loading</Text>
    </div>
  );
}

export default Loading;
