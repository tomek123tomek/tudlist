

var TaskManager = (function() {

    var addedCount = 0;

    var tasks = [];

    var justRemoved = null;

    var nowEditing = null;

    const _addTask = (name) => {
        const val = name ? name : TaskView.getTaskValue();
        if(!val) return;
        if(_taskAlreadyExist(val[0])) return;
        tasks.push(new Task(val[0], val[1]));

        TaskView.updateView();

        addedCount++;
    }


    const _deleteTask = (name) => {
        if(_isSomeActionAlready()) return;

        const x = tasks.findIndex(el => el.getName() === name);

        justRemoved = tasks[x];

		tasks.splice(x, 1);

		TaskView.findRemovedTasks(justRemoved);
        TaskView.updateView();
    }


    const _editTask = (index) => {
        if(_isSomeActionAlready(index)) return;
        const x = tasks.find(el => el.getId() === index);

        nowEditing = x.getId();

        TaskView.updateView();
    }


    const _confirmEditTask = (index) => {
        if(_isSomeActionAlready(index)) return;

        const text = document.getElementById("edittext" + index).value;

        if(_taskAlreadyExist(text)) return;

        const x = tasks.find(el => el.getId() === index);

        x.setName(text);

        nowEditing = null;

        TaskView.updateView();
    }

    const _toggleMaded = (index) => {
        const x = tasks.find(el => el.getId() === index);

        x.setDone( !x.getDone() );

        TaskView.updateView();
    }

    const _toggleImportant = (index) => {
        const x = tasks.find(el => el.getId() === index);

        x.getImportant( !x.getImportant() );

        TaskView.updateView();
    }

    const _getAddedCount = () => {
        return addedCount;
    }

    const _getNextId = () => {
		if(tasks.length == 0) return 0;
		const x = tasks[tasks.length - 1].getId();
		return x + 1;
    }

    const _checkIfIdIsUsed = (id) => {
        const x = tasks.find(el => el.getId() === id);
        return (x) ? false : true;
    }

    const _isSomeActionAlready = (index) => {

        if(typeof(nowEditing) == 'number') {
            if(index !== nowEditing) {
                ErrorDiv.setErrorInfo("already editing task index: " + nowEditing);
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

    const _taskAlreadyExist = (text) => {
        const x = tasks.find(el => el.getName() === text);

        if(x) {
            if(nowEditing == x.getId()) {
                return false;
            } else {
                ErrorDiv.setErrorInfo("task already exist");
                return true;
            }
        } else {
            false;
        }
    }

    const _isAnyImportantTask = () => {
        const x = tasks.find(el => el.getImportant());
        return (x) ? true : false;
    }


    return {
        addTask: _addTask,
        editTask: _editTask,
        deleteTask: _deleteTask,
        confirmEditTask: _confirmEditTask,
        toggleMaded: _toggleMaded,
        getAddedCount: _getAddedCount,
        getNextId: _getNextId,
        checkIfIdIsUsed: _checkIfIdIsUsed,
        toggleImportant: _toggleImportant,
        isAnyImportantTask: _isAnyImportantTask,

        getTasks() { return tasks; },
        getNowEditing() { return nowEditing; }

   }


})();
