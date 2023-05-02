
import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Track, MutateTrack, useTrack } from "../../../Client/Track";
import Loading from "../../../Components/Loading/Loading";
import { MutateTrackModal } from "./MutateTrackModal";
import { useState } from "react";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
}));

function TrackList() {
  const { classes } = useStyles();
  const { items, loading, createItem } = useTrack();
  const [addModalOpen, setAddModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitNewTrack = async (newTrack: MutateTrack) => {
    await createItem(newTrack);
    setAddModalOpen(false);
  };

  const trackRow = (track: Track, level: number) => (
    <tr key={track.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} to={track.id.toString()}>
          {track.name}
        </Link>
      </td>
    </tr>
  );

  const trackRows = (items: Track[], parent?: Track, level = 0) =>
    items.reduce((acc, track) => {
      if (track.parent_id == (parent?.id ?? 0)) {
        acc.push(trackRow(track, level));
        acc.push(...trackRows(items, track, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Tracks</Title>
        <Text>Tracks (Career Tracks) define the mode of progression in a company, for example there may be an Individual Contributor Track and a separate Management Track. The concept of Tracks in the data model allows us to set different level titles for different Tracks. For example, &quot;Senior Manager&quot; for &quot;Level 5&quot; on the &quot;Manager Track&quot;, and &quot;Principal Engineer&quot; for &quot;Level 5&quot; on the &quot;IC Track&quot;.</Text>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
            </tr>
          </thead>
          <tbody>{trackRows(items)}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setAddModalOpen(true)}>Add Track</Button>
        </div>
      </div>
      <MutateTrackModal
        parentCandidates={items}
        opened={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSubmit={submitNewTrack}
        mode="create"
      />
    </>
  );
}

export default TrackList;
