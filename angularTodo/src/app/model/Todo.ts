import { TTodo } from "src/types";

export class Todo
{
  id: number;
  title: string = '';
  description: string = '';
  done: 0 | 1 = 0;

  constructor(id: number, title: string, description?: string)
  {
    this.id = id;
    this.title = title;

    if (description)
    {
      this.description = description;
    }
  }
}