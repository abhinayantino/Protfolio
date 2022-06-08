import React from "react";
import { List, Datagrid, TextField, EditButton } from "react-admin";
import Filter from "./filter";
import boldHeaderStyle from "../../utils/commonStyle";
import rowStyle from "../../utils/rowStyle";
import { useTheme } from "@material-ui/core/styles";
import { useNavigate } from "react-router-dom";
import { number } from "prop-types";
import PostPagination from "../pagination";
import { withTheme } from "@emotion/react";

const ListView = ({ selectedRow, ...props }) => {
  const classes = boldHeaderStyle;
  const theme = useTheme();

  return (
    <List
      {...props}
      // filters={<Filter />}
      // filterDefaultValues={{ status: " " }}
      // sort={{ field: "created_at", order: "DESC" }}
      pagination={<PostPagination />}
    >
      <Datagrid
        classes={{ headerCell: classes.boldHeaderStyle().headerCell }}
        rowStyle={rowStyle(null, theme)}
        bulkActionButtons={false}
        optimized
        {...props}
        sx={{
          backgroundColor: "rgba(0,0,0,.05)",
          "& .RaDatagrid-headerCell": {
            backgroundColor: "#2196f3",
            color: "white",
          },
        }}
      >
        <TextField source="IMEINumber" sortable={true} label="IMEI Number" />
        <TextField source="Battery_Percent" sortable={true} label="Battery %" />
        <TextField
          source="Battery_Voltage"
          sortable={false}
          label="Battery Voltage"
        />
        <TextField
          source="Battery_Current"
          sortable={false}
          label="Battery-Current"
        />
        <TextField
          source="Battery_Power"
          sortable={false}
          label="Battery-Power"
        />
        <TextField
          source="Solar_Voltage"
          sortable={false}
          label="Solar-Voltage"
        />
        <TextField
          source="Solar_Current"
          sortable={false}
          label="Solar-Current"
        />
        <TextField source="Solar_Power" sortable={false} label="Solar-Power" />
        <TextField
          source="Load_Voltage"
          sortable={false}
          label="Load-Voltage"
        />
        <TextField
          source="Load_Current"
          sortable={false}
          label="Load-Current"
        />
        <TextField source="Load_Power" sortable={false} label="Load-Power" />
        <TextField source="c_flag" sortable={false} label="Charging-flag" />
        <TextField source="b_flag" sortable={false} label="BatteryLow-Flag" />
        <TextField
          source="sys_fault_flag"
          sortable={false}
          label="System-Fault-flag"
        />
        <TextField
          source="overload_flag"
          sortable={false}
          label="Overload-flag"
        />
        <TextField source="date" sortable={false} label="Date " />
        <TextField source="time" sortable={false} label="Time" />
      </Datagrid>
    </List>
  );
};

export default ListView;
