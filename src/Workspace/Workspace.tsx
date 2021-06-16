import { Divider, makeStyles, Theme } from '@material-ui/core';
import DynamicForm from 'components/DynamicForm/DynamicForm';
import React, { useState } from 'react';
import Controls from './Controls';
import DataView from './DataView';
import { FormFields } from '../config';

const useStyles = makeStyles((theme: Theme) => ( {
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap:'wrap',
  },
  controls: {
    height: '100%',
    maxWidth: '450px',
    minWidth: '450px',
    flexGrow: 1,
    flexDirection: 'column',
    backgroundColor: '#eee',
    border: '1px solid ' + theme.palette.divider,
    padding: theme.spacing(1),
  },
  dynamicForm: {
    height: '100%',
    display: 'flex',
    flexGrow: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
  },
} ));

const Workspace = () => {
  const classes = useStyles();

  const [ currentForm, setCurrentForm ] = useState<any>('Residential');
  const [ formData, setFormData ] = useState<any[]>(FormFields[ currentForm ]);

  const handleFormUpdate = (e) => {
    const data = [ ...formData ];
    const idx = data.findIndex(x => x.id === e.id);
    if (idx >= 0) {
      data[ idx ] = e;
    }
    setFormData(data);
  };

  const handleFormChange = (formName) => {
    setCurrentForm(formName);
    setFormData(FormFields[ formName ]);
  };

  const handleClear = () => {
    setFormData([]);
  };

  return (
    <div className={ classes.root }>
      <div className={ classes.dynamicForm }>
        <DynamicForm
          formFields={ formData }
          title={ currentForm }
          onClear={ handleClear }
          onUpdate={ handleFormUpdate }/>
      </div>
      <div className={ classes.controls }>
        <Controls
          currentForm={ currentForm }
          onFormChange={ handleFormChange }/>
        <Divider/>
        <DataView data={ formData }/>
      </div>
    </div>
  );
};

export default Workspace;
