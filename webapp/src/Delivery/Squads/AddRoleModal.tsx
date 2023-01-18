// import { Button, Modal, Group, Select } from "@mantine/core";
// import { TextInput, Box } from "@mantine/core";
// import { useForm } from "@mantine/form";
// import { NewSquadRole } from "../../Client/Squad";
// import Loading from "../../Loading/Loading";
// import { useSquadRoleTypes } from "../../Client/SquadRoleTypes";
// import { useIndividual } from "../../Client/Individual";

// interface AddRoleModalProps {
//   tribeId: string;
//   squadId: string;
//   opened: boolean;
//   onSubmit: (role: NewSquadRole) => void;
//   onClose: () => void;
// }

// type AddSquadFormValues = {
//   individual_id: string;
//   role_type_id: string;
// };

// export function AddRoleModal({
//   opened,
//   onSubmit,
//   onClose,
//   tribeId,
//   squadId,
// }: AddRoleModalProps) {
//   const { loading: loadingRoleTypes, roleTypes } = useSquadRoleTypes();
//   const { loading: loadingPeople, items: individuals } = useIndividual();

//   const form = useForm({
//     initialValues: {
//       individual_id: "",
//       role_type_id: "",
//     },

//     validate: {
//       // name: (value) => (/^[\s\w]+$/.test(value) ? null : "Name is required"),
//     },
//   });

//   if (loadingRoleTypes || loadingPeople) {
//     return <Loading />;
//   }

//   const roleTypesData = roleTypes.map((roleType) => {
//     return { value: roleType.id.toString(), label: roleType.name };
//   });

//   const individualsData = individuals.map((individual) => {
//     return {
//       value: individual.id.toString(),
//       label: individual.first_name + " " + individual.last_name,
//     };
//   });

//   const submitForm = (values: AddSquadFormValues) => {
//     let role: NewSquadRole = {
//       squad_id: squadId,
//       tribe_id: tribeId,
//       individual_id: values.individual_id,
//       squad_role_type_id: values.role_type_id,
//     };
//     onSubmit(role);
//   };

//   const cancelClicked = () => {
//     form.reset();
//     onClose();
//   };

//   return (
//     <Modal opened={opened} onClose={onClose} title="Add Role">
//       <Box sx={{ maxWidth: 300 }} mx="auto">
//         <form onSubmit={form.onSubmit(submitForm)}>
//           <Select
//             label="Role Type"
//             placeholder="select role type"
//             data={roleTypesData}
//             {...form.getInputProps("role_type_id")}
//           />
//           <Select
//             label="Individual"
//             placeholder="select individual"
//             data={individualsData}
//             {...form.getInputProps("individual_id")}
//           />
//           <Group position="right" mt="md">
//             <Button variant="outline" onClick={cancelClicked}>
//               Cancel
//             </Button>
//             <Button type="submit">Save</Button>
//           </Group>
//         </form>
//       </Box>
//     </Modal>
//   );
// }
