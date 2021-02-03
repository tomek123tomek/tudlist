

class ProjectView {

    static getProjectValue = () => {
        const value = document.getElementById("projectNameInput").value;
        if(Validator.validateInput(value)) {
            return value;
        } else {
            alert("EMPTY");
            return false;
        }
    }

	static findRemovedTasks = (justRemovedTask) => {
        const tasks = TaskManager.getTasks();

		const el = document.getElementsByClassName("item");

		if(tasks.length == 0) {
			document.getElementById("projectContainer").removeChild(el[0]);
			return;
		}

		for(let i = 0; i < el.length; i++) {

			const id = parseInt(el[i].id.substr(4));
			const taskName = document.getElementsByClassName("name" + id)[0].innerHTML;

			if(justRemovedTask.getName() && (justRemovedTask.getName() === taskName)) {
				document.getElementById("projectContainer").removeChild(document.getElementById("item" + id));
				return;
			}
		}
    }

	static deleteAllProjects = () => {
		const el = document.getElementsByClassName("item");

		while(el.length > 0) {
			document.getElementById("projectContainer").removeChild(el[el.length - 1]);
		}
	}

	static removeTask = (project) => {
		console.log(project);
		const el = document.getElementsByClassName("item" + project.getId())[0];

		document.getElementById("projectContainer").removeChild(el);
    }


	static hideProjectForm = () => {document.getElementById("projectList").classList.add("hidden");}
	static showProjectForm = () => {document.getElementById("projectList").classList.remove("hidden");}

	static hidebackToProjects = () => {document.getElementById("backToProjects").classList.add("hidden");}
	static showbackToProjects = () => {document.getElementById("backToProjects").classList.remove("hidden");}


    static updateView = () => {

        this.deleteAllProjects();

        if(ProjectsManager.getNowUsing() == null) {
			this.showProjectForm();
			this.hidebackToProjects();

            const projects = ProjectsManager.getProjects();

            projects.forEach(function(item) {
                ProjectBuilder.createNewProjectView(item.getName(), item.getId());
            });

        } else {
			this.hideProjectForm();
			this.showbackToProjects();
        }

	}

}

