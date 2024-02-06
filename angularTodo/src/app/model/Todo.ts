import { TTodo } from "src/types";

export class Todo {
    id: number;
    title: string = '';
    description: string = '';
    done: 0 | 1 = 0;

    constructor(todo: TTodo) {
      console.log('here');
      
        this.id = todo.id
        this.title = todo.title
        this.description = todo.description ?? ''
      }
}