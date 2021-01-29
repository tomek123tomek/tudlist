

class TaskManager {

    static #addedCount = 0;

    static #tasks = [];

    static #justRemoved = null;

    static #nowEditing = null;

    static addTask = (name) => {
        const val = name ? name : TaskView.getTaskValue();
        if(!val) return;
        if(this.taskAlreadyExist(val[0])) return;
        this.#tasks.push(new Task(this.#addedCount, val[0], val[1]));

        TaskView.updateView();

        this.#addedCount++;
    }


    static deleteTask = (name) => {
        if(this.isSomeActionAlready()) return;

        const x = this.#tasks.findIndex(el => el.getName() === name);

        this.#justRemoved = this.#tasks[x];

        this.#tasks.splice(x, 1);

        this.#addedCount--;

        TaskView.removeTask(this.#justRemoved);
    }


    static editTask = (index) => {
        if(this.isSomeActionAlready(index)) return;
        const x = this.#tasks.find(el => el.getId() === index);

        this.#nowEditing = x.getId();

        TaskView.updateView();
    }


    static confirmEditTask = (index) => {
        if(this.isSomeActionAlready(index)) return;

        const text = document.getElementById("edittext" + index).value;

        if(this.taskAlreadyExist(text)) return;

        const x = this.#tasks.find(el => el.getId() === index);

        x.setName(text);

        this.#nowEditing = null;

        TaskView.updateView();
    }

    static toggleMaded = (index) => {
        const x = this.#tasks.find(el => el.getId() === index);

        x.setDone( !x.getDone() );

        TaskView.updateView();
    }

    static toggleImportant = (index) => {
        const x = this.#tasks.find(el => el.getId() === index);

        x.getImportant( !x.getImportant() );

        TaskView.updateView();
    }

    static getNextId = () => {
		if(this.#tasks.length == 0) return 0;
		const x = this.#tasks[this.#tasks.length - 1].getId();
		return x + 1;
    }

    static checkIfIdIsUsed = (id) => {
        const x = this.#tasks.find(el => el.getId() === id);
        return (x) ? false : true;
    }

    static isSomeActionAlready = (index) => {

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

    static taskAlreadyExist = (text) => {
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

    static isAnyImportantTask = () => {
        const x = this.#tasks.find(el => el.getImportant());
        return (x) ? true : false;
    }

    static getTasks = () =>  { return this.#tasks; }
    static getNowEditing = () =>  { return this.#nowEditing; }
    static getNumOfTasks = () =>  { return this.#addedCount; }

};

