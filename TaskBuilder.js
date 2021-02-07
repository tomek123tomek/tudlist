

class TaskBuilder {

    static #tempMainDiv = null;

    static #addedCount = null;

    static createNewTaskView = (name, id) => {
        this.#addedCount = id //TaskManager.getNextId();

        this.#createMainDiv();
        this.#createTaskNameSpan(name);
        this.#createDeleteBtn();
        this.#createEditTextInput();
        this.#createMadedBtn();
        this.#createEditBtn();
        this.#createOkBtn();
        this.#createImportant();

    }

    static #createMainDiv = () => {
        this.#tempMainDiv = document.createElement("div");
        this.#tempMainDiv.className = "d-flex taskItem taskItem" + this.#addedCount;
        this.#tempMainDiv.setAttribute("id", "taskItem" + this.#addedCount);

        document.getElementById("taskContainer").appendChild(this.#tempMainDiv);
    }

    static #createTaskNameSpan = (name) => {
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
            projectsManager.getNowUsing().deleteTask(name);

        }
        this.#tempMainDiv.appendChild(span);
    }

    static #createEditTextInput = () => {
        const span = document.createElement("input");
        span.setAttribute("type", "text");
        span.setAttribute("id", "edittext" + this.#addedCount);
        span.className = "edittext";

        this.#tempMainDiv.appendChild(span);
    }

    static #createMadedBtn = () => {
		const span = document.createElement("input");
            span.setAttribute("id", "madedBtn" + this.#addedCount);
            span.setAttribute("type", "button");
            span.className = "btn btn-danger madedBtn madedBtn" + this.#addedCount;
			span.setAttribute("value", "MADED");
			span.onclick = function() {
                const index = parseInt(this.id.substr(8));
				projectsManager.getNowUsing().toggleMaded(index);
			}

        this.#tempMainDiv.appendChild(span);
    }

    static #createEditBtn = () => {
        const span = document.createElement("input");
            span.setAttribute("type", "button");
			span.setAttribute("id", "editBtn" + this.#addedCount);
			span.setAttribute("value", "EDIT");
			span.className = "btn btn-danger editBtn editBtn" + this.#addedCount;
			span.onclick = function() {
                const index = parseInt(this.id.substr(7));
				projectsManager.getNowUsing().editTask(index);
			}

        this.#tempMainDiv.appendChild(span);
    }

    static #createOkBtn = () => {
		const ok = document.createElement("span");
			ok.setAttribute("id", "okBtn" + this.#addedCount);
			ok.classList = "btn btn-danger okBtn okBtn" + this.#addedCount;
			ok.appendChild(document.createTextNode("OK"));
			ok.onclick = function() {
				const x = parseInt(this.id.substr(5));
				projectsManager.getNowUsing().confirmEditTask(x);
			}

        this.#tempMainDiv.appendChild(ok);
    }

    static #createImportant = () => {
		const ok = document.createElement("span");
			ok.setAttribute("id", "importantBtn" + this.#addedCount);
			ok.classList = "btn btn-warning importantBtn importantBtn" + this.#addedCount;
			ok.appendChild(document.createTextNode("!"));

        this.#tempMainDiv.appendChild(ok);
    }

}

