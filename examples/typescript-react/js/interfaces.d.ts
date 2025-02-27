interface ITodo {
  id: string,
  title: string,
  tags: string[],
  completed: boolean,
  todo: string
}

interface ITodoItemProps {
  key : string,
  todo : ITodo;
  editing? : boolean;
  onSave: (val: any) => void;
  onDestroy: () => void;
  onEdit: ()  => void;
  onCancel: (event : any) => void;
  onToggle: () => void;
}

interface ITodoItemState {
  editText : string
}

interface ITodoFooterProps {
  completedCount : number;
  onClearCompleted : any;
  nowShowing : string;
  count : number;
}


interface ITodoModel {
  key : any;
  todos : Array<ITodo>;
  onChanges : Array<any>;
  subscribe(onChange);
  inform();
  addTodo(title : string, tags: string[], todo: string);
  toggleAll(checked);
  toggle(todoToToggle);
  destroy(todo);
  save(todoToSave, text, tags, title);
  clearCompleted();
}

interface IAppProps {
  model : ITodoModel;
}

interface IAppState {
  editing? : string;
  nowShowing? : string;
  input? : string;
}
