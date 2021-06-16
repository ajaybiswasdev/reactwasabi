import React from 'react';
import { makeStyles, Theme, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme: Theme) => ( {
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: 'calc(100% - 100px)',
    overflowY: 'scroll',
  },
  datasection: {
    whiteSpace: 'pre-wrap',
  },
} ));
const DataView = (props) => {
  const classes = useStyles();

  return (
    <>
      <Typography variant="h6">Form Data</Typography>
      <div className={ classes.root }>
        <pre className={ classes.datasection }>{ JSON.stringify(props.data, null, 2) }</pre>
      </div>
    </>
  );
};

export default DataView;
