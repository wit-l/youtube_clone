import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { fetchFromAPI } from "../utils/fetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    Promise.all([
      fetchFromAPI(`channels?part=snippet&id=${id}`),
      fetchFromAPI(`search?channelId=${id}&part=snippet%2Cid&order=date`),
    ])
      .then(([data, videosData]) => {
        setChannelDetail(data?.items[0]);
        setVideos(videosData?.items);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div
          style={{
            height: "300px",
            background:
              "linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)",
            zIndex: 10,
          }}
        />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
        <Videos videos={videos} justifyContent="center" />
      </Box>
    </Box>
  );
};

export default ChannelDetail;
