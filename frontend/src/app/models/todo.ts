export interface Todo {
    _id: string,
    createdAt: Date,
    todoComments: string[],
    todoDescription: string,
    todoName: string,
    todoProgress: string,
    todoType: string,
    updatedAt: Date
}