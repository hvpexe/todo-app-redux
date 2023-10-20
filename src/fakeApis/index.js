import { createServer, Model } from "miragejs";

export const setupServer = () => {
  createServer({
    models: {
      todos: Model
    },
    routes() {
      this.get('/api/todos', (schema) => {
        return schema.todos.all();
      });

      this.post('/api/todos', (schema, request) => {
        const payload = JSON.parse(request.requestBody);

        return schema.todos.create(payload);
      });

      this.post('/api/updateTodo', (schema, request) => {
        const id = JSON.parse(request.requestBody);

        const currentTodo = schema.todos.find(id);

        currentTodo.update({ completed: !currentTodo.completed});

        return currentTodo;
      })
    }
  });
};

// export const setupServer = () => {
// 	let server = createServer();
// 	server.get("/api/todos", {
// 		todo: [
// 			{ id: 1, name: "Learn yoga", completed: false, priority: "Medium" },
// 			{ id: 2, name: "Learn redux", completed: false, priority: "High" },
// 			{ id: 3, name: "Learn react", completed: false, priority: "Low" },
// 			{ id: 4, name: "Learn npm", completed: false, priority: "High" },
// 			{ id: 5, name: "Learn java", completed: false, priority: "Low" },
// 		],
// 	});
// };
