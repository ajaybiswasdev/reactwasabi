import { makeStyles, MenuItem, Select, Theme, Typography } from '@material-ui/core';
import React from 'react';
import { FormFields } from '../config';

const useStyles = makeStyles((theme: Theme) => ( {
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  button: {
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(1),
  },
} ));

const Controls = (props) => {
  const classes = useStyles();

  const handleFormChange = (e) => {
    if (props.onFormChange) {
      props.onFormChange(e.target.value);
    }
  };

  return (
    <div className={ classes.root }>
      <Typography variant="h6">Controls</Typography>
      <Select
        onChange={ handleFormChange }
        value={ props.currentForm }>
        { Object.keys(FormFields).map(name => (
          <MenuItem key={ name } value={ name }>{ name }</MenuItem>
        )) }
      </Select>
    </div>
  );
};

export default Controls;
