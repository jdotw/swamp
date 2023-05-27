import { Text, Button, createStyles, Table, Title } from "@mantine/core";
import { Link } from "react-router-dom";
import Loading from "../../../Components/Loading/Loading";
import { MutateTrackModal } from "./MutateTrackModal";
import { useState } from "react";
import { DeleteTrackConfirmModal } from "./DeleteTrackConfirmModal";
import { trpc, Track, TrackCreateInput, TrackUpdateInput } from "@/Utils/trpc";

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
  },
}));

function TrackList() {
  const { classes } = useStyles();
  // const { items, loading, createItem, updateItem } = useTrack();
  const trackQuery = trpc.tracks.list.useQuery();
  const trackCreator = trpc.tracks.create.useMutation();
  const trackUpdater = trpc.tracks.update.useMutation();
  const trackDeleter = trpc.tracks.delete.useMutation();
  const [selectedTrack, setSelectedTrack] = useState<Track>();
  const [mutateModalOpen, setMutateModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  if (trackQuery.isLoading) return <Loading />;

  const submitTrack = async (newTrack: TrackCreateInput | TrackUpdateInput) => {
    if (selectedTrack) {
      await trackUpdater.mutateAsync({
        id: selectedTrack.id,
        track: newTrack as TrackUpdateInput,
      });
    } else {
      await trackCreator.mutateAsync(newTrack as TrackCreateInput);
    }
    await trackQuery.refetch();
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
      await trackDeleter.mutateAsync(track.id);
    }
    await trackQuery.refetch();
    setDeleteModalOpen(false);
  };

  const trackRow = (track: Track, level: number) => (
    <tr key={track.id.toString()}>
      <td>
        <Link
          style={{ marginLeft: level * 20 }}
          className={track.retired_at ? classes.disbandedTrack : ""}
          to={track.id.toString()}
        >
          {track.name}
        </Link>
      </td>
      <td>
        <div className={classes.rowButtonBar}>
          <Button onClick={() => editClicked(track)}> Edit</Button>
          <Button onClick={() => deleteClicked(track)}>Delete</Button>
        </div>
      </td>
    </tr>
  );

  const trackRows = (items: Track[], parent?: Track, level = 0) =>
    items.reduce((acc, track) => {
      if (track.parent_id == parent?.id) {
        acc.push(trackRow(track, level));
        acc.push(...trackRows(items, track, level + 1));
      }
      return acc;
    }, [] as JSX.Element[]);

  return (
    <>
      <div>
        <Title order={3}>Career Tracks</Title>
        <Text>
          Tracks (Career Tracks) define the mode of progression in a company,
          for example there may be an Individual Contributor Track and a
          separate Management Track. The concept of Tracks in the data model
          allows us to set different level titles for different Tracks. For
          example, &quot;Senior Manager&quot; for &quot;Level 5&quot; on the
          &quot;Manager Track&quot;, and &quot;Principal Engineer&quot; for
          &quot;Level 5&quot; on the &quot;IC Track&quot;.
        </Text>
        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{trackRows(trackQuery.data ?? [])}</tbody>
        </Table>
        <div className={classes.buttonBar}>
          <Button onClick={() => setMutateModalOpen(true)}>Add Track</Button>
        </div>
      </div>
      <MutateTrackModal
        track={selectedTrack}
        parentCandidates={trackQuery.data}
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
