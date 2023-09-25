import { useEffect, useState } from "react";
import type { Message as MessageType } from "../features/messages/messagesSlice";
import { Play, Pause, Trash } from "lucide-react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { remove } from "../features/messages/messagesSlice";
import { toast } from "react-toastify";

const Message = ({ dataOfMessage }: { dataOfMessage: MessageType }) => {
	const dispatch = useAppDispatch();
	const [isPLay, setPlay] = useState(false);
	const [isHovered, setIsHovered] = useState(false);

	const playHandle = () => {
		setPlay(!isPLay);
	};

	const removeButtonhanler = () => {
		dispatch(remove({ id: dataOfMessage.id }));
	};

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

	useEffect(() => {
		if (isPLay) {
			const ms = dataOfMessage.interval * 1000;
			const text = dataOfMessage.text;
			const intervalId = setInterval(
				() =>
					toast(text, {
						position: "bottom-right",
						autoClose: 5000,
						hideProgressBar: false,
						closeOnClick: true,
						pauseOnHover: true,
						draggable: true,
						progress: undefined,
						theme: "dark",
					}),
				ms
			);
			return () => clearInterval(intervalId);
		}
	}, [isPLay]);

	return (
		<li>
			<span style={{ userSelect: "none" }}>
				<b>Сообщение: </b>
				{dataOfMessage.text} <b>Интервал: </b>
				{dataOfMessage.interval} сек.
			</span>
			<span style={{ verticalAlign: "middle" }}>
				{isPLay ? (
					<Pause size={21} color="yellow" onClick={playHandle} />
				) : (
					<Play size={21} color="green" onClick={playHandle} />
				)}
				<Trash
					className="trash"
					onClick={removeButtonhanler}
					color={isHovered ? "red" : "black"}
					size={21}
					onMouseEnter={handleMouseEnter}
					onMouseLeave={handleMouseLeave}
				/>
			</span>
		</li>
	);
};

export default Message;
