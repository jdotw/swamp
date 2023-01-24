import {
  createStyles,
  Grid,
  ScrollArea,
  Select,
  Table,
  Title,
} from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  unitCardContainer: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  unitCard: {
    display: "flex",
    flexDirection: "column",
    padding: 20,
  },
}));

function DutiesList() {
  const { classes } = useStyles();
  return (
    <div>
      <Title order={3}>Duties Level Configuration</Title>
      <hr />
      <Grid>
        <Grid.Col span={6}>
          <Title order={4}>Tribe Duties</Title>
          <Select
            key="role_type"
            label="Member Minimum Level"
            placeholder="select role level"
            defaultValue={"4"}
            data={[
              { value: "1", label: "Graduate" },
              { value: "2", label: "Associate" },
              { value: "3", label: "Senior" },
              { value: "4", label: "Principal" },
              { value: "5", label: "Chief" },
              { value: "6", label: "Distinguished" },
            ]}
          />
          <Select
            key="role_type"
            label="Manager Minimum Level"
            placeholder="select role level"
            defaultValue={"5"}
            data={[
              { value: "-1", label: "Not Applicable" },
              { value: "3", label: "Manager" },
              { value: "4", label: "Senior Manager" },
              { value: "5", label: "Head of" },
              { value: "6", label: "General Manager" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Squad Duties</Title>
          <Select
            key="role_type"
            label="Member Minimum Level"
            placeholder="select role level"
            defaultValue={"1"}
            data={[
              { value: "1", label: "Graduate" },
              { value: "2", label: "Associate" },
              { value: "3", label: "Senior" },
              { value: "4", label: "Principal" },
              { value: "5", label: "Chief" },
              { value: "6", label: "Distinguished" },
            ]}
          />
          <Select
            key="role_type"
            label="Manager Minimum Level"
            placeholder="select role level"
            defaultValue={"3"}
            data={[
              { value: "-1", label: "Not Applicable" },
              { value: "3", label: "Manager" },
              { value: "4", label: "Senior Manager" },
              { value: "5", label: "Head of" },
              { value: "6", label: "General Manager" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>PracticeDuties</Title>
          <Select
            key="role_type"
            label="Member Minimum Level"
            placeholder="select role level"
            defaultValue={"4"}
            data={[
              { value: "1", label: "Graduate" },
              { value: "2", label: "Associate" },
              { value: "3", label: "Senior" },
              { value: "4", label: "Principal" },
              { value: "5", label: "Chief" },
              { value: "6", label: "Distinguished" },
            ]}
          />
          <Select
            key="role_type"
            label="Manager Minimum Level"
            placeholder="select role level"
            defaultValue={"5"}
            data={[
              { value: "-1", label: "Not Applicable" },
              { value: "3", label: "Manager" },
              { value: "4", label: "Senior Manager" },
              { value: "5", label: "Head of" },
              { value: "6", label: "General Manager" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Chapter Duties</Title>
          <Select
            key="role_type"
            label="Member Minimum Level"
            placeholder="select role level"
            defaultValue={"1"}
            data={[
              { value: "1", label: "Graduate" },
              { value: "2", label: "Associate" },
              { value: "3", label: "Senior" },
              { value: "4", label: "Principal" },
              { value: "5", label: "Chief" },
              { value: "6", label: "Distinguished" },
            ]}
          />
          <Select
            key="role_type"
            label="Manager Minimum Level"
            placeholder="select role level"
            defaultValue={"3"}
            data={[
              { value: "-1", label: "Not Applicable" },
              { value: "3", label: "Manager" },
              { value: "4", label: "Senior Manager" },
              { value: "5", label: "Head of" },
              { value: "6", label: "General Manager" },
            ]}
          />
        </Grid.Col>
        <Grid.Col span={6}>
          <Title order={4}>Team Duties</Title>
          <Select
            key="role_type"
            label="Member Minimum Level"
            placeholder="select role level"
            defaultValue={"1"}
            data={[
              { value: "1", label: "Graduate" },
              { value: "2", label: "Associate" },
              { value: "3", label: "Senior" },
              { value: "4", label: "Principal" },
              { value: "5", label: "Chief" },
              { value: "6", label: "Distinguished" },
            ]}
          />
          <Select
            key="role_type"
            label="Manager Minimum Level"
            placeholder="select role level"
            defaultValue={"3"}
            data={[
              { value: "-1", label: "Not Applicable" },
              { value: "3", label: "Manager" },
              { value: "4", label: "Senior Manager" },
              { value: "5", label: "Head of" },
              { value: "6", label: "General Manager" },
            ]}
          />
        </Grid.Col>
      </Grid>
    </div>
  );
}

export default DutiesList;
