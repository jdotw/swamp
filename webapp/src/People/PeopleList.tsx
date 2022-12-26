import React from "react";
import { usePeople } from "../Client/People";

function PeopleList() {
  const { people, loading: loadingPeople } = usePeople();
  console.log("PEOPLE: ", people);
  return <div>PeopleList</div>;
}

export default PeopleList;
