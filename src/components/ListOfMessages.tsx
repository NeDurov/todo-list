import { selectListOfMessages } from "../features/messages/messagesSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import Message from "./Message";

const ListOfMessages = () => {
	const ListOfMessages = useAppSelector(selectListOfMessages);
	return (
		<ul>
			{ListOfMessages.map((message) => (
				<Message key={message.id} dataOfMessage={message} />
			))}
		</ul>
	);
};

export default ListOfMessages;
