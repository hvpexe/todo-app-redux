import { Row, Tag, Checkbox, Popconfirm, Button } from "antd";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../TodoList/todosSlice";
import { DeleteFilled } from "@ant-design/icons";
const priorityColorMapping = {
	High: "red",
	Medium: "blue",
	Low: "gray",
};

export default function Todo({ id, name, prioriry, completed }) {
	const dispatch = useDispatch();

	const [checked, setChecked] = useState(completed);

	const toggleCheckbox = () => {
		setChecked(!checked);
		// dispatch(todosSlice.actions.toggleTodoStatus(id));
		dispatch(updateTodo({ id, checked }));
	};

	const handleDeleteTodo = () => {
		dispatch(deleteTodo(id));
	};
	return (
		<Row
			justify="space-between"
			style={{
				marginBottom: 3,
				flexWrap: "nowrap",
				alignItems: "start",
				...(checked ? { opacity: 0.5, textDecoration: "line-through" } : {}),
			}}
		>
			<Checkbox checked={checked} onChange={toggleCheckbox}>
				{name}
			</Checkbox>
			<div style={{ display: "flex", flexWrap: "nowrap" }}>
				<Tag color={priorityColorMapping[prioriry]} style={{ margin: 5 }}>
					{prioriry}
				</Tag>
				<Popconfirm
					title="Delete the task"
					description="Are you sure to delete this task?"
					okText="Yes"
					cancelText="No"
					onConfirm={handleDeleteTodo}
				>
					<Button danger shape="circle" icon={<DeleteFilled />}></Button>
				</Popconfirm>
			</div>
		</Row>
	);
}
