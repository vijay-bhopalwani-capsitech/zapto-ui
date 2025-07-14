import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getProfileRequest, loginRequest, logoutRequest, userOnBoardingRequest, userChangePasswordRequest, registerUserRequest, updateProfileRequest } from '@/services/authService';
import { RootState } from '@/redux/store';
import { IAuthState, IGetProfileResult, IUser } from '@/@types/auth';
import { callApiThunk } from '@/utils/apiUtils/callApiThunk';
import { parseApiErrorResponse } from 'ui-helpers';

const initialState = {
    isAuthenticated: false,
    accessToken: '',
    refreshToken: '',
    googleToken: '',
    authLoading: false,
    initialAuthLoading: true,
    user: null,
};

export const SLICE_NAME = 'auth';

export const loginUser = createAsyncThunk(
    `${SLICE_NAME}/login`,
    async (
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        },
        thunkApi
    ) => {
        const response = await callApiThunk<IGetProfileResult>({
            requestFunction: loginRequest({ email, password }),
            thunkApi,
            authErrorCode: 403,
        });
        if (response?.error) {
            return thunkApi.rejectWithValue(response);
        }
        return response as IGetProfileResult;
    }
);

export const getUserProfile = createAsyncThunk(`${SLICE_NAME}/getUserProfile`, async (_, thunkApi) => {
    const accessToken = selectAccessToken(thunkApi.getState() as RootState);
    const result = await callApiThunk<IGetProfileResult>({
        requestFunction: getProfileRequest({ accessToken }),
        thunkApi,
    });
    if (result.error) {
        return thunkApi.rejectWithValue(result);
    }
    return result;
});

export const updateUserProfile = createAsyncThunk(`${SLICE_NAME}/updateUserProfile`, async (payload: any, thunkApi) => {
    const response = await callApiThunk<IGetProfileResult>({
        requestFunction: updateProfileRequest(payload),
        thunkApi,
        authErrorCode: 403,
    });
    if (response?.error) {
        return thunkApi.rejectWithValue(response);
    }
    return response as IGetProfileResult;
});

export const logoutUser = createAsyncThunk(`${SLICE_NAME}/logout`, async (_, thunkApi) => {
    // @ts-ignore
    const refreshToken = thunkApi.getState()[SLICE_NAME].refreshToken;
    const response = await callApiThunk({
        requestFunction: logoutRequest({ refreshToken }),
        thunkApi,
    });
    if (response?.error) {
        return thunkApi.rejectWithValue(response);
    }
    return response;
});

export const userOnBoarding = createAsyncThunk(
    `${SLICE_NAME}/onBoarding`,
    async (
        {
            email,
            password,
        }: {
            email: string;
            password: string;
        },
        thunkApi
    ) => {
        const userId = selectUserId(thunkApi.getState() as RootState);
        const response = await callApiThunk({
            requestFunction: userOnBoardingRequest({ userId, email, password }),
            thunkApi,
        });
        if (response?.error) {
            return thunkApi.rejectWithValue(response);
        }
        return response;
    }
);

export const userChangePassword = createAsyncThunk(
    `${SLICE_NAME}/changePassword`,
    async (
        {
            oldPassword,
            newPassword,
        }: {
            oldPassword: string;
            newPassword: string;
        },
        thunkApi
    ) => {
        const response = await callApiThunk({
            requestFunction: userChangePasswordRequest({ oldPassword, newPassword }),
            thunkApi,
        });
        if (response?.error) {
            return thunkApi.rejectWithValue(response);
        }
        return response;
    }
);

export const registerUser = createAsyncThunk(`${SLICE_NAME}/register`, async (payload: any, thunkAPI) => {
    try {
        const response = await callApiThunk<IGetProfileResult>({
            requestFunction: registerUserRequest(payload),
            callRefreshTokenOnAuthError: false,
            thunkApi: thunkAPI,
        });
        if (response.error) {
            return thunkAPI.rejectWithValue(response);
        }
        return response;
    } catch (error) {
        return thunkAPI.rejectWithValue(parseApiErrorResponse({ error }));
    }
});

const authSlice = createSlice({
    name: SLICE_NAME,
    initialState: initialState as IAuthState,
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action?.payload ?? {};
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        },
        setOAuthData: (state, action) => {
            const { accessToken, refreshToken, googleToken, user } = action?.payload ?? {};
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.googleToken = googleToken;
            state.user = user;
            state.isAuthenticated = true;
            state.authLoading = false;
            state.initialAuthLoading = false;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(loginUser.fulfilled, (state, { payload }) => {
            const accessToken = payload?.tokens?.access?.token ?? '';
            const refreshToken = payload?.tokens?.refresh?.token ?? '';
            state.authLoading = false;
            state.isAuthenticated = true;
            state.initialAuthLoading = false;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = payload?.user ?? {};
        });
        builder.addCase(loginUser.rejected, (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        });
        builder.addCase(logoutUser.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(logoutUser.fulfilled, (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        });
        builder.addCase(logoutUser.rejected, (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        });
        builder.addCase(getUserProfile.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(getUserProfile.fulfilled, (state, { payload }) => {
            state.initialAuthLoading = false;
            state.authLoading = false;
            if ('user' in payload) {
                state.user = payload.user as IUser;
            }
        });
        builder.addCase(getUserProfile.rejected, (state) => {
            state.initialAuthLoading = false;
            state.authLoading = false;
        });

        builder.addCase(updateUserProfile.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(updateUserProfile.fulfilled, (state, { payload }) => {
            state.initialAuthLoading = false;
            state.authLoading = false;
            if ('user' in payload) {
                state.user = payload.user as IUser;
            }
        });
        builder.addCase(updateUserProfile.rejected, (state) => {
            state.initialAuthLoading = false;
            state.authLoading = false;
        });

        builder.addCase(registerUser.pending, (state) => {
            state.authLoading = true;
        });
        builder.addCase(registerUser.fulfilled, (state, { payload }: any) => {
            const accessToken = payload?.tokens?.access?.token ?? '';
            const refreshToken = payload?.tokens?.refresh?.token ?? '';
            state.authLoading = false;
            state.isAuthenticated = true;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            state.user = payload?.user ?? {};
        });
        builder.addCase(registerUser.rejected, (state) => {
            state.authLoading = false;
            state.isAuthenticated = false;
            state.accessToken = '';
            state.refreshToken = '';
            state.user = null;
        });
    },
});

export const { setTokens, setOAuthData } = authSlice.actions;

export const selectIsAuthenticated = (state: RootState) => state[SLICE_NAME].isAuthenticated;
export const selectAuthLoading = (state: RootState) => state[SLICE_NAME].authLoading;
export const selectInitialAuthLoading = (state: RootState) => state[SLICE_NAME].initialAuthLoading;
export const selectAccessToken = (state: RootState) => state[SLICE_NAME].accessToken;
export const selectRefreshToken = (state: RootState) => state[SLICE_NAME].refreshToken;
// @ts-ignore
export const selectJobSeekerDetails = (state: RootState) => state[SLICE_NAME].user.jobSeekerInfo;
export const selectUserDetails = (state: RootState) => state[SLICE_NAME].user;
export const selectUserType = (state: RootState) => state[SLICE_NAME]?.user?.userType;
export const selectUserRoles = (state: RootState) => state[SLICE_NAME]?.user?.roles;
export const selectUserStaffRoles = (state: RootState) => state[SLICE_NAME]?.user?.userRoles;
export const selectClientUserOnBoarding = (state: RootState) => (state[SLICE_NAME]?.user?.userType === 'CRM_CLIENT_USER' ? state[SLICE_NAME]?.user?.onBoarding : null);
export const selectCandidateUserOnBoarding = (state: RootState) => (state[SLICE_NAME]?.user?.userType === 'JOB_SEEKER' ? state[SLICE_NAME]?.user?.onBoarding : null);
export const selectUserProfile = (state: RootState) => state[SLICE_NAME]?.user?.profile;

export const selectUserProfileId = (state: RootState) => state[SLICE_NAME]?.user?.profile?._id;

export const selectUserName = (state: RootState) => (state[SLICE_NAME]?.user?.profile?.name ? `${state[SLICE_NAME]?.user?.profile?.name.first} ${state[SLICE_NAME]?.user?.profile?.name.last}` : '');

export const selectUserSlug = (state: RootState) => (state[SLICE_NAME]?.user?.profile?.username ? `${state[SLICE_NAME]?.user?.profile?.username}` : '');

export const selectUserProfileImage = (state: RootState) => (state[SLICE_NAME]?.user?.profile?.profileImage ? state[SLICE_NAME]?.user?.profile?.profileImage?.url : '');

export const selectUserDesignation = (state: RootState) => (state[SLICE_NAME]?.user?.profile?.designation ? state[SLICE_NAME]?.user?.profile?.designation : '');

export const selectIsGoogleLinked = (state: RootState) => state[SLICE_NAME]?.user?.isInvalid === false && state[SLICE_NAME]?.user?.syncGmail === true;

export const selectUserProfileEmail = (state: RootState) => state[SLICE_NAME]?.user?.profile?.email;

export const selectUserProfilePhone = (state: RootState) => state[SLICE_NAME]?.user?.profile?.phone;

export const selectUserId = (state: RootState) => state[SLICE_NAME]?.user?._id;

export const selectLinkedCompanies = (state: RootState) => state[SLICE_NAME]?.user?.profile?.linkedCompanies ?? [];

export const selectHasCompanyAccess = (state: RootState) => state[SLICE_NAME]?.user?.profile?.linkedCompanies.length > 0;
// export const selectUserTeamId = (state: RootState) => state[SLICE_NAME]?.user?.teamId;
export const selectIsBusinessUser = (state: RootState) => state[SLICE_NAME]?.user?.userType === 'BUSINESS';

export default authSlice.reducer;
