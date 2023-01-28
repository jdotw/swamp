import { Button, createStyles, ScrollArea, Table, Title } from "@mantine/core";
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateFunctionType,
  useFunctionType,
} from "../../../Client/FunctionType";
import Loading from "../../../Components/Loading/Loading";
import { MutateFunctionTypeModal } from "./MutateFunctionTypeModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function FunctionList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useFunctionType();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewFunctionType = async (newFunctionType: MutateFunctionType) => {
    await createItem(newFunctionType);
    setAddModalOpen(false);
  };

  const functionTypeElements = items.map((functionType) => (
    <tr key={functionType.id.toString()}>
      <td>
        <Link to={functionType.id.toString()}>{functionType.name}</Link>
      </td>
      <td>
        <Link to={functionType.id.toString()}>TODO</Link>
      </td>
      <td>
        <Link to={functionType.id.toString()}>TODO</Link>
      </td>
    </tr>
  ));

  return (
    <>
      <div>
        <Title order={3}>Functions</Title>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Function</th>
                <th>Roles</th>
                <th>Percentage</th>
              </tr>
            </thead>
            <tbody>{functionTypeElements}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Function</Button>
        </div>
      </div>
      <MutateFunctionTypeModal
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewFunctionType}
        mode="create"
      />
    </>
  );
}

export default FunctionList;
