import * as React from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

type DynamicTableHeaderProps = {
  columns: string[];
  hasChildrens: boolean;
};

const DynamicTableHeader: React.FC<DynamicTableHeaderProps> = ({
  columns,
  hasChildrens,
}) => (
  <TableRow sx={{ backgroundColor: "#048895", color: "white" }}>
    {hasChildrens ? (
      <TableCell align="left" sx={{ border: "1px solid #ddd" }}></TableCell>
    ) : (
      ""
    )}
    <TableCell
      align="left"
      sx={{
        border: "1px solid #ddd",
        padding: "0px 8px",
        height: "auto",
        maxWidth: "300px",
        fontWeight: 600,
        color: "white",
        minHeight: "10px",
      }}
    >
      #
    </TableCell>
    {columns.map((column) => (
      <TableCell
        key={column}
        align="left"
        sx={{
          border: "1px solid #ddd",
          padding: "0px 8px",
          height: "auto",
          maxWidth: "300px",
          fontWeight: 600,
          color: "white",
          minHeight: "10px",
        }}
      >
        {column.charAt(0).toUpperCase() + column.slice(1)}
      </TableCell>
    ))}
    <TableCell
      align="left"
      sx={{
        border: "1px solid #ddd",
        padding: "0px 8px",
        height: "auto",
        maxWidth: "300px",
        fontWeight: 600,
        color: "white",
        minHeight: "10px",
      }}
    >
      Actions
    </TableCell>
  </TableRow>
);

export default DynamicTableHeader;
