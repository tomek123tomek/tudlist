

var TaskManager = (function() {

    var addedCount = 0;

    var tasks = [];

    var justRemoved = null;

    var nowEditing = null;

    const _addTask = (name) => {
        const val = name ? name : TaskView.getTaskValue();
        if(!val) return;
        tasks.push(new Task(val));

        TaskView.updateView();

        addedCount++;
    }


    const _deleteTask = (name) => {
        const x = tasks.findIndex(el => el.getName() === name);

        justRemoved = tasks[x];

		tasks.splice(x, 1);

		TaskView.findRemovedTasks(justRemoved);
        TaskView.updateView();
    }


    const _editTask = (index) => {
        const x = tasks.find(el => el.getId() === index);

        nowEditing = x.getId();

        TaskView.updateView();
    }


    const _confirmEditTask = (index) => {
        const x = tasks.find(el => el.getId() === index);

        x.setName(document.getElementById("edittext" + index).value);

        nowEditing = null;

        TaskView.updateView();
    }

    const _toggleMaded = (index) => {
        const x = tasks.find(el => el.getId() === index);

        x.setDone( !x.getDone() );

        TaskView.updateView();
    }

    const _getAddedCount = () => {
        return addedCount;
    }

    const _getNextId = () => {
		if(tasks.length == 0) return 0;
		const x = tasks[tasks.length - 1].getId();
		return x;
	}

    return {
        addTask: _addTask,
        editTask: _editTask,
        deleteTask: _deleteTask,
        confirmEditTask: _confirmEditTask,
        toggleMaded: _toggleMaded,
        getAddedCount: _getAddedCount,
        getNextId: _getNextId,

        getTasks() { return tasks; },
        getNowEditing() { return nowEditing; }

   }


})();
