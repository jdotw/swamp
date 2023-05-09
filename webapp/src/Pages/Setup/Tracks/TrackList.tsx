
import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import { Track, MutateTrack, useTrack } from "../../../Client/Track";
import Loading from "../../../Components/Loading/Loading";
import { MutateTrackModal } from "./MutateTrackModal";
import { useState } from "react";
import { DeleteTrackConfirmModal } from "./DeleteTrackConfirmModal";

const useStyles = createStyles(() => ({
  buttonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 20,
  },
  rowButtonBar: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 10,
  },
  disbandedTrack: {
    color: "gray",
  }
}));

function TrackList() {
  const { classes } = useStyles();
  const { items, loading, createItem, updateItem } = useTrack();
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [mutateModalOpen, setMutateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (loading) return <Loading />;

  const submitTrack = async (newTrack: MutateTrack) => {
    if (selectedTrack) {
      updateItem(selectedTrack.id, newTrack);
    } else {
      await createItem(newTrack);
    }
    setMutateModalOpen(false);
  };

  const editClicked = (track: Track) => {
    setSelectedTrack(track);
    setMutateModalOpen(true);
  };

  const deleteClicked = (track: Track) => {
    setSelectedTrack(track);
    setDeleteModalOpen(true);
  };

  const deleteConfirmed = async (track?: Track) => {
    if (track) {
      await updateItem(track.id, {
        name: track.name,
        parent_id: track.parent_id,
        retired_at_date: new Date().toISOString(),
      }
      );
    }
    setDeleteModalOpen(false);
  }

  const trackRow = (track: Track, level: number) => (
    <tr key={track.id.toString()}>
      <td>
        <Link style={{ marginLeft: level * 20 }} className={track.retired_at_date ? classes.disbandedTrack : ""} to={track.id.toString()}>
          {track.name}
        </Link>
      </td>
      <td>
        <div className={classes.rowButtonBar}>
          <Button onClick={() => editClicked(track)} > Edit</Button>
          <Button onClick={() => deleteClicked(track)}>Delete</Button>
        </div>
      </td>
    </tr >
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
        <Title order={3}>Career Tracks</Title>
        <Text>Tracks (Career Tracks) define the mode of progression in a company, for example there may be an Individual Contributor Track and a separate Management Track. The concept of Tracks in the data model allows us to set different level titles for different Tracks. For example, &quot;Senior Manager&quot; for &quot;Level 5&quot; on the &quot;Manager Track&quot;, and &quot;Principal Engineer&quot; for &quot;Level 5&quot; on the &quot;IC Track&quot;.</Text>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{trackRows(items)}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutateModalOpen(true)}>Add Track</Button>
        </div>
      </div>
      <MutateTrackModal
        track={selectedTrack}
        parentCandidates={items}
        opened={mutateModalOpen}
        onSubmit={submitTrack}
        onClose={() => setMutateModalOpen(false)}
      />
      <DeleteTrackConfirmModal
        track={selectedTrack}
        opened={deleteModalOpen}
        onConfirm={deleteConfirmed}
        onCancel={() => setDeleteModalOpen(false)}
      />
    </>
  );
}

export default TrackList;
