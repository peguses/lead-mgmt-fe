import { createSlice } from "@reduxjs/toolkit";

interface IViewPort {
    height: number;
    width: number;
};

interface ICommon {
    viewPort: IViewPort;
};

const INITIAL_STATE: ICommon = {
    viewPort: { height: 0, width: 0},
};

export const commonSlice = createSlice({
    name: 'commonSlice',
    initialState: INITIAL_STATE,
    reducers: {
        setViewport: (state, action) => {
            state.viewPort = action.payload;
        },
    },
});

export const { setViewport } = commonSlice.actions;
export default commonSlice.reducer;