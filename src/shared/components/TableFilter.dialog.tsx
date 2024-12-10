import React, { useState } from "react";
import {
  Button,
  Popover,
  TextField,
  IconButton,
  FormControl,
  FormHelperText,
  Autocomplete,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { Controller, useForm } from "react-hook-form";
import { UserFilters } from "../constants/UserFilters.constant";

export interface Filter {
    key: string
    value: any;
}

export interface FilterDropdownProps {
    onFilter: (filter: Filter) => void
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({onFilter}) => {

  const [anchorEl, setAnchorEl] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<any>({
    mode: "all",
    defaultValues: {
      filterKey: {  name: ""},
      filterValue: "",
    },
  });

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleApplyFilter = ({filterKey, filterValue}) => {
    if (filterKey && filterValue) {
      onFilter({key: filterKey.key, value: filterValue});
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <IconButton
        sx={{
          width: 36,
          height: 36,
          padding: 0,
          border: "2px solid",
          borderColor: "primary.main",
          borderRadius: 2,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            borderColor: "#1E3A5F",
          },
        }}
        color="primary"
        onClick={handleClick}
      >
        <FilterListIcon />
      </IconButton>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        disableRestoreFocus
      >
        <div style={{ padding: "10px" }}>
          <FormControl
            variant={"outlined"}
            size="small"
            fullWidth
            error={Boolean(errors.filterKey)}
          >
            <Controller
              name="filterKey"
              control={control}
              rules={{ required: "The field is required" }}
              render={({ field }) => (
                <Autocomplete
                    size="small"
                  {...field}
                  options={UserFilters}
                  getOptionLabel={(filterKey) => filterKey.name}
                  onChange={(_, newValue) => field.onChange(newValue)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      value={params}
                      label="Filter Key"
                      error={!!errors.filterKey}
                    />
                  )}
                  isOptionEqualToValue={(filterKey, value) => filterKey === value}
                  autoHighlight
                  fullWidth
                />
              )}
            />
            {errors.filterKey && (
              <FormHelperText>
                {String(errors.filterKey?.message)}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            size="small"
            margin="dense"
            label="Filter Value"
            type="text"
            fullWidth
            {...register("filterValue", {
              required: "Value is required"
            })}
            error={!!errors.filterValue}
            helperText={errors.filterValue ? String(errors.filterValue.message) : ""}
          />
          <div style={{ marginTop: "10px" }}>
            <Button size="small" onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button disabled={!isValid} size="small" onClick={handleSubmit(handleApplyFilter)} color="primary">
              Filter
            </Button>
          </div>
        </div>
      </Popover>
    </div>
  );
};

export default FilterDropdown;
