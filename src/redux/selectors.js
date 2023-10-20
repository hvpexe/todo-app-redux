import { createSelector } from "@reduxjs/toolkit"

export const searchTextSelector = (state) => state.filters.search;
export const todoListSelector = (state) => state.todoList.todos;
export const filterStatusSelector = (state) => state.filters.status;
export const filterPrioritiesSelector = (state) => state.filters.priorities;

export const todoRemainingSelector = createSelector(
	todoListSelector,
	filterStatusSelector,
	filterPrioritiesSelector,
	searchTextSelector,
	(todoList, status, priorities, searchText) => {
		return todoList.filter((todo) => {
			if (status === "All") {
				return priorities.length
					? todo.name.includes(searchText) && priorities.includes(todo.priority)
					: todo.name.includes(searchText);
			}
			return (
				todo.name.toLowerCase().includes(searchText.toLowerCase()) &&
				(status === "Completed" ? todo.completed : !todo.completed) &&
				(priorities.length ? priorities.includes(todo.priority) : true)
			);
		});
	}
);
