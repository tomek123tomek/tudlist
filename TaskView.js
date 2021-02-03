

class TaskView {

    static getTaskValue = () => {
        const value = document.getElementById("taskNameInput").value;
        if(Validator.validateInput(value)) {
			const impo = document.getElementById("impo").checked;
            return [value, impo];
        } else {
            alert("EMPTY");
            return false;
        }
    }

	static findRemovedTasks = (justRemovedTask) => {
        const tasks = ProjectsManager.getTasks();

		const el = document.getElementsByClassName("taskItem");

		if(tasks.length == 0) {
			document.getElementById("taskContainer").removeChild(el[0]);
			return;
		}

		for(let i = 0; i < el.length; i++) {

			const id = parseInt(el[i].id.substr(4));
			const taskName = document.getElementsByClassName("name" + id)[0].innerHTML;

			if(justRemovedTask.getName() && (justRemovedTask.getName() === taskName)) {
				document.getElementById("taskContainer").removeChild(document.getElementById("taskItem" + id));
				return;
			}
		}
    }

    static clearInput = () => {
        document.getElementById("taskNameInput").value = "";
	}

	static deleteAllTasks = () => {
		const el = document.getElementsByClassName("taskItem");

		while(el.length > 0) {
			document.getElementById("taskContainer").removeChild(el[el.length - 1]);
		}
	}

	static removeTask = (task) => {
		const el = document.getElementsByClassName("taskItem" + task.getId())[0];
		document.getElementById("taskContainer").removeChild(el);
	}

	static hideProjectForm = () => {document.getElementById("tudlist").classList.add("hidden");}
	static showProjectForm = () => {document.getElementById("tudlist").classList.remove("hidden");}

	static showProjectNameHeader = (name) => {document.getElementById("projName").innerHTML = name;}
	static hideProjectNameHeader = () => {document.getElementById("projName").innerHTML = "";}

    static updateView = () => {
		this.deleteAllTasks();

		const project = ProjectsManager.getNowUsing();

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

