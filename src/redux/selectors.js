import { createSelector } from "@reduxjs/toolkit";

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
		const searchTextLC = searchText.toLowerCase();
		return todoList.filter((todo) => {
			const todoNameLC = todo.name.toLowerCase();
			if (status === "All") {
				return priorities.length
					? todoNameLC.includes(searchTextLC) &&
							priorities.includes(todo.priority)
					: todoNameLC.includes(searchTextLC);
			}
			return (
				todoNameLC.includes(searchTextLC) &&
				(status === "Completed" ? todo.completed : !todo.completed) &&
				(priorities.length ? priorities.includes(todo.priority) : true)
			);
		});
	}
);
