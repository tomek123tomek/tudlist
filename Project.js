

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

    addTask = (name, important) => {
        const val = name ? name : TaskView.getInstance().getTaskValue();
        if(!val) return;
        if(this.taskAlreadyExist(val)) return;

        let important_ = (important) ?
            ((important) ? true : false)
        :
            (document.getElementById("impo").checked ? true : false)


        this.#tasks.push(new Task(this.#addedCount, val, important_));

        TaskView.getInstance().updateView();

        this.#addedCount++;
    }

    deleteTask = (name) => {
        if(this.isSomeActionAlready()) return;

        const x = this.#tasks.findIndex(el => el.getName() === name);

        this.#justRemoved = this.#tasks[x];

        this.#tasks.splice(x, 1);

        TaskView.getInstance().removeTask(this.#justRemoved);
    }


    editTask = (index) => {
        if(this.isSomeActionAlready(index)) return;
        const x = this.#tasks.find(el => el.getId() === index);

        this.#nowEditing = x.getId();

        TaskView.getInstance().updateView();
    }


    confirmEditTask = (index) => {
        if(this.isSomeActionAlready(index)) return;

        const text = document.getElementById("edittext" + index).value;
        if(this.taskAlreadyExist(text)) return;

        const x = this.#tasks.find(el => el.getId() === index);

        x.setName(text);

        this.#nowEditing = null;

        TaskView.getInstance().updateView();
    }

    toggleMaded = (index) => {
        const x = this.#tasks.find(el => el.getId() === index);

        x.setDone( !x.getDone() );

        TaskView.getInstance().updateView();
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

    getNowEditing = () => this.#nowEditing;

    getNumOfTasks = () => this.#addedCount;

    getTasks = () => this.#tasks;

    getName = () => this.#name;

    getId = () => this.#id;

};

