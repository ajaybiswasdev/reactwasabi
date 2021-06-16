import TextField from '@material-ui/core/TextField';
import React, { useEffect, useState } from 'react';
import { Button, Divider, Grid, makeStyles, Theme } from '@material-ui/core';
import RatingView from './RatingView/RatingView';

const useStyles = makeStyles((theme: Theme) => ( {
  root: {
    position: 'relative',
    width: '100%',
    display: 'block',
    padding: theme.spacing(1),
  },
  clickShield: {
    background: 'rgba(0 ,0, 0, 0.1)',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 999
  },
  divider: {
    margin: theme.spacing(1),
  },
  formButton: {
    marginRight: theme.spacing(1),
  },
  textField: {
    width: '100%',
  },
  formRow: {
    marginTop: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
  },
  header: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  bold: {
    fontWeight: 'bold'
  }
} ));

const DynamicForm = (props) => {
  const classes = useStyles();

  const [ notatedFields, setNotatedFields ] = useState([]);

  const handleChange = (prop) => (e) => {
    console.log(prop, e);
  };

  const renderTextField = (formField) => {
    return (
      <TextField variant='outlined'
                 multiline
                 className={ classes.textField }
                 onChange={ handleChange(formField.key) }
      />
    );
  };

  const handleRatingClick = (formField) => (value: string) => {
    if (props.onUpdate) {
      props.onUpdate({ ...formField, value });
    }
  };

  const handleNotesClick = (formField) => {
    let flds = [ ...notatedFields ];
    const idx = flds.findIndex(x => x === formField.id);
    if (idx < 0) {
      flds.push(formField.id);
    } else {
      flds = flds.filter(x => x !== formField.id);
    }
    setNotatedFields([ ...flds ]);
  };

  // TODO
  const handlePhotoClick = (formField) => {
    console.log('formField', formField);
  };

  const renderRating = (formField) => {
    return (
      <>
        { ( formField.style === 'stars' || formField.style === 'colors' ) && (
          <div className={ classes.formRow }>
            <RatingView { ...formField }
                        onRatingClick={ handleRatingClick(formField) }
                        onNotesClick={ () => handleNotesClick(formField) }
                        onPhotoClick={ () => handlePhotoClick(formField) }
            />
          </div>
        ) }
      </>
    );
  };

  const renderCheckboxes = (formField) => {
    return <></>;
  };

  const renderField = (formField) => {
    switch (formField.type) {
      case 'textField':
        return renderTextField(formField);
      case 'rating':
        return renderRating(formField);
      case 'checkboxes':
        return renderCheckboxes(formField);
    }
  };

  const renderCommentField = (formField) => {
    if (notatedFields.includes(formField.id)) {
      return <TextField variant="outlined"
                        key={ [ formField.id, 'notes' ].join('_') }
                        size="small"
                        margin="dense"
                        onChange={ handleChange('comment') }
                        value={ formField.comments }
      />;
    }
    return <></>;
  };

  const handleSubmit = () => {
    if (props.onSubmit) {
      props.onSubmit();
    }
  };

  const handleClear = () => {
    if (props.onClear) {
      props.onClear();
    }
  };

  useEffect(() => {
    if (props.formFields) {
      setNotatedFields(props.formFields.filter(field => field.hasOwnProperty('notes')).map(field => field.id));
    }
  }, [ props ]);

  return (
    <div className={ classes.root }>
      { props.readonly && <div className={ classes.clickShield }/> }
      <Grid container>
        <h2>{ props.title }</h2>
        { props.formFields && props.formFields.map((formField, index) => (
          <Grid container key={ index } className={ classes.formRow }>
            <div className={ classes.bold }>{ formField.label }</div>
            <div>{ formField.description }</div>
            <div>{ renderField(formField) }</div>
            <div>{ renderCommentField(formField) }</div>
          </Grid>
        ))
        }
      </Grid>
      <Divider className={ classes.divider }/>
      <Button className={ classes.formButton } variant='contained' onClick={ handleSubmit }
              color='primary'>Submit</Button>
      <Button className={ classes.formButton } variant='contained' onClick={ handleClear }
              color='default'>Clear</Button>
    </div>
  );
};

export default DynamicForm;
