import { Text } from "@mantine/core";
import { LoadingComponentTestID } from "../Components/Home";

function Loading() {
  return (
    <div data-testid={LoadingComponentTestID}>
      <Text>Loading</Text>
    </div>
  );
}

export default Loading;
