import React, { useEffect, useState } from 'react';
import { faStar as emptyStar } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faCheck, faComment, faStar as filledStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, IconButton, makeStyles, Theme } from '@material-ui/core';
import { ColorMaps } from '../../../config';


import S3 from 'aws-sdk/clients/s3';
const AWS = require('aws-sdk');
const wasabiEndpoint = new AWS.Endpoint('s3.us-east-1.wasabisys.com');
const useStyles = makeStyles((theme: Theme) => ({
  clickable: {
    cursor: 'pointer',
    marginRight: theme.spacing(1)
  },
  icon: {
    marginRight: theme.spacing(1),
    cursor: 'pointer',
  },
  wrapper: {
    display: 'inline-flex',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  empty: {
    color: 'transparent',
  },
  filled: {
    color: theme.palette.primary.main,
  },
}));

const RatingView = (props) => {
  const classes = useStyles();

  const [ratings, setRatings] = useState([] as any[]);

  const handleRatingClick = (value: number) => (e) => {
    if (props.onRatingClick) {
      props.onRatingClick(value);
    }
  };

  const handleNotesClick = () => {
    if (props.onNotesClick) {
      props.onNotesClick();
    }
  };

  const handlePhotoClick = () => {
    if (props.onPhotoClick) {
      props.onPhotoClick();
    }
  };

  useEffect(() => {
    const ratingNodes: React.ReactNode[] = [];

    if (props.style === 'stars') {
      for (let i = 1; i <= props.maxValue; i++) {
        ratingNodes.push(
          <FontAwesomeIcon key={props.id + '_' + i}
            icon={props.value < i ? emptyStar : filledStar}
            className={classes.clickable}
            onClick={handleRatingClick(i)}
            size='2x'
          />,
        );
      }
    }

    if (props.style === 'colors') {
      const index: number = ColorMaps.findIndex(x => x.name === props.colorMap);
      for (let i = 1; i <= props.maxValue; i++) {
        ratingNodes.push(
          <Button variant="contained"
            className={classes.clickable}
            disableRipple
            disableFocusRipple
            onClick={handleRatingClick(i)}
            style={{ background: ColorMaps[index].getColor((i - 1) / (props.maxValue - 1)) }}>
            <FontAwesomeIcon icon={faCheck}
              style={{ opacity: props.value === i ? 1 : 0 }}
            />
          </Button>
        );
      }
    }

    setRatings(ratingNodes);
  }, [props]);

  const handleChange = (e) => {
    var f = e[0];
    var fileName = f.name;
    console.log('e', e)
    const s3 = new S3({
      endpoint: wasabiEndpoint,
      region: 'us-east-1',
      accessKeyId: 'EM7EN26R9DZQ3MQFFFM7',
      secretAccessKey: 'U8VJ2SCGu6BEStEJXeZvEaD2DCSSio0zuVPLhLyi',
    });

    s3.putObject({
      Body: f,
      Bucket: "test-jamal-h",
      Key: fileName
    }
      , (err, data) => {
        if (err) {
          console.log(err);
        }
      });
  };
  return (
    <div className={classes.wrapper}>
      {ratings}
      <IconButton color="inherit" onClick={() => { handleNotesClick() }}>
        <FontAwesomeIcon icon={faComment} />
      </IconButton>
      <IconButton color="inherit" onClick={() => { handlePhotoClick() }}>
        <FontAwesomeIcon icon={faCamera} />
      </IconButton>
      <input type="file" accept="image/*" capture="camera" onChange={(e) => { handleChange(e.target.files) }} />
    </div>
  );
};

export default RatingView;


