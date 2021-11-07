import { useTable } from "react-table";
import { useMemo } from "react";

import { Link } from "react-router-dom";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  Link as MuiLink,
  FormControlLabel,
  Checkbox,
  Box,
} from "@mui/material";
import { Check as CheckIcon, Clear as ClearIcon } from "@mui/icons-material";

function Table({ columns, data }: { columns: any; data: any }) {
  const { getTableProps, headerGroups, rows, prepareRow, allColumns } =
    useTable({
      columns,
      data,
      initialState: {
        hiddenColumns: columns
          .filter((col: any) => col.show === false)
          .map((col: any) => col.id || col.accessor) as any,
      },
    });

  return (
    <Box>
      <Box>
        <Box sx={{ fontWeight: "bold" }}>Toggle columns visibility:</Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            flexWrap: "wrap",
          }}
        >
          {allColumns
            .filter((column) => column.id !== "link_to_detail")
            .map((column) => (
              <FormControlLabel
                key={column.id}
                control={
                  <Checkbox
                    color="primary"
                    {...column.getToggleHiddenProps()}
                  />
                }
                label={column.Header}
              />
            ))}
        </Box>
      </Box>
      <Box sx={{ overflowX: "auto" }}>
        <MuiTable {...getTableProps()}>
          <TableHead sx={{ backgroundColor: "grey.200" }}>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell
                    {...column.getHeaderProps()}
                    sx={{ fontWeight: "bold" }}
                  >
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
                <TableRow
                  {...row.getRowProps()}
                  sx={{ backgroundColor: i % 2 ? "grey.100" : "" }}
                >
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
        </MuiTable>
      </Box>
    </Box>
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
        show: false,
      },
      {
        Header: "Launch date (UTC)",
        accessor: "launch_date_utc",
      },
      {
        Header: "Launch status",
        accessor: "launch_success",
      },
      {
        Header: "Reuse count",
        accessor: "reuse_count",
        show: false,
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
        <Chip icon={<CheckIcon />} label="Successfull" color="success" />
      ) : (
        <Chip icon={<ClearIcon />} label="Unsuccessful" color="error" />
      ),
      rocket_name: item.rocket.rocket_name,
      reuse_count: item.rocket.first_stage.cores[0].core.reuse_count,
      link_to_detail: (
        <MuiLink component={Link} to={"/launch/" + item.id}>
          Launch detail
        </MuiLink>
      ),
    };
  });

  return <Table columns={columns} data={data} />;
}

export default LaunchesListTable;
