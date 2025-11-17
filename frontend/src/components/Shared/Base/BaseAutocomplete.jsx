import React from "react";
import { twMerge } from "tailwind-merge";
import { TextField, Autocomplete } from "@mui/material";
import { PaperSelectAll } from "./PaperSelectAll";
import { PaperAddNew } from "./PaperAddNew";

const BaseAutocompleteContext = React.createContext(null);

export const useBaseAutocompleteContext = () => {
  const context = React.useContext(BaseAutocompleteContext);

  if (!context) throw new Error("BaseAutocomplete Context not provided!");

  return context;
};

const BaseAutocomplete = ({
  required = false,
  fullWidth = false,
  label,
  placeholder,
  size = "small",
  className,
  error = false,
  helperText = "",
  getOptionLabel = (option) => (option && option?.label) || "",
  isOptionEqualToValue = (option, value) => option?.id === value?.id,
  ...props
}) => {
  const [inputValue, setInputValue] = React.useState("");

  let value = props?.value || "";

  if (!value && props.multiple) value = [];

  return (
    <BaseAutocompleteContext.Provider
      value={{
        ...props,
        inputValue,
      }}
    >
      <div className={twMerge("w-60", className, fullWidth && "w-full")}>
        <Autocomplete
          size="small"
          autoHighlight
          renderInput={(params) => (
            <TextField
              {...{
                ...params,
                required,
                label,
                placeholder,
                size,
                error,
                helperText,
              }}
              variant="outlined"
            />
          )}
          {...{
            ...props,
            value,
            getOptionLabel,
            isOptionEqualToValue,

            inputValue,
            onInputChange: (_, newInputValue) => setInputValue(newInputValue),
          }}
        />
      </div>
    </BaseAutocompleteContext.Provider>
  );
};

BaseAutocomplete.PaperAddNew = PaperAddNew;

BaseAutocomplete.PaperSelectAll = PaperSelectAll;

export default BaseAutocomplete;
