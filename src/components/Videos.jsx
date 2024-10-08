import React from "react";
import { Stack, Box } from "@mui/material";

import { ChannelCard, Loader, VideoCard } from "./";

const PlaylistCard = ({ playlistDetail }) => (
  <VideoCard video={playlistDetail} />
);

const Videos = ({ videos, direction, justifyContent }) => {
  if (!videos?.length) return <Loader />;

  return (
    <Stack
      direction={direction || "row"}
      flexWrap="wrap"
      justifyContent={justifyContent || "start"}
      alignItems="start"
      gap={2}
    >
      {videos.map((item, idx) => (
        <Box key={idx} width={{ xs: "100%", sm: "auto" }}>
          {item.id?.videoId ? (
            <VideoCard video={item} />
          ) : item.id?.playlistId ? (
            <PlaylistCard playlistDetail={item} />
          ) : (
            item.id?.channelId && <ChannelCard channelDetail={item} />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Videos;
