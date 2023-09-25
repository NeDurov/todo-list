import { type ChangeEvent, useState, useEffect } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { add } from "../features/messages/messagesSlice";
import { toast } from "react-toastify";

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
			setTextError("Поле не должно быть пустым");
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
			setTimeError("Введите положительное число");
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

	const sendToastError = (error: string) => {
		toast.error(error, {
			position: "bottom-right",
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined,
			theme: "dark",
		});
	};

	useEffect(() => {
		if (textError) {
			sendToastError(textError);
		}
	}, [textError]);

	useEffect(() => {
		if (timeError) {
			sendToastError(timeError);
		}
	}, [timeError]);

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
				placeholder="Текст сообщения"
				style={{ borderColor: textError ? "red" : "gray" }}
				value={textOfMessage}
				onChange={textOfMessageHandler}
				type="text"
			/>
			<input
				placeholder="Задержка в секундах"
				style={{
					marginLeft: "10px",
					borderColor: timeError ? "red" : "gray",
				}}
				value={timeOfMessage}
				onChange={timeOfMessageHandler}
				type="number"
				min={0}
			/>
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
