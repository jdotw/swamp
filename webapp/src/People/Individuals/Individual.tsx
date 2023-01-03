import React, { useState } from "react";
import { useParams } from "react-router";
import {
  useIndividual,
  Individual as IndividualType,
  MutateIndividual,
} from "../../Client/Individual";
import Loading from "../../Loading/Loading";
import {
  MutateIndividualModal,
  MutateIndividualModalMode,
} from "../MutateIndividualModal";
import { IndividualCard } from "./Card";

function Individual() {
  const { individualId: id } = useParams();
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
  if (!id || !individual) {
    return <div>Individual not found</div>;
  }

  const onEditSubmit = async (updatedIndividual: MutateIndividual) => {
    await updateIndividual(id, updatedIndividual);
    setEditModalOpened(false);
  };

  const onEditClicked = () => {
    setEditModalOpened(true);
  };

  return (
    <>
      <IndividualCard individual={individual} onEditClicked={onEditClicked} />
      <MutateIndividualModal
        title={"Edit Individual"}
        mode={MutateIndividualModalMode.Edit}
        opened={editModalOpened}
        individual={individual}
        onSubmit={onEditSubmit}
        onClose={() => setEditModalOpened(false)}
      />
    </>
  );
}

export default Individual;
