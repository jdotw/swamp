import { Text } from "@mantine/core";

export const LoadingComponentTestID = "loading-component";

function Loading() {
  return (
    <div data-testid={LoadingComponentTestID}>
      <Text>Loading</Text>
    </div>
  );
}

export default Loading;
