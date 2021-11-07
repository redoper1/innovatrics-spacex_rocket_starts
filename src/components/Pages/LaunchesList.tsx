import { useQuery } from "urql";
import LaunchesListTable from "../LaunchesListTable";
import { Box, Typography } from "@mui/material";

export const PastLaunchesQuery = `
  query {
    launchesPast {
      id
      mission_name
      launch_date_local
      launch_date_utc
      launch_success
      links {
        article_link
        video_link
      }
      rocket {
        rocket_name
      }
    }
  }  
`;

function LaunchesList() {
  const [result] = useQuery({
    query: PastLaunchesQuery,
  });

  const { data, fetching, error } = result;

  return (
    <div>
      <Typography variant="h1" sx={{ marginTop: 0 }}>
        Past launches list
      </Typography>
      {fetching && <Typography variant="body1">Loading...</Typography>}
      {error && error !== undefined && (
        <Typography variant="body1" sx={{ color: "error.main" }}>
          Error: {error.message}
        </Typography>
      )}
      {data && data.launchesPast && (
        <LaunchesListTable data={data.launchesPast} />
      )}
      {!fetching && !data.launchesPast && (
        <Box sx={{ color: "error.main" }}>No launch was found</Box>
      )}
    </div>
  );
}

export default LaunchesList;
