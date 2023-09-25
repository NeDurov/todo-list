import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface Message {
	id: number;
	text: string;
	interval: number;
}

const initialState: Array<Message> = [];

export const messagesSlice = createSlice({
	name: "listOfMessages",
	initialState,
	reducers: {
		add: (state, action: PayloadAction<Omit<Message, "id">>) => {
			const newMessage = {
				...action.payload,
				id: state.length - 1,
			};
			state.push(newMessage);
		},
		remove: (state, action: PayloadAction<{ id: number }>) => {
			return state.filter((message) => message.id !== action.payload.id);
		},
	},
});

export const { add, remove } = messagesSlice.actions;
export const selectListOfMessages = (state: RootState) => state.listOfMessages;
export default messagesSlice.reducer;
