import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@/redux/store';

const initialState = {
    sidebarOpen: true,
    size: 'medium',
    multiTasking: false,
    theme: 'red',
};

export const SLICE_NAME = 'appConfig';

const appConfigSlice = createSlice({
    name: SLICE_NAME,
    initialState,
    reducers: {
        sidebarOpened(state, action) {
            state.sidebarOpen = true;
        },
        sidebarClosed(state, action) {
            state.sidebarOpen = false;
        },
        sidebarToggled(state) {
            state.sidebarOpen = !state.sidebarOpen;
        },
        sizeChanged(state, action) {
            state.size = action.payload.size;
        },
        multiTaskingChanged(state, action) {
            state.multiTasking = action.payload.multiTasking;
        },
        themeChanged(state, action) {
            state.theme = action.payload.theme;
        },
    },
});

export const { sidebarOpened, sidebarClosed, sidebarToggled, sizeChanged, multiTaskingChanged, themeChanged } = appConfigSlice.actions;

// @ts-ignore
export const selectIsSidebarOpen = (state) => state[SLICE_NAME].sidebarOpen;
// @ts-ignore
export const selectConfigSize = (state) => state[SLICE_NAME].size;

export const selectMultiTaskingEnabled = (state: RootState) => state[SLICE_NAME].multiTasking;

export const selectCurrentTheme = (state: RootState) => state[SLICE_NAME].theme;

export default appConfigSlice.reducer;
