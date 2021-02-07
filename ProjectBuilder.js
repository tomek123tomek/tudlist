

class ProjectBuilder {

    static #tempMainDiv = null;

    static #addedCount = null;

    static createNewProjectView = (name, id) => {
        this.#addedCount = id;
        this.#createMainDiv();
        this.#createProjectNameSpan(name);
        this.#createDeleteBtn();
        this.#createShowTasksBtn();

    }

    static #createMainDiv = () => {
        this.#tempMainDiv = document.createElement("div");
        this.#tempMainDiv.className = "d-flex item item" + this.#addedCount;
        this.#tempMainDiv.setAttribute("id", "item" + this.#addedCount);

        document.getElementById("projectContainer").appendChild(this.#tempMainDiv);
    }

    static #createProjectNameSpan = (name) => {
		const span = document.createElement("span");
			span.setAttribute("class", "form-control name name" + this.#addedCount);
			span.appendChild(document.createTextNode(name));

        this.#tempMainDiv.appendChild(span);
    }

    static #createDeleteBtn = () => {
        const span = document.createElement("input");
        span.setAttribute("type", "button");
        span.setAttribute("id", "delBtn" + this.#addedCount);
        span.setAttribute("value", "DELETE");
        span.className = "btn btn-danger delBtn delBtn" + this.#addedCount;
        span.onclick = function() {
            const index = parseInt(this.id.substr(6));
            const name = document.getElementsByClassName("name" + index)[0].innerHTML;
            projectsManager.deleteProject(name);

        }
        this.#tempMainDiv.appendChild(span);
    }

    static #createShowTasksBtn = () => {
		const span = document.createElement("input");
			span.className = "showTasksBtn showTasksBtn" + this.#addedCount;
            span.setAttribute("id", "showTasksBtn" + this.#addedCount);
            span.setAttribute("type", "button");
            span.setAttribute("value", "SHOW TASKS");
            span.className = "btn btn-success showBtn showBtn" + this.#addedCount;
			span.onclick = function() {
                const index = parseInt(this.id.substr(12));
				projectsManager.showProject(index);
			}

        this.#tempMainDiv.appendChild(span);
    }

}

