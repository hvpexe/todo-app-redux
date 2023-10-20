import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";

const todosSlice = createSlice({
	name: "todoList",
	initialState: { status: "idle", todos: [] },
	reducers: {
		addTodo: (state, action) => {
			state.push(action.payload);
		},
		toggleTodoStatus: (state, action) => {
			const currentTodo = state.todos.find((todo) => todo.id === action.payload.id);
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
				console.log("state: ", current(state), action);

				const currentTodo = state.todos.find((todo) => todo.id === action.payload.id);
				console.log("log: ", currentTodo);
				currentTodo.completed = !currentTodo.completed

			});
	},
});


export const fetchTodos = createAsyncThunk("todos/fetchTodos", async () => {
	const res = await fetch('https://65320c704d4c2e3f333d863c.mockapi.io/api/todos');
	const data = await res.json();
	console.log(data);
	return data;
});

export const addNewTodo = createAsyncThunk(
	"todos/addNewTodo",
	async (newTodo) => {
		console.log("new todo",JSON.stringify(newTodo));
		const res = await fetch('https://65320c704d4c2e3f333d863c.mockapi.io/api/todos', {
			method: "POST",
			body: JSON.stringify(newTodo),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			  },
		});
		const data = await res.json();
		return data;
	}
);

export const updateTodo = createAsyncThunk(
	"todos/updateTodo",
	async (updateTodo, checked) => {
		console.log(JSON.stringify(checked));
		const res = await fetch(`https://65320c704d4c2e3f333d863c.mockapi.io/api/todos/${updateTodo}`, {
			method: "PUT",
			body: JSON.stringify(checked),
		});
		const data = await res.json();
		return data;
	}
);

/*
 => todos/fetchTodos/pending
 => todos/fetchTodos/fullfilled
 => todos/fetchTodos/rejected
 */

export default todosSlice;

// export function addTodos(todo) { //think function - thunk action
// 	return function addTodoThunk(dispatch, getState) {
// 		todo.name = 'Test';
// 		dispatch(todosSlice.actions.addTodo(todo))
// 		console.log('after', getState());
// 	}
// }
