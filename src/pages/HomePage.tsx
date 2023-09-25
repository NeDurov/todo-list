import AddMessage from "../components/AddMessage";
import ListOfMessages from "../components/ListOfMessages";

const HomePage = () => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
			}}
		>
			<AddMessage />
			<ListOfMessages />
		</div>
	);
};

export default HomePage;
