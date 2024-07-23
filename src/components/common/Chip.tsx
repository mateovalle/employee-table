import React from 'react';
import {Box, Typography} from "@mui/material";

type ChipProps = {
  label: string;
  color?: string | null;
}
const Chip = ({label, color = "#516B7B"}: ChipProps) => {
  const fontColor = color || "#516B7B";
  return (
      <Typography
        border={'1px solid #E2E8F0'}
        borderRadius={"4px"}
        bgcolor={`${fontColor}22`}
        color={fontColor}
        paddingX={1}
        paddingY={"2px"}
        variant={"subtitle2"}
        display={"inline"}
      >
        {label}
      </Typography>
  );
};

export default Chip;