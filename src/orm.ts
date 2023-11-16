class Todo {
    constructor(public testo: string, public completato: boolean) { }
}

class TodoManager {
    lista: Todo[] = [];

    addTodo(todo: Todo) {
        this.lista.push(todo);
    }
}

let todoManager = new TodoManager();
let spesa = new Todo("Fare la spesa", false);
todoManager.addTodo(spesa);