import React from "react";
import { NumericFormat } from "react-number-format";

export const NumericFormatWrapper = React.forwardRef(({ id, ...rest }: any, ref) => {
    return (
      <NumericFormat
        id={id}
        getInputRef={ref}
        {...rest}
      />
    );
  });