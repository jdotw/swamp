import { useState } from "react";
import { Avatar, Text, Button, Paper, Modal, Group } from "@mantine/core";
import { TextInput, Checkbox, Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { Individual } from "../../Client/Individual";

interface IndividualCardProps {
  individual: Individual;
  onEditClicked: () => void;
}

export function IndividualCard({
  individual,
  onEditClicked,
}: IndividualCardProps) {
  return (
    <Paper
      radius="md"
      withBorder
      p="lg"
      sx={(theme) => ({
        backgroundColor:
          theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
      })}
    >
      <Avatar src={"test"} size={120} radius={120} mx="auto" />
      <Text align="center" size="lg" weight={500} mt="md">
        {individual.first_name} {individual.last_name}
      </Text>
      <Text align="center" color="dimmed" size="sm">
        •
      </Text>
      {onEditClicked ? (
        <Button variant="default" fullWidth mt="md" onClick={onEditClicked}>
          Edit
        </Button>
      ) : (
        <></>
      )}
    </Paper>
  );
}
