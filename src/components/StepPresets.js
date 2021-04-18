import React, {
  useState,
  useEffect,
} from 'react';
import {
  Box,
  List,
  Toolbar,
  Button,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { StepPresetsOption } from '~/components/StepPresetsOption';

export const StepPresets = ({
  options = [],
  onChange = function() {},
  ...props
}) => {
  const handleChange = (index, value) => {
    const _options = [
      ...options,
    ];
    _options[index] = {
      ...options[index],
      enabled: value,
    };
    onChange(_options);
  };
  
  const handleStartTimeChange = (index, value) => {
    const _options = [
      ...options,
    ];
    _options[index] = {
      ...options[index],
      startTime: value,
      endTime: new Date(
        value.getTime()
        + (options[index].endTime.getTime() - options[index].startTime.getTime())
      ),
    };
    onChange(_options); 
  };
  
  const handleEndTimeChange = (index, value) => {
    const _options = [
      ...options,
    ];
    _options[index] = {
      ...options[index],
      endTime: value,
    };
    onChange(_options);  
  };

  const handleDelete = index => {
    const _options = [
      ...options,
    ];
    _options.splice(index, 1);
    onChange(_options);
  };

  const addOption = () => {
    const _options = [
      ...options,
      {
        startTime: new Date(1970, 0, 1, 0, 0),
        endTime: new Date(1970, 0, 1, 1, 30),
        enabled: true,
      },
    ];
    onChange(_options);
  };
  
  return (
    <Box>
      <List
      >
        {options.map((option, index) => (
          <StepPresetsOption
            {...option}
            onStartTimeChange={value => {
              handleStartTimeChange(index, value);
            }}
            onEndTimeChange={value => {
              handleEndTimeChange(index, value);
            }}
            onChange={value => {
              handleChange(index, value);
            }}
            onDelete={() => {
              handleDelete(index);
            }}
          />
        ))}
      </List>
      
      <Toolbar
        variant="dense"
        disableGutters
        style={{
          justifyContent: 'flex-end'
        }}
      >
        <Button
          variant="outlined"
          onClick={addOption}
          startIcon={(
            <AddIcon
            />
          )}
        >
          時間帯を追加
        </Button>
      </Toolbar>
    </Box>
  );
};

