import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import { Loader, Videos } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const PlaylistDetail = () => {
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [playlist, setPlaylist] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetchFromAPI(`playlists?id=${id}&part=snippet`),
      fetchFromAPI(`playlistItems?playlistId=${id}&part=snippet`),
    ])
      .then(([playlistInfo, playlistItems]) => {
        setPlaylistInfo(playlistInfo.items[0]);
        setPlaylist(playlistItems.items);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [id]);
  if (!playlistInfo || !playlist) return <Loader />;

  return (
    <Box minHeight="95vh">
      <Box p={2} display="flex" flexDirection="column">
        <Box
          sx={{
            color: "white",
            m: 4,
          }}
        >
          <Typography variant="h3" sx={{ textAlign: "center" }}>
            Title: {playlistInfo.snippet.title}
          </Typography>
          <Typography
            sx={{
              height: "120px",
              textAlign: "center",
              mt: 2,
            }}
          >
            published by: {playlistInfo.snippet.channelTitle}
            <br />
            published at:
            {new Date(playlistInfo.snippet.publishedAt).toLocaleDateString()}
            <br />
            Description: {playlistInfo.snippet.description}
          </Typography>
        </Box>
        <Videos
          videos={playlist.map((item) => {
            const {
              thumbnails,
              title,
              channelId,
              channelTitle,
              resourceId: id,
            } = item.snippet;
            return {
              id,
              snippet: {
                thumbnails,
                title,
                channelId,
                channelTitle,
              },
            };
          })}
          justifyContent="center"
        />
      </Box>
    </Box>
  );
};

export default PlaylistDetail;
