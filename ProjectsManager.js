

class ProjectsManager {

    #projects;

    #addedCount;

    #nowUsing;

    constructor() {
        this.#projects = [];
        this.#nowUsing = null;
        this.#addedCount = 0;
    }

    addProject = (name) => {
        const val = name ? name : ProjectView.getInstance().getProjectValue();
        if(!val) return;
        if(this.projectAlreadyExist(val)) return;
        this.#projects.push(new Project(val, this.#addedCount));

        this.#addedCount++;

        ProjectView.getInstance().updateView();
    }

    showProject = (id) => {
        const x = this.#projects.find(el => el.getId() === id);
        this.#nowUsing = x;

        View.updateView();
    }

    backToProjects = () => {
        this.#nowUsing = null;
        View.updateView();
    }

    deleteProject = (name) => {
        this.#nowUsing = null;

        const x = this.#projects.findIndex(el => { console.log(el.getName()); return el.getName() === name});

        const temp = this.#projects[x];

        this.#projects.splice(x, 1);

        ProjectView.getInstance().removeTask(temp);

        View.updateView();
    }

    projectAlreadyExist = (text) => {
        const x = this.#projects.find(el => el.getName() === text);
        if(x) {
            ErrorDiv.setErrorInfo("task already exist");
            return true;
        } else {
            false;
        }
    }

    getProjects = () => this.#projects;
    getNowUsing = () => this.#nowUsing;

}

