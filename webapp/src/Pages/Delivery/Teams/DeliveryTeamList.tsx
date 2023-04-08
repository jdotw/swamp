

import { Button, createStyles, ScrollArea, Table, Title, Text } from "@mantine/core";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  MutateRoleType,
  RoleType,
  useRoleType,
} from "../../../Client/RoleType";
import Loading from "../../../Components/Loading/Loading";
import { MutateDeliveryTeamModal } from "./MutateDeliveryTeamModal";

const useStyles = createStyles((theme) => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

interface DeliveryTeam {
  id: number;
  title: string;
  parent_id?: number;
  children?: DeliveryTeam[];
};

const mockData: DeliveryTeam[] = [
  {
    id: 1,
    title: "Storefronts",
  },
  {
    id: 2,
    title: "Fulfillment",
  },
  {
    id: 3,
    title: "Marketing",
  },
  {
    id: 4,
    title: "Loyalty",
  },
  {
    id: 5,
    title: "Ops",
  },
  {
    id: 6,
    title: "Flightdeck",
    parent_id: 5,
  },
  {
    id: 7,
    title: "SRE",
    parent_id: 5,
  },
  {
    id: 8,
    title: "Product Pages",
    parent_id: 1,
  },
  {
    id: 9,
    title: "Search",
    parent_id: 1,
  },
  {
    id: 10,
    title: "Checkout",
    parent_id: 1,
  },
  {
    id: 11,
    title: "Recipes",
    parent_id: 1,
  },
  {
    id: 12,
    title: "Order Management",
    parent_id: 2,
  },
  {
    id: 13,
    title: "Picking",
    parent_id: 2,
  },
  {
    id: 14,
    title: "Digital Media",
    parent_id: 3,
  },
  {
    id: 15,
    title: "Comms",
    parent_id: 3,
  },
  {
    id: 16,
    title: "Rewards Program",
    parent_id: 4,
  },
];

function DeliveryTeamList() {
  const { classes } = useStyles();
  // const { items, loading, createItem } = useRoleType();
  const [addModalOpen, setAddModalOpen] = useState(false);
  const items = mockData;

  // if (loading) return <Loading />;

  const submitNewDelivery = async (newDelivery: MutateDelivery) => {
    // await createItem(newRoleType);
    setAddModalOpen(false);
  };

  const deliveryRow = (team: DeliveryTeam, level: number) => (
    <tr key={team.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={team.id.toString()}>
          {team.title}
        </Link>
      </td>
    </tr>
  );

  const deliveryRows = (items: DeliveryTeam[], parent?: DeliveryTeam, level = 0) =>
    items.reduce((acc, team) => {
      console.log("team.parent_id", team.parent_id);
      if (team.parent_id == parent?.id) {
        acc.push(deliveryRow(team, level));
        acc.push(...deliveryRows(items, team, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Delivery Teams</Title>
        <Text>Delivery teams are where Capabilities are deployed to achieve outcomes for the organisation</Text>
        <ScrollArea>
          <Table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>{deliveryRows(mockData)}</tbody>
          </Table>
        </ScrollArea>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Delivery</Button>
        </div>
      </div>
      <MutateDeliveryTeamModal
        capabilities={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewDelivery}
        mode="create"
      />
    </>
  );
}

export default DeliveryTeamList;
