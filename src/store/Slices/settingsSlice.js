import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: null,
    loading: false
};
const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        getUserDetailsDispatch: (state, { payload }) => {
            state.user = payload;
        },
        setSettingsLoading: (state, { payload }) => {
            state.loading = payload;
        },
    },
});

const { reducer, actions } = settingsSlice;

export const {
    getUserDetailsDispatch,
    setSettingsLoading
} = actions;
export default reducer;
