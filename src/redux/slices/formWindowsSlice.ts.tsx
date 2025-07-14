import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { RootState } from "@/redux/store";

export interface IFormWindow {
  id: string;
  title: string;
  formType: string;
  values: any;
  props: any;
  status: "maximised" | "minimised",
}

export interface IFormWindowSlice {
  windows: Array<IFormWindow>
}

const initialState : IFormWindowSlice = {
  windows:[],
};

export const SLICE_NAME = 'formWindow';

const formWindowsSlice = createSlice({
  name: SLICE_NAME,
  initialState,
  reducers: {
    windowCreated(state, action) {
      const {
        title,
        formType,
        values,
        props = {}
      } = action.payload;
      state.windows.push({
        id: uuidv4(),
        title,
        formType,
        values,
        status: "maximised",
        props
      })
      // state.sidebarOpen = true;
    },
    windowMinimised(state, action) {
      const {
        id
      } = action.payload;
      state.windows = state.windows.map(window=>{
        if(id === window.id){
          return({
            ...window,
            status: "minimised"
          })
        }
        return window
      })
    },
    windowMaximised(state, action) {
      const {
        id
      } = action.payload;
      state.windows = state.windows.map(window=>{
        if(id === window.id){
          return({
            ...window,
            status: "maximised"
          })
        }
        return window
      })
    },
    windowClosed(state, action) {
      const {
        id
      } = action.payload;
      state.windows = state.windows.filter(window=> window.id !== id)
    },
    windowUnMounted(state, action){
      const {id, values} = action.payload;
      state.windows = state.windows.map(window=>{
        if(id === window.id){
          return({
            ...window,
            values
          })
        }
        return window
      })
    }
  },
});

export const { windowCreated, windowMaximised, windowMinimised, windowClosed , windowUnMounted} = formWindowsSlice.actions;

export const selectMaximisedWindows = (state: RootState) => state[SLICE_NAME].windows.filter((window: IFormWindow)=> window.status === "maximised");

export const selectMinimisedWindows = (state:RootState) => state[SLICE_NAME].windows.filter((window: IFormWindow)=> window.status === "minimised");

export const selectAllWindows = (state:RootState) => state[SLICE_NAME].windows;
export const selectWindowValuesById = (windowId:string) => (state:RootState) => state[SLICE_NAME]?.windows?.find((item:IFormWindow)=> item.id === windowId)?.values;


export default formWindowsSlice.reducer;
