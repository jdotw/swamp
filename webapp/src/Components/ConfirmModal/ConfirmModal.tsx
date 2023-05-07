import React from "react";
import { Button, Modal, Group, Text } from "@mantine/core";
import { Box } from "@mantine/core";

export interface ConfirmModalProps {
  opened: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  title: string;
  description?: string;
  action?: string;
  children?: React.ReactNode[] | React.ReactNode;
  testId?: string;
}

export function ConfirmModal({
  title,
  description,
  action,
  opened,
  onConfirm,
  onCancel,
  children,
  testId,
}: ConfirmModalProps) {
  const confirmClicked = () => {
    onConfirm();
  }
  const cancelClicked = () => {
    onCancel();
  };

  if (children) {
    children = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {});
      } else {
        return child;
      }
    }) as React.ReactNode[];
  }

  return (
    <Modal opened={opened} onClose={cancelClicked} title={title} data-testid={testId}>
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <Text>{description}</Text>
        {children}
        <Group position="right" mt="md">
          <Button variant="outline" onClick={cancelClicked}>
            Cancel
          </Button>
          <Button onClick={confirmClicked}>{action ?? "OK"}</Button>
        </Group>
      </Box>
    </Modal >
  );
}

