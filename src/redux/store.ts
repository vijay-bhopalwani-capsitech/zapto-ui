import { configureStore } from '@reduxjs/toolkit'
import logger from 'redux-logger'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { encryptTransform } from 'redux-persist-transform-encrypt';

import authSlice , {SLICE_NAME as AUTH_SLICE_NAME} from "@/redux/slices/authSlice"
import appConfigSlice, {SLICE_NAME as APP_CONFIG_SLICE_NAME} from "@/redux/slices/appConfigSlice";
import formWindowsSlice, {SLICE_NAME as FORM_WINDOW_SLICE_NAME} from "@/redux/slices/formWindowsSlice.ts";

const persistedAuthReducer = persistReducer({
    key: AUTH_SLICE_NAME,
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'eeb1e8c6774c7838ce9b36daee8045d099627ec8',
            onError: function (error) {
                console.log("-> error in persist transform", error.message);
                // Handle the error.
            },
        }),
    ],
}, authSlice)

const persistedAppConfigReducer = persistReducer({
    key: APP_CONFIG_SLICE_NAME,
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'eeb1e8c6774c7838ce9b36daee8045d099627ec8',
            onError: function (error) {
                console.log("-> error in persist transform", error.message);
                // Handle the error.
            },
        }),
    ],
}, appConfigSlice)

const persistedFormWindowsReducer = persistReducer({
    key: FORM_WINDOW_SLICE_NAME,
    storage,
    transforms: [
        encryptTransform({
            secretKey: 'eeb1e8c6774c7838ce9b36daee8045d099627ec8',
            onError: function (error) {
                console.log("-> error in persist transform", error.message);
                // Handle the error.
            },
        }),
    ],
}, formWindowsSlice)


export const store = configureStore({
    reducer: {
        [AUTH_SLICE_NAME]: persistedAuthReducer,
        [APP_CONFIG_SLICE_NAME]: persistedAppConfigReducer,
        [FORM_WINDOW_SLICE_NAME]:persistedFormWindowsReducer
    },
    middleware: (getDefaultMiddleware) => {
        if(process.env.NODE_ENV === 'development'){
            return getDefaultMiddleware({ serializableCheck: false }).concat(logger)
        }
        return getDefaultMiddleware({ serializableCheck: false })
    },
})

export const persistor = persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
