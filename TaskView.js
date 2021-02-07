

class TaskView extends View {

	static instance;

	static getInstance = () => {

		if(this.instance) return this.instance;

		this.instance = new TaskView();
		return this.instance;
	}

    getTaskValue = () => {
		return this.getValue("task");
    }

    clearInput = () => {
        document.getElementById("taskNameInput").value = "";
	}

	deleteAllTasks = () => {
		this.deleteAll("task");
	}

	removeTask = (task) => {
		this.removeItem("task", task);
	}

	hideProjectForm = () => {document.getElementById("tudlist").classList.add("hidden");}
	showProjectForm = () => {document.getElementById("tudlist").classList.remove("hidden");}

	showProjectNameHeader = (name) => {document.getElementById("projName").innerHTML = name;}
	hideProjectNameHeader = () => {document.getElementById("projName").innerHTML = "";}

    updateView = () => {
		this.deleteAllTasks();

		const project = projectsManager.getNowUsing();

		let newTasks = [];
		if(project != null) {

			const tasks = project.getTasks();

			this.showProjectForm();
			this.showProjectNameHeader(project.getName());

			if(project.isAnyImportantTask()) {
				let tasksIm = tasks.filter(el => el.getImportant());
				let tasksNotIm = tasks.filter(el => !el.getImportant());

				newTasks = [...tasksIm, ...tasksNotIm];
			} else {
				newTasks = tasks;
			}

            newTasks.forEach(function(item) {
                TaskBuilder.createNewTaskView(item.getName(), item.getId());
			});

        } else {
			this.hideProjectForm();
			this.hideProjectNameHeader();
			return;
        }

        for (let i = 0; i < newTasks.length; i++) {

			const element = newTasks[i];
			const _nowId = newTasks[i].getId();
			const el = document.getElementsByClassName("taskItem" + _nowId);

			if(el.length > 0) {
				const htmlName = document.getElementsByClassName("name" + _nowId)[0].innerHTML;

				if(element.getName() !== htmlName)
					document.getElementsByClassName("name" + _nowId)[0].innerHTML = element.getName();


				const editText = document.getElementById("edittext" + _nowId);

				if(project.getNowEditing() === _nowId) {

					editText.classList.add("showed");
					editText.value = document.getElementsByClassName("name" + _nowId)[0].innerHTML;

					document.getElementsByClassName("name" + _nowId)[0].classList.add("hidden");
					document.getElementsByClassName("delBtn" + _nowId)[0].classList.add("hidden");
					document.getElementsByClassName("editBtn" + _nowId)[0].classList.add("hidden");
					document.getElementsByClassName("madedBtn" + _nowId)[0].classList.add("hidden");
					document.getElementsByClassName("okBtn" + _nowId)[0].classList.add("showed");

				} else {

					editText.classList.remove("showed");
					editText.value = "";

					document.getElementsByClassName("name" + _nowId)[0].classList.remove("hidden");
					document.getElementsByClassName("delBtn" + _nowId)[0].classList.remove("hidden");
					document.getElementsByClassName("editBtn" + _nowId)[0].classList.remove("hidden");
					document.getElementsByClassName("madedBtn" + _nowId)[0].classList.remove("hidden");
					document.getElementsByClassName("okBtn" + _nowId)[0].classList.remove("showed");
				}

				if(element.getDone()) {
					document.getElementsByClassName('taskItem' + _nowId)[0].classList.add("maded");
				} else {
					document.getElementsByClassName('taskItem' +_nowId)[0].classList.remove("maded");
				}

				if(element.getImportant()) {
					document.getElementsByClassName('importantBtn' + _nowId)[0].classList.remove("hidden");
				} else {
					document.getElementsByClassName('importantBtn' +_nowId)[0].classList.add("hidden");
                }

			}
        }
	}

}

