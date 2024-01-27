import { UserState } from '@interfaces/state.interface';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@utils/store';

const initialState: UserState = {
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  role: '',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.id = action.payload.id;
      state.firstName = action.payload.firstName;
      state.lastName = action.payload.lastName;
      state.email = action.payload.email;
      state.role = action.payload.role;
    },
    resetUser: () => initialState,
  },
});

export default userSlice.reducer;
export const { setUser, resetUser } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
