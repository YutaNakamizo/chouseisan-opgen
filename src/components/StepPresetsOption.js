import React from 'react';
import {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Checkbox,
  IconButton,
  Button,
  Typography,
} from '@material-ui/core';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';

const formatDate2Time = date => {
  return `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
};

export const StepPresetsOption = ({
  startTime,
  endTime,
  enabled,
  onStartTimeChange = function() {},
  onEndTimeChange = function() {},
  onChange = function() {},
  ...props
}) => {
  return (
    <ListItem
    >
      <ListItemIcon
      >
        <Checkbox
          edge="start"
          checked={enabled}
          onClick={e => {
            onChange(!enabled);
          }}
        />
      </ListItemIcon>
      <ListItemText
        primary={(
          <>
            <Button
              variant="text"
            >
              <Typography
                variant="body1"
              >
                {formatDate2Time(startTime)}
              </Typography>
            </Button>
            〜
            <Button
              variant="text"
            >
              <Typography
                variant="body1"
              >
                {formatDate2Time(endTime)}
              </Typography>
            </Button>
          </>
        )}
      />
      <ListItemSecondaryAction
      >
        <IconButton
          edge="end"
        >
          <DeleteOutlineIcon
          />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

