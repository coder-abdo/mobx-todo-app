import { observable, action, decorate } from "mobx";
import { createContext } from "react";
import uuid from 'uuid';
export interface ITodo {
  title: string;
  id:string;
  completed: boolean;
}
interface IStore {
  todos: ITodo[];
  toggletodo: (index: number) => void;
}
class AppStore<IStore> {
  todos = [
    { title: "learn react", completed: true, id: uuid.v4() },
    { title: "learn mobx", completed: false,  id: uuid.v4() }
  ];
  fetchTodos = async () => {
    const data = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
    const todos = await data.json();
    this.todos = todos;
  }
  toggletodo = (index: number) => {
    this.todos[index].completed = !this.todos[index].completed;
  };
  addTodo = (todo:ITodo) => {
      this.todos.push(todo)
  }
  removeTodo = (id: string) => {
    this.todos = this.todos.filter(todo => todo.id !== id);
  }
}
decorate(AppStore, {
  todos: observable,
  toggletodo: action,
  addTodo: action,
  fetchTodos: action
});
 const Store = createContext(new AppStore());
 export default Store;
