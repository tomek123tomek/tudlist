

class ProjectsManager {

    static #projects = [];

    static #addedCount = 0;

    static #nowUsing = null;

    static addProject = (name) => {
        const val = name ? name : ProjectView.getProjectValue();
        if(!val) return;
        if(this.projectAlreadyExist(val)) return;
        this.#projects.push(new Project(val, this.#addedCount));

        this.#addedCount++;

        ProjectView.updateView();
    }

    static showProject = (id) => {
        const x = this.#projects.find(el => el.getId() === id);
        this.#nowUsing = x;

        View.updateView();
    }

    static backToProjects = () => {
        this.#nowUsing = null;
        View.updateView();
    }

    static deleteProject = (name) => {
        this.#nowUsing = null;

        const x = this.#projects.findIndex(el => { console.log(el.getName()); return el.getName() === name});

        const temp = this.#projects[x];

        this.#projects.splice(x, 1);

        ProjectView.removeTask(temp);

        View.updateView();
    }

    static projectAlreadyExist = (text) => {
        const x = this.#projects.find(el => el.getName() === text);
        if(x) {
            ErrorDiv.setErrorInfo("task already exist");
            return true;
        } else {
            false;
        }
    }

    static getProjects = () =>  { return this.#projects; }
    static getNowUsing = () =>  { return this.#nowUsing; }

}

