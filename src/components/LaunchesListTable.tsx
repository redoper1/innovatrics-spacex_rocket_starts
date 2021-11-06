import { useStyles } from "./App";
import MaUTable from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Chip from "@material-ui/core/Chip";
import CheckIcon from "@material-ui/icons/Check";
import ClearIcon from "@material-ui/icons/Clear";
import MaULink from "@material-ui/core/Link";
import { Link } from "react-router-dom";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import { useTable } from "react-table";
import { useMemo, forwardRef, useRef, useEffect } from "react";

interface IndeterminateCheckboxProps {
  indeterminate?: boolean;
  label?: string;
}

const useCombinedRefs = (...refs): React.MutableRefObject<any> => {
  const targetRef = useRef();

  useEffect(() => {
    refs.forEach((ref) => {
      if (!ref) return;

      if (typeof ref === "function") {
        ref(targetRef.current);
      } else {
        ref.current = targetRef.current;
      }
    });
  }, [refs]);

  return targetRef;
};

const IndeterminateCheckbox = forwardRef<
  HTMLInputElement,
  IndeterminateCheckboxProps
>(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef(null);
  const resolvedRef = useCombinedRefs(ref, defaultRef);

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  //return <input type="checkbox" ref={resolvedRef} {...rest} />;

  const label = rest.label ? rest.label : "";

  return (
    <FormControlLabel
      control={<Checkbox ref={resolvedRef} {...rest} />}
      label={label}
    />
  );
});

function Table({ columns, data }) {
  const classes = useStyles();
  const {
    getTableProps,
    headerGroups,
    rows,
    prepareRow,
    allColumns,
    getToggleHideAllColumnsProps,
  } = useTable({
    columns,
    data,
  });

  return (
    <div className="launchesList__table">
      <div className="launchesList__table__columnsControl">
        <h2>Toggle columns visibility</h2>
        <div
          className={classes.dFlex + " " + classes.justifyContentSpaceEvenly}
        >
          <IndeterminateCheckbox
            {...getToggleHideAllColumnsProps()}
            label="Toggle All"
          />
          {allColumns
            .filter((column) => column.id !== "link_to_detail")
            .map((column) => (
              <FormControlLabel
                key={column.id}
                control={<Checkbox {...column.getToggleHiddenProps()} />}
                label={column.Header}
              />
            ))}
        </div>
      </div>
      <MaUTable {...getTableProps()} className="launchesList__table__table">
        <TableHead>
          {headerGroups.map((headerGroup) => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <TableCell {...column.getHeaderProps()}>
                  {column.render("Header")}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
    </div>
  );
}

function LaunchesListTable(props: { data: any[] }) {
  const inputData = props.data;

  const columns = useMemo(
    () => [
      {
        Header: "Mission name",
        accessor: "mission_name",
      },
      {
        Header: "Rocket name",
        accessor: "rocket_name",
      },
      {
        Header: "Launch date (local)",
        accessor: "launch_date_local",
      },
      {
        Header: "Launch date (UTC)",
        accessor: "launch_date_utc",
      },
      {
        Header: "Status",
        accessor: "launch_success",
      },
      {
        Header: "",
        accessor: "link_to_detail",
      },
    ],
    []
  );

  const data = inputData.map((item) => {
    return {
      id: item.id,
      mission_name: item.mission_name,
      launch_date_local: item.launch_date_local,
      launch_date_utc: item.launch_date_utc,
      launch_success: item.launch_success ? (
        <Chip icon={<CheckIcon />} label="Successfull" color="primary" />
      ) : (
        <Chip icon={<ClearIcon />} label="Unsuccessful" color="secondary" />
      ),
      rocket_name: item.rocket.rocket_name,
      link_to_detail: (
        <MaULink component={Link} to={"/launch/" + item.id}>
          Launch detail
        </MaULink>
      ),
    };
  });

  return <Table columns={columns} data={data} />;
}

export default LaunchesListTable;
