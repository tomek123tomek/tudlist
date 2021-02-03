

class Project {

    #addedCount = 0;

    #id;

    #name;

    #tasks = [];

    #justRemoved = null;

    #nowEditing = null;

    constructor(_name, _id) {
        this.#name = _name;
        this.#id = _id;
        this.#addedCount++;
    }

    addTask = (name) => {

        const val = name ? name : TaskView.getTaskValue();
        if(!val) return;
        if(this.taskAlreadyExist(val[0])) return;
        this.#tasks.push(new Task(this.#addedCount, val[0], val[1]));

        TaskView.updateView();

        this.#addedCount++;
    }

    deleteTask = (name) => {
        if(this.isSomeActionAlready()) return;

        const x = this.#tasks.findIndex(el => el.getName() === name);

        this.#justRemoved = this.#tasks[x];

        this.#tasks.splice(x, 1);

        TaskView.removeTask(this.#justRemoved);
    }


    editTask = (index) => {
        if(this.isSomeActionAlready(index)) return;
        const x = this.#tasks.find(el => el.getId() === index);

        this.#nowEditing = x.getId();

        TaskView.updateView();
    }


    confirmEditTask = (index) => {
        if(this.isSomeActionAlready(index)) return;

        const text = document.getElementById("edittext" + index).value;

        const x = this.#tasks.find(el => el.getId() === index);

        x.setName(text);

        this.#nowEditing = null;

        TaskView.updateView();
    }

    toggleMaded = (index) => {
        const x = this.#tasks.find(el => el.getId() === index);

        x.setDone( !x.getDone() );

        TaskView.updateView();
    }

    taskAlreadyExist = (text) => {
        const x = this.#tasks.find(el => el.getName() === text);

        if(x) {
            if(this.#nowEditing == x.getId()) {
                return false;
            } else {
                ErrorDiv.setErrorInfo("task already exist");
                return true;
            }
        } else {
            false;
        }
    }

    isSomeActionAlready = (index) => {

        if(typeof(this.#nowEditing) == 'number') {
            if(index !== this.#nowEditing) {
                ErrorDiv.setErrorInfo("already editing task index: " + this.#nowEditing);
                return true;
            } else {
                const text = document.getElementById("edittext" + index).value;
                if(text == "") {
                    ErrorDiv.setErrorInfo("Task cannot be empty");
                    return true;
                } else {
                    return false;
                }
            }
        } else {
            return false;
        }
    }

    isAnyImportantTask = () => {
        const x = this.#tasks.find(el => el.getImportant());
        return (x) ? true : false;
    }

    getNowEditing = () =>  { return this.#nowEditing; }

    getNumOfTasks = () =>  { return this.#addedCount; }

    getTasks = () =>  { return this.#tasks; }

    getName = () => { return this.#name; }

    getId = () => { return this.#id; }

};

