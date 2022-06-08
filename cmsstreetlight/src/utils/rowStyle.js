import green from "@material-ui/core/colors/green";
import orange from "@material-ui/core/colors/orange";
import red from "@material-ui/core/colors/red";
import blue from "@material-ui/core/colors/blue";
import blueGrey from "@material-ui/core/colors/blueGrey";
import deepPurple from "@material-ui/core/colors/deepPurple";

const rowStyle =
	(selectedRow, theme) =>
	(record, index, defaultStyle = {}) => {
		let style = defaultStyle;
		if (selectedRow === record.id) {
			style = {
				...style,
				backgroundColor: theme.palette.action.selected,
			};
		}
		if (record.status === "allotted")
			return {
				...style,
				borderLeftColor: green[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(76, 175, 80, 0.10)",
			};
		if (record.status === "active")
			return {
				...style,
				borderLeftColor: orange[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(255, 152, 0, 0.10)",
			};
		if (record.status === "allocation_awaiting_payment")
			return {
				...style,
				borderLeftColor: blue[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(33, 150, 243, 0.10)",
			};
		if (
			record.status === "awaiting_payment_confirmation" ||
			record.status === "allocation_awaiting_payment_confirmation"
		)
			return {
				...style,
				borderLeftColor: deepPurple[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(103, 58, 183, 0.10)",
			};
		if (record.status === "expired")
			return {
				...style,
				borderLeftColor: blueGrey[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(96, 125, 139, 0.10)",
			};
		if (record.status === "awaiting_payment" || record.status === "")
			return {
				...style,
				borderLeftColor: red[500],
				borderLeftWidth: 5,
				borderLeftStyle: "solid",
				backgroundColor: "rgba(244, 67, 54, 0.10)",
			};

		return style;
	};

export default rowStyle;
