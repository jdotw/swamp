import React, { useEffect } from "react";
import { Button, Modal, Group } from "@mantine/core";
import { Box } from "@mantine/core";
import { useForm } from "@mantine/form";
import { FormValidateInput, UseFormReturnType } from "@mantine/form/lib/types";
import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";

export type MutateItemModalMode = "edit" | "create";

export type MutateItemFormValues = Record<string, string>;

export type MutateItemFormValidationRule = (value: string) => string | null;

export interface MutateItemModalFormField {
  key: string;
  initialValue?: string;
  value?: string;
  validation?: MutateItemFormValidationRule;
  element?: ReactJSXElement;
}

export interface MutateItemModalProps {
  fields: MutateItemModalFormField[];

  opened: boolean;
  onChange?: (values: MutateItemFormValues, form: UseFormReturnType<MutateItemFormValues, (values: MutateItemFormValues) => MutateItemFormValues>) => void;
  onSubmit: (values: MutateItemFormValues) => void;
  onClose: () => void;
  mode?: MutateItemModalMode;
  title: string;
  children?: React.ReactNode[] | React.ReactNode;
  testId?: string;
}

export function MutateItemModal({
  fields,
  mode = "create",
  title,
  opened,
  onChange,
  onSubmit,
  onClose,
  children,
  testId,
}: MutateItemModalProps) {
  const initialValues: MutateItemFormValues = Object.fromEntries(
    fields.map((field) => [field.key, field.initialValue ?? ""])
  );

  const validationRules: FormValidateInput<MutateItemFormValues> =
    Object.fromEntries(
      fields.reduce((result, value) => {
        if (value.validation) {
          result.push([value.key, value.validation]);
        }
        return result;
      }, [] as [string, MutateItemFormValidationRule][])
    );


  const form = useForm({
    validate: validationRules,
    initialValues: initialValues,
  });

  const submitForm = (formValues: MutateItemFormValues) => {
    onSubmit(formValues);
    form.reset();
  };

  const cancelClicked = () => {
    form.reset();
    onClose();
  };

  useEffect(() => {
    if (onChange) {
      onChange(form.values, form);
    }
  }, [form.values]);

  useEffect(() => {
    form.setValues(_valuesFromFormFields(fields));
  }, [fields]);

  if (children) {
    children = React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        return React.cloneElement(child, {
          ...form.getInputProps(child.key as string),
        });
      } else {
        return child;
      }
    }) as React.ReactNode[];
  }

  return (
    <Modal opened={opened} onClose={onClose} title={title} data-testid={testId}>
      <Box sx={{ maxWidth: 300, minHeight: 250 }} mx="auto">
        <form onSubmit={form.onSubmit(submitForm)}>
          {children}
          <Group position="right" mt="md">
            <Button variant="outline" onClick={cancelClicked}>
              Cancel
            </Button>
            <Button type="submit">
              {mode === "create" && "Add"}
              {mode === "edit" && "Save"}
            </Button>
          </Group>
        </form>
      </Box>
    </Modal>
  );
}

export function nonEmptyString(value: string, errorString: string) {
  return /^(?!\s*$).+/.test(value) ? null : errorString;
}

export function _valuesFromFormFields(fields: MutateItemModalFormField[]) {
  return Object.fromEntries(
    fields.map((field) => [field.key, field.value ?? ""])
  );
}
