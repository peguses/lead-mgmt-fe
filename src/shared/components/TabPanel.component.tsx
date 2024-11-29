import { Box } from "@mui/material";

interface TabPanel {
  value: number;
  index: number;
  children: any;
}

export const TabPanel: React.FC<TabPanel> = (props) => {
  return (
    <div
      role="tabpanel"
      hidden={props.value !== props.index}
      id={`tabpanel-${props.index}`}
      aria-labelledby={`tab-${props.index}`}
    >
      {props.value === props.index && (
        <Box sx={{ padding: 3 }}>{props.children}</Box>
      )}
    </div>
  );
};
