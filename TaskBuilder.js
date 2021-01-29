

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
        this.#tempMainDiv.className = "item item" + this.#addedCount;
        this.#tempMainDiv.setAttribute("id", "item" + this.#addedCount);

        document.getElementById("taskContainer").appendChild(this.#tempMainDiv);
    }

    static #createTaskNameSpan = (name) => {
		const span = document.createElement("span");
			span.setAttribute("class", "name name" + this.#addedCount);
			span.appendChild(document.createTextNode(name));

        this.#tempMainDiv.appendChild(span);
    }

    static #createDeleteBtn = () => {
        const span = document.createElement("span");
        span.setAttribute("id", "delBtn" + this.#addedCount);
        span.className = "delBtn delBtn" + this.#addedCount;
        span.appendChild(document.createTextNode("DELETE"));
        span.onclick = function() {
            const index = parseInt(this.id.substr(6));
            const name = document.getElementsByClassName("name" + index)[0].innerHTML;
            TaskManager.deleteTask(name);

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
		const span = document.createElement("span");
			span.className = "madedBtn madedBtn" + this.#addedCount;
			span.setAttribute("id", "madedBtn" + this.#addedCount);
			span.appendChild(document.createTextNode("MADED"));
			span.onclick = function() {
                const index = parseInt(this.id.substr(8));
				TaskManager.toggleMaded(index);
			}

        this.#tempMainDiv.appendChild(span);
    }

    static #createEditBtn = () => {
		const span = document.createElement("span");
			span.setAttribute("id", "editBtn" + this.#addedCount);
			span.className = "editBtn editBtn" + this.#addedCount;
			span.appendChild(document.createTextNode("EDIT"));
			span.onclick = function() {
                const index = parseInt(this.id.substr(7));
				TaskManager.editTask(index);
			}

        this.#tempMainDiv.appendChild(span);
    }

    static #createOkBtn = () => {
		const ok = document.createElement("span");
			ok.setAttribute("id", "okBtn" + this.#addedCount);
			ok.classList = "okBtn okBtn" + this.#addedCount;
			ok.appendChild(document.createTextNode("OK"));
			ok.onclick = function() {
				const x = parseInt(this.id.substr(5));
				TaskManager.confirmEditTask(x);
			}

        this.#tempMainDiv.appendChild(ok);
    }

    static #createImportant = () => {
		const ok = document.createElement("span");
			ok.setAttribute("id", "importantBtn" + this.#addedCount);
			ok.classList = "importantBtn importantBtn" + this.#addedCount;
			ok.appendChild(document.createTextNode("!! IMPORTANT TASK !!"));

        this.#tempMainDiv.appendChild(ok);
    }

}

