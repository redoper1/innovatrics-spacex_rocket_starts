import { useStyles } from "../App";
import MaULink from "@material-ui/core/Link";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";
import { useQuery } from "urql";
import { PastLaunchesQuery } from "./LaunchesList";

import Youtube from "react-youtube";

function LaunchDetail() {
  const classes = useStyles();
  const { launchId } = useParams();

  const [result] = useQuery({
    query: PastLaunchesQuery,
  });

  const { data, fetching, error } = result;

  let launchData = {} as any;
  if (data && data.launchesPast !== undefined) {
    launchData = data.launchesPast.filter(
      (launch) => launch.id === launchId
    )[0];

    if (
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
    <div className="launchDetail">
      <MaULink sx={{ mx: "auto" }} component={Link} to="/">
        Go back to the list
      </MaULink>
      {fetching && <p>Loading...</p>}
      {error && <div className="error">Error: {error.message}</div>}
      {Object.keys(launchData).length > 0 ? (
        <>
          <h1 className="launchDetail__mission_name">
            {launchData.mission_name}
          </h1>
          <div className="launchDetail__launch_dates">
            <div className="launchDetail__launch_dates_launch_date_local">
              Launch date (local): {launchData.launch_date_local}
            </div>
            <div className="launchDetail__launch_dates_launch_date_utc">
              <span className={classes.bold}>Launch date (UTC):</span>{" "}
              <span>{launchData.launch_date_utc}</span>
            </div>
          </div>
          {launchData.youtube_video_id && (
            <Youtube videoId={launchData.youtube_video_id} />
          )}
        </>
      ) : (
        <div className="error">Launch was not found</div>
      )}
    </div>
  );
}

export default LaunchDetail;
