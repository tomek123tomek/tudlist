

class ProjectView extends View {

	static instance;

	static getInstance = () => {

		if(this.instance) return this.instance;

		this.instance = new ProjectView();
		return this.instance;
	}

    getProjectValue = () => {
		return this.getValue("project");
    }

	deleteAllProjects = () => {
		this.deleteAll("project");
	}

	removeTask = (project) => {
		this.removeItem("project", project);
    }


	hideProjectForm = () => {document.getElementById("projectList").classList.add("hidden");}
	showProjectForm = () => {document.getElementById("projectList").classList.remove("hidden");}

	hidebackToProjects = () => {document.getElementById("backToProjects").classList.add("hidden");}
	showbackToProjects = () => {document.getElementById("backToProjects").classList.remove("hidden");}


    updateView = () => {

        this.deleteAllProjects();

        if(projectsManager.getNowUsing() == null) {
			this.showProjectForm();
			this.hidebackToProjects();

            const projects = projectsManager.getProjects();

            projects.forEach(function(item) {
                ProjectBuilder.createNewProjectView(item.getName(), item.getId());
            });

        } else {
			this.hideProjectForm();
			this.showbackToProjects();
        }

	}

}

