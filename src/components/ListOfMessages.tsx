import { selectListOfMessages } from "../features/messages/messagesSlice";
import { useAppSelector } from "../hooks/useAppSelector";
import Message from "./Message";

const ListOfMessages = () => {
	const ListOfMessages = useAppSelector(selectListOfMessages);
	return (
		<ol>
			{ListOfMessages.map((message) => (
				<Message key={message.id} dataOfMessage={message} />
			))}
		</ol>
	);
};

export default ListOfMessages;
