import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, User } from "../../app/state";

const userSlice = createSlice({
	name: "user",
	initialState: {
		id: "",
		profile: null,
	},
	reducers: {
		setUser: (user, action: PayloadAction<User>) => {
			user.id = action.payload.id;
			user.profile = action.payload.profile;
		},
	},
});

export const { setUser } = userSlice.actions;
export const selectIsProfileLogin = (state: State) =>
	state.user?.profile ? Object.keys(state.user?.profile).length !== 0 : false;
export const selectUserId = (state: State) => state.user?.id;
export const selectUserEmail = (state: State) => state.user?.profile?.email;

export default userSlice.reducer;
