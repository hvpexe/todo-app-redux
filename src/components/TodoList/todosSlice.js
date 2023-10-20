import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: "todoList",
	initialState: { status: "idle", todos: [] },
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		toggleTodoStatus: (state, action) => {
			const currentTodo = state.todos.find(
				(todo) => todo.id === action.payload.id
			);
			if (currentTodo) {
				currentTodo.completed = !currentTodo.completed;
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchTodos.pending, (state, action) => {
				state.status = "loading";
			})
			.addCase(fetchTodos.fulfilled, (state, action) => {
				state.todos = action.payload;
				state.status = "idle";
			})
			.addCase(addNewTodo.fulfilled, (state, action) => {
				state.todos.push(action.payload);
			})
			.addCase(updateTodo.fulfilled, (state, action) => {
				const currentTodo = state.todos.find(
					(todo) => todo.id === action.payload.id
				);
				currentTodo.completed = !currentTodo.completed;
			})
			.addCase(deleteTodo.fulfilled, (state, action) => {
				const currentTodo = state.todos.filter(
					(todo) => todo.id !== action.payload.id
				);
				state.todos = currentTodo;
			});
	},
});

export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
	const res = await fetch(
		"https://65320c704d4c2e3f333d863c.mockapi.io/api/todos"
	);
	const data = await res.json();
	return data;
});

export const addNewTodo = createAsyncThunk(
	"todos/addNewTodo",
	async (newTodo) => {
		const res = await fetch(
			"https://65320c704d4c2e3f333d863c.mockapi.io/api/todos",
			{
				method: "POST",
				body: JSON.stringify(newTodo),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
		const data = await res.json();
		return data;
	}
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async ({ id, checked }) => {
		const res = await fetch(
			`https://65320c704d4c2e3f333d863c.mockapi.io/api/todos/${id}`,
			{
				method: "PUT",
				body: JSON.stringify({ completed: !checked }),
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
				},
			}
		);
		const data = await res.json();
		return data;
	}
);

export const deleteTodo = createAsyncThunk("todos/deleteTodo", async (id) => {
	const res = await fetch(
		`https://65320c704d4c2e3f333d863c.mockapi.io/api/todos/${id}`,
		{
			method: "DELETE",
		}
	);
	const data = await res.json();
	return data;
});

export default todosSlice;
