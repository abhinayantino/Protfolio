import React from "react";
import { Filter, SearchInput } from "react-admin";
import { makeStyles } from "@material-ui/core/styles";

const useFilterStyles = makeStyles({
  status: { width: 150 },
});

const ReviewFilter = (props) => {
  const classes = useFilterStyles();
  return (
    <Filter {...props}>
      <SearchInput source="search" alwaysOn />
    </Filter>
  );
};

export default ReviewFilter;
