import { type ChangeEvent, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { add } from "../features/messages/messagesSlice";

const AddMessage = () => {
	const dispatch = useAppDispatch();
	const [textOfMessage, setTextOfMessage] = useState("");
	const [timeOfMessage, setTimeOfMessage] = useState("");
	const [textError, setTextError] = useState("");
	const [timeError, setTimeError] = useState("");

	const textOfMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setTextOfMessage(value);
		if (value.trim() === "") {
			setTextError("Text is required");
		} else {
			setTextError("");
		}
	};

	const timeOfMessageHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const {
			target: { value },
		} = e;
		setTimeOfMessage(value);
		if (value === "" || Number(value) <= 0) {
			setTimeError("Time must be a positive number");
		} else {
			setTimeError("");
		}
	};

	const clearInputs = () => {
		setTextOfMessage("");
		setTimeOfMessage("");
	};

	const addButtonHandler = () => {
		dispatch(add({ text: textOfMessage, interval: Number(timeOfMessage) }));
		clearInputs();
	};

	return (
		<div
			style={{
				marginLeft: "5%",
				marginTop: "25%",
				display: "flex",
				alignItems: "center",
			}}
		>
			<input
				style={{ borderColor: textError ? "red" : "gray" }}
				value={textOfMessage}
				onChange={textOfMessageHandler}
				type="text"
			/>
			{textError && <p style={{ color: "red" }}>{textError}</p>}
			<input
				style={{
					marginLeft: "10px",
					borderColor: timeError ? "red" : "gray",
				}}
				value={timeOfMessage}
				onChange={timeOfMessageHandler}
				type="number"
				min={0}
			/>
			{timeError && <p style={{ color: "red" }}>{timeError}</p>}
			<button
				style={{ marginLeft: "10px" }}
				disabled={Boolean(
					textError || timeError || !textOfMessage || !timeOfMessage
				)}
				onClick={addButtonHandler}
			>
				Создать
			</button>
		</div>
	);
};

export default AddMessage;
