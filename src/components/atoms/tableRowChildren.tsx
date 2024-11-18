import * as React from "react";
import { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import { MdExpandMore, MdExpandLess } from "react-icons/md";
import { Checkbox } from "@mui/material";
import { KeyValueObject } from "@/utils/columnDisplayerAnalyser";
import { Utils } from "@/utils/globalUtils";
import TableActions from "./tableAction";
import { DataActionsType } from "@/types/dataActions.type";

type TableRowWithChildrenProps = {
  row: any;
  columns: string[];
  index: string;
  renderRows: (rows: any[], parentIndex: string) => JSX.Element[];
  hasChildrens: boolean;
  columnToDisplay: {
    [key: string]: string;
  };
  data: KeyValueObject;
  actions: DataActionsType | null;
  onEmitEvent?: (eventData: any) => any;
};
const TableRowWithChildren: React.FC<TableRowWithChildrenProps> = ({
  row,
  index,
  renderRows,
  hasChildrens,
  columnToDisplay,
  data,
  columns,
  actions,
  onEmitEvent,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = Array.isArray(row.childrens) && row.childrens.length > 0;
  const utils = new Utils();
  const datas = columns.map((column) => {
    return utils.getValueByPath(data, columnToDisplay[column]);
  });

  const toggleRow = () => setIsOpen(!isOpen);

  const cellStyle = {
    border: "1px solid #ddd",
    padding: "4px 8px", // Réduit le padding vertical
    height: "24px", // Définit une hauteur fixe pour les cellules
    maxWidth: "300px",
    fontSize: "0.875rem", // Réduit légèrement la taille de la police
  };

  return (
    <>
      <TableRow sx={{ borderBottom: "1px solid #ddd", height: "auto" }}>
        {hasChildrens ? (
          <TableCell align="left" sx={cellStyle}>
            {hasChildren && (
              <IconButton onClick={toggleRow} size="small" sx={{ padding: 0 }}>
                {isOpen ? <MdExpandLess /> : <MdExpandMore />}
              </IconButton>
            )}
          </TableCell>
        ) : (
          ""
        )}
        <TableCell
          align="left"
          sx={{ ...cellStyle, paddingLeft: `${index.split(".").length}0px` }}
        >
          {index}
        </TableCell>
        {datas.map((fieldValue, fieldIndex) => {
          let content: any =
            typeof fieldValue === "string"
              ? fieldValue
              : JSON.stringify(fieldValue);
          if (typeof fieldValue == "boolean")
            content = <Checkbox disabled size="small" checked={fieldValue} />;

          if (fieldValue == null) content = "";
          if (
            typeof fieldValue === "object" &&
            fieldValue !== null &&
            Object.prototype.toString.call(fieldValue) === "[object Object]"
          ) {
            if ("label" in fieldValue) {
              content = fieldValue.label;
            } else if ("name" in fieldValue) {
              content = fieldValue.name;
            } else if ("formatKey" in fieldValue) {
              content = fieldValue.formatKey;
            } else {
              content = JSON.stringify(fieldValue);
            }
          }
          return (
            <>
              <TableCell
                key={data.id + fieldIndex}
                align="left"
                sx={cellStyle}
                className={
                  typeof content == "string" && content.length > 50
                    ? "whitespace-normal break-words"
                    : "whitespace-nowrap overflow-hidden text-ellipsis"
                }
                onClick={() => {}}
              >
                {content}
              </TableCell>
            </>
          );
        })}
        <TableCell key={data.id} sx={cellStyle}>
          <TableActions
            {...{
              actions: actions,
              onEmitEvent: (e) => {
                if (onEmitEvent) onEmitEvent(e);
              },
              data: data,
            }}
          />
        </TableCell>
      </TableRow>
      {hasChildren && isOpen && renderRows(row.childrens, index)}
    </>
  );
};

export default TableRowWithChildren;
