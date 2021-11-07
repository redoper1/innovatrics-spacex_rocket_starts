import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { PastLaunchesQuery, Launch } from "./LaunchesList";

import Youtube from "react-youtube";
import {
  Link as MuiLink,
  Typography,
  Box,
  Table as MuiTable,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

function LaunchDetail() {
  const { launchId } = useParams();

  const [result] = useQuery({
    query: PastLaunchesQuery,
  });

  const { data, fetching, error } = result;

  let launchData = {} as any;
  if (
    !fetching &&
    data &&
    data !== undefined &&
    data.launchesPast !== undefined &&
    launchId !== undefined
  ) {
    launchData = data.launchesPast.filter(
      (launch: Launch) => launch.id === launchId
    )[0];
    if (
      launchData &&
      launchData !== undefined &&
      typeof launchData.links.video_link === "string" &&
      (launchData.links.video_link.startsWith("https://youtu.be") ||
        launchData.links.video_link.startsWith("https://youtube.com"))
    ) {
      launchData.youtube_video_id = launchData.links.video_link
        .split("/")
        .pop();
    }
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <MuiLink sx={{ mx: "auto" }} component={Link} to="/">
        {"<< Go back to the list"}
      </MuiLink>
      {fetching && <p>Loading...</p>}
      {error && error !== undefined && (
        <Box sx={{ color: "error.main" }}>Error: {error.message}</Box>
      )}
      {launchData !== undefined && Object.keys(launchData).length > 0 && (
        <>
          <Typography variant="h1" sx={{ textAlign: "center" }}>
            {launchData.mission_name}
          </Typography>
          <MuiTable>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Launch date (local):
                </TableCell>
                <TableCell>{launchData.launch_date_local}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Launch date (UTC):
                </TableCell>
                <TableCell>{launchData.launch_date_utc}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Rocket name:</TableCell>
                <TableCell>{launchData.rocket.rocket_name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Reuse count:</TableCell>
                <TableCell>
                  {launchData.rocket.first_stage.cores[0].core.reuse_count}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  Launch status:
                </TableCell>
                <TableCell
                  sx={{
                    fontWeight: "bold",
                    color: launchData.launch_success
                      ? "success.main"
                      : "error.main",
                  }}
                >
                  {launchData.launch_success ? "Successfull" : "Unsuccessful"}
                </TableCell>
              </TableRow>
            </TableBody>
          </MuiTable>
          {launchData.youtube_video_id && (
            <Box sx={{ mx: "auto", mt: "1em" }}>
              <Youtube videoId={launchData.youtube_video_id} />
            </Box>
          )}
        </>
      )}
      {!fetching &&
        (launchData === undefined || Object.keys(launchData).length === 0) && (
          <Typography
            variant="h1"
            sx={{ color: "error.main", textAlign: "center", marginTop: 0 }}
          >
            Launch was not found
          </Typography>
        )}
    </Box>
  );
}

export default LaunchDetail;
