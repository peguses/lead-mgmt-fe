import { Button, Dialog, DialogActions, DialogContent, TextField } from "@mui/material"
import { useEffect, useState } from "react";

export interface TableFilterDialogProp {
    open: boolean;
    position: React.CSSProperties;
    filterKey: string,
    filterDescription: string;
    onSubmit: (e: any, key: any) => void;
    onClose: () => void
}

export const TableFilterDialog: React.FC<TableFilterDialogProp>  = ({open, position, onSubmit, onClose, filterDescription, filterKey}) => {

    const [value, setValue] = useState<string | boolean | number | undefined> ('');

    // useEffect(() => {
    //     console.log(position);
    // },[position])

    return <>
        <Dialog
            open={open}
            onClose={() => {}}
            PaperProps={{
                style: position,
            }}
        >
            <DialogContent>
            <TextField
                label={`Filter by ${filterDescription}`}
                value={value}
                onChange={(e) => {
                    setValue(e.target.value);
                }}
                fullWidth
            />
            </DialogContent>
            <DialogActions>
            <Button onClick={() => onSubmit(value, filterKey)} color="primary">
                Filter
            </Button>
            <Button onClick={() => onClose()} color="secondary">
                Cancel
            </Button>
            </DialogActions>
        </Dialog>
    </>
} 