import { useQuery } from "urql";
import { Link } from "react-router-dom";

export const PastLaunchesQuery = `
  query {
    launchesPast {
      id
      mission_name
      launch_date_local
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
  const [result, reexecuteQuery] = useQuery({
    query: PastLaunchesQuery,
  });

  const { data, fetching, error } = result;

  return (
    <div className="launchesList">
      {fetching && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.launchesPast && (
        <table className="launchesList__listing">
          <thead>
            <tr>
              <th>Mission Name</th>
              <th>Rocket Name</th>
              <th>Launch Date</th>
              <th>Launch Success</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.launchesPast.map((launch) => (
              <tr key={launch.id}>
                <td>{launch.mission_name}</td>
                <td>{launch.rocket.rocket_name}</td>
                <td>{launch.launch_date_local}</td>
                <td
                  dangerouslySetInnerHTML={{
                    __html: launch.launch_success
                      ? '<span className="success">Successful</span>'
                      : '<span className="fail">Unsuccessful</span>',
                  }}
                ></td>
                <td>
                  <Link to={`/launch/${launch.id}`}>Show launch detail</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={reexecuteQuery}>Refresh list</button>
    </div>
  );
}

export default LaunchesList;
