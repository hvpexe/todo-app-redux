import { Col, Row, Input, Button, Select, Tag } from "antd";
import Todo from "../Todo";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { todoRemainingSelector } from "../../redux/selectors";
import { addNewTodo } from "./todosSlice";

export default function TodoList() {
	const [todoName, setTodoName] = useState();
	const [priority, setPriority] = useState("Medium");

	const todoList = useSelector(todoRemainingSelector);
	// const searchText = useSelector(searchTextSelector);
	const dispatch = useDispatch();

	const handleAddButtonClick = () => {
		// dispatch(
		// 	todosSlice.actions.addTodo({
		// 		id: uuidv4(),
		// 		name: todoName,
		// 		priority: priority,
		// 		completed: false,
		// 	})
		// );

		dispatch(
			addNewTodo({
				id: uuidv4(),
				name: todoName,
				priority: priority,
				completed: false,
			})
		);

		setTodoName("");
		setPriority("Medium");
	};

	const handleInputChange = (e) => {
		setTodoName(e.target.value);
	};

	const handlePriorityChange = (value) => {
		setPriority(value);
	};

	return (
		<>
			<Row style={{ height: "100%", width: "100%", overflow: "auto" }}>
				<Col span={50} style={{ width: "100%", overflowY: "auto"}}>
					{todoList.map((todo) => (
						<Todo
							key={todo.id}
							id={todo.id}
							name={todo.name}
							prioriry={todo.priority}
							completed={todo.completed}
						/>
					))}
				</Col>
			</Row>

			<Col style={{ marginBottom: "1rem", width: "100%", marginTop: "1rem" }}>
				<Input.Group style={{ display: "flex" }} compact>
					<Input value={todoName} onChange={handleInputChange} />
					<Select
						defaultValue="Medium"
						value={priority}
						onChange={handlePriorityChange}
					>
						<Select.Option value="High" label="High">
							<Tag color="red">High</Tag>
						</Select.Option>
						<Select.Option value="Medium" label="Medium">
							<Tag color="blue">Medium</Tag>
						</Select.Option>
						<Select.Option value="Low" label="Low">
							<Tag color="gray">Low</Tag>
						</Select.Option>
					</Select>
					<Button type="primary" onClick={handleAddButtonClick}>
						Add
					</Button>
				</Input.Group>
			</Col>
		</>
	);
}
