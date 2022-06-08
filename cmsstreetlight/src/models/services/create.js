import React, { useCallback, Fragment } from "react";
import {
  SimpleForm,
  SelectInput,
  Toolbar,
  SaveButton,
  Create,
  TextInput,
  useCreate,
  useNotify,
  useRedirect,
  required,
} from "react-admin";
import Typography from "@material-ui/core/Typography";
import { Grid } from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import { useNavigate } from "react-router-dom";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useEventStyles = makeStyles((theme) => ({
  divider_line: {
    width: "100%",
    margin: "1em 0",
  },
}));
const Title = ({ record }) => {
  return <span>{record.name}</span>;
};
const CreateViewToolbar = (props) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <Toolbar
      sx={{ display: "flex", justifyContent: "space-between", color: "white" }}
    >
      <Button
        variant="contained"
        label="Back"
        color="secondary"
        size="large"
        startIcon={<ArrowBackIosIcon />}
        onClick={handleGoBack}
      />
      <CustomSaveButton label="Save" redirect="show" submitOnEnter={false} />
    </Toolbar>
  );
};
const CustomSaveButton = (props) => {
  const [create] = useCreate("streetlight/create-streetlight");
  const redirectTo = useRedirect();
  const notify = useNotify();
  const { basePath } = props;
  const handleSave = useCallback(
    (values, redirect) => {
      let field = values;
      create(
        {
          payload: {
            data: {
              code: field.code,
              name: field.name,
              has_netbanking_enach: field.has_netbanking_enach,
              has_debitcard_enach: field.has_debitcard_enach,
              deleted: field.deleted,
            },
          },
        },
        {
          onFailure: (Error) => {
            notify("Internal Server Error", "error", {
              smart_count: 1,
            });
          },
          onSuccess: ({ data: newRecord }) => {
            notify(`Subscription created successfully.`, "success", {
              smart_count: 1,
            });
            redirectTo(redirect, basePath, newRecord.id, newRecord);
          },
        }
      );
    },
    [create, notify, redirectTo, basePath]
  );
  // set onSave props instead of handleSubmitWithRedirect
  return <SaveButton {...props} onSave={handleSave} label="Save" />;
};
const redirect = (basePath, id, data) => {
  return `/bank/`;
};
const CreateView = (props) => {
  const classes = useEventStyles();
  const history = useNavigate();
  const handleGoBack = useCallback(() => {
    history.goBack();
  }, [history]);
  return (
    <Fragment>
      <Grid item xs={12} sm={4}></Grid>
      <Create title={""} {...props}>
        {console.log(props)}
        <SimpleForm toolbar={<CreateViewToolbar />}>
          <Grid container spacing={2} fullWidth={true}>
            <Grid item xs={12} sm={12}>
              <Typography variant="h6">Create User</Typography>
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextInput
                source="name"
                fullWidth={true}
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextInput
                source="email"
                fullWidth={true}
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>
            <Grid item xs={12} sm={3}>
              <SelectInput source="countryCode" />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextInput
                source="mobileNumber"
                fullWidth={true}
                variant="outlined"
                validate={required()}
              ></TextInput>
            </Grid>

            <Divider className={classes.divider_line} variant="middle" />
          </Grid>
        </SimpleForm>
      </Create>
    </Fragment>
  );
};
export default CreateView;
