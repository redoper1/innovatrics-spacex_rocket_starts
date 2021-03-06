import { useQuery } from "urql";
import LaunchesListTable from "../LaunchesListTable";
import { Box, Typography } from "@mui/material";

export interface Launch {
  id: string;
  mission_name: string;
  launch_date_local: string;
  launch_date_utc: string;
  launch_success: boolean | null;
  links: {
    article_link: string;
    video_link: string;
  };
  rocket: {
    rocket_name: string;
    first_stage: {
      cores: [
        {
          core: {
            reuse_count: number;
          };
        }
      ];
    };
  };
}

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
        first_stage {
          cores {
            core {
              reuse_count
            }
          }
        }
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
    <Box>
      <Typography variant="h1" sx={{ marginTop: 0 }}>
        Past launches list
      </Typography>
      {fetching && <Typography variant="body1">Loading...</Typography>}
      {error && error !== undefined && (
        <Typography variant="body1" sx={{ color: "error.main" }}>
          Error: {error.message}
        </Typography>
      )}
      {!fetching && data && data !== undefined && data.launchesPast && (
        <LaunchesListTable data={data.launchesPast} />
      )}
      {!fetching && !data.launchesPast && (
        <Box sx={{ color: "error.main" }}>No launch was found</Box>
      )}
    </Box>
  );
}

export default LaunchesList;
