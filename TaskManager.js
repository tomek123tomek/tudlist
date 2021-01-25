

var TaskManager = (function() {

    var addedCount = 0;

    var tasks = [];

    var justRemoved = null;

    const _addTask = (name) => {
        const val = name ? name : TaskView.getTaskValue();
        if(!val) return;
		addedCount = _getNextId();
		tasks.push({'id': addedCount, 'name': val, 'done': false, 'editOpen': false});

        TaskView.updateView();

        addedCount++;
    }


    const _deleteTask = (name) => {
        const x = tasks.findIndex(el => el['name'] === name);

		justRemoved = tasks[x];

		tasks.splice(x, 1);

		TaskView.findRemovedTasks(justRemoved);
        TaskView.updateView();
    }


    const _editTask = (index) => {
        const x = tasks.find(el => el['id'] === index);

		x['editOpen'] = true;

        TaskView.updateView();
    }


    const _confirmEditTask = (index) => {
        const x = tasks.find(el => el['id'] === index);

		x['editOpen'] = false;
		x['name'] = document.getElementById("edittext" + index).value;

        TaskView.updateView();
    }

    const _toggleMaded = (index) => {
        const x = tasks.find(el => el['id'] === index);

        x['done'] = !x['done'];

        TaskView.updateView();
    }

    const _getAddedCount = () => {
        return addedCount;
    }

	const _getNextId = () => {
		if(tasks.length == 0) return 0;
		const x = tasks[tasks.length - 1]['id'];
		return (x + 1);
	}

    return {
        addTask: _addTask,
        editTask: _editTask,
        deleteTask: _deleteTask,
        confirmEditTask: _confirmEditTask,
        toggleMaded: _toggleMaded,
        getAddedCount: _getAddedCount,

        getTasks() { return tasks; }

   }


})();
