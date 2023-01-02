import React, { useState } from "react";
import { useParams } from "react-router";
import {
  useIndividual,
  Individual as IndividualType,
} from "../../Client/Individual";
import Loading from "../../Loading/Loading";
import { IndividualCard } from "./Card";
import { EditIndividualModal } from "./EditModal";

function Individual() {
  let { individualId: id } = useParams();
  const {
    individual,
    loading: loadingIndividual,
    update: updateIndividual,
  } = useIndividual({
    id,
  });
  const [editModalOpened, setEditModalOpened] = useState(false);

  if (loadingIndividual) {
    return <Loading />;
  }
  if (!individual) {
    return <div>Individual not found</div>;
  }

  const onEditFormSubmit = async (individual: IndividualType) => {
    await updateIndividual(individual);
    setEditModalOpened(false);
  };

  const onEditClicked = () => {
    setEditModalOpened(true);
  };

  return (
    <>
      <IndividualCard individual={individual} onEditClicked={onEditClicked} />
      <EditIndividualModal
        opened={editModalOpened}
        individual={individual}
        onEditFormSubmit={onEditFormSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default Individual;
