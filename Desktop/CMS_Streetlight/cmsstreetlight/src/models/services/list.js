import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import Filter from "./filter";
import boldHeaderStyle from "../../utils/commonStyle";
import rowStyle from "../../utils/rowStyle";
import { useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";

const ListView = ({ selectedRow, ...props }) => {
  const classes = boldHeaderStyle;
  const theme = useTheme();

  return (
    <List
      {...props}
      filters={<Filter />}
      // filterDefaultValues={{ status: " " }}
      // sort={{ field: "created_at", order: "DESC" }}
      bulkActionButtons={false}
    >
      <Datagrid
        classes={{ headerCell: classes.boldHeaderStyle().headerCell }}
        rowStyle={rowStyle(null, theme)}
        optimized
        {...props}
      >
        <TextField source="name" sortable={true} label="Name" />
        <TextField source="email" sortable={false} label="E-mail" />
        <TextField source="countryCode" sortable={false} label="Country-Code" />
        <TextField source="mobileNumber" sortable={false} label="Mobile No." />
        <EditButton {...props} />
      </Datagrid>
    </List>
  );
};

export default ListView;
