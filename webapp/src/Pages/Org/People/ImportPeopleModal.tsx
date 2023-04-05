import React, { useEffect, useState } from "react";
import { Avatar, Box, Text, Button, Paper, Modal, Group, Progress, FileButton } from "@mantine/core";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { useUpload } from "../../../Client/CRUD/Upload";

export interface ImportPeopleModalProps {
  opened: boolean;
  onSubmit: (values: ImportPeopleFormValues) => void;
  onClose: () => void;
}

export function ImportPeopleModal({
  opened,
  onSubmit,
  onClose,
  children,
}: ImportPeopleModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const { uploading, upload, error } = useUpload({ endpoint: "/api/org/persons/import" });

  const onSelectFile = (file) => {
    console.log("FILE: ", file);
  }

  const cancelClicked = () => {
    resetState();
    onClose();
  };


  const onImport = async () => {
    try {
      const response = await upload(file);
      console.log("RESP: ", response);
    } catch (e) {
      console.log("ERROR: ", e);
    }
  }

  const resetState = () => {
    setFile(null);
    setUploading(false);
    setProgress(0);
  }

  return (
    <Modal opened={opened} onClose={onClose} title="Import People from CSV">
      <Box sx={{ maxWidth: 300 }} mx="auto">
        <FileButton onChange={setFile} accept="text/csv">
          {(props) => <Button disabled={uploading} {...props}>Select File...</Button>}
        </FileButton>
        {file && <Text>{file.name}</Text>}
        {uploading && <Progress value={progress} />}
        <Group position="right" mt="md">
          <Button disabled={uploading} variant="outline" onClick={cancelClicked}>
            Cancel
          </Button>
          <Button disabled={uploading} onClick={() => onImport()}>
            Import
          </Button>
        </Group>
      </Box>
    </Modal>
  );
}
