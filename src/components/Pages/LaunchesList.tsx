import { useQuery } from "urql";
import LaunchesListTable from "../LaunchesListTable";
import { useStyles } from "../App";

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
  const classes = useStyles();

  const [result] = useQuery({
    query: PastLaunchesQuery,
  });

  const { data, fetching, error } = result;

  return (
    <div className="launchesList">
      <h1 className={classes.mt0}>Past launches list</h1>
      {fetching && <p>Loading...</p>}
      {error && <p className="error">Error: {error.message}</p>}
      {data && data.launchesPast ? (
        <LaunchesListTable data={data.launchesPast} />
      ) : (
        <div className="error">No launch was found</div>
      )}
    </div>
  );
}

export default LaunchesList;
