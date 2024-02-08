import { Todo } from './Todo';

describe('Todo', () =>
{
    it('should create an instance', () =>
    {
        expect(new Todo(1, 'test')).toBeTruthy();
    });

    it('should accept values in the constructor', () =>
    {
        let todo = new Todo(2, 'hello')
            
        expect(todo.title).toEqual('hello');
        expect(todo.id).toEqual(2);
        expect(todo.description).toEqual('');
        expect(todo.done).toEqual(0);
    });
});