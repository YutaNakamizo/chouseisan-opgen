import React, {
  useState,
  useEffect,
} from 'react';
import {
  List,
} from '@material-ui/core';
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
  
  return (
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
        />
      ))}
    </List>
  );
};

