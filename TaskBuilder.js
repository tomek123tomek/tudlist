

var TaskBuilder = (function() {

    var tempMainDiv = null;

    var addedCount = null;

    const _createNewTaskView = (name) => {
        addedCount = TaskManager.getAddedCount();

        _createMainDiv();
        _createTaskNameSpan(name);
        _createDeleteBtn();
        _createEditTextInput();
        _createMadedBtn();
        _createEditBtn();
        _createOkBtn();

    }

    const _createMainDiv = () => {
        tempMainDiv = document.createElement("div");
        tempMainDiv.className = "item item" + addedCount;
        tempMainDiv.setAttribute("id", "item" + addedCount);

        document.getElementById("taskContainer").appendChild(tempMainDiv);
    }

    const _createTaskNameSpan = (name) => {
		const span = document.createElement("span");
			span.setAttribute("class", "name name" + addedCount);
			span.appendChild(document.createTextNode(name));

        tempMainDiv.appendChild(span);
    }

    const _createDeleteBtn = () => {
        const span = document.createElement("span");
        span.setAttribute("id", "delBtn" + addedCount);
        span.className = "delBtn delBtn" + addedCount;
        span.appendChild(document.createTextNode("DELETE"));
        span.onclick = function() {
            const index = parseInt(this.id.substr(6));
            const name = document.getElementsByClassName("name" + index)[0].innerHTML;
            TaskManager.deleteTask(name);

        }
        tempMainDiv.appendChild(span);
    }

    const _createEditTextInput = () => {
        const span = document.createElement("input");
        span.setAttribute("type", "text");
        span.setAttribute("id", "edittext" + addedCount);
        span.className = "edittext";

        tempMainDiv.appendChild(span);
    }

    const _createMadedBtn = () => {
		const span = document.createElement("span");
			span.className = "madedBtn madedBtn" + addedCount;
			span.setAttribute("id", "madedBtn" + addedCount);
			span.appendChild(document.createTextNode("MADED"));
			span.onclick = function() {
                const index = parseInt(this.id.substr(8));
				TaskManager.toggleMaded(index);
			}

        tempMainDiv.appendChild(span);
    }

    const _createEditBtn = () => {
		const span = document.createElement("span");
			span.setAttribute("id", "editBtn" + addedCount);
			span.className = "editBtn editBtn" + addedCount;
			span.appendChild(document.createTextNode("EDIT"));
			span.onclick = function() {
                const index = parseInt(this.id.substr(7));
				TaskManager.editTask(index);
			}

        tempMainDiv.appendChild(span);
    }

    const _createOkBtn = () => {
		const ok = document.createElement("span");
			ok.setAttribute("id", "okBtn" + addedCount);
			ok.classList = "okBtn okBtn" + addedCount;
			ok.appendChild(document.createTextNode("OK"));
			ok.onclick = function() {
				const x = parseInt(this.id.substr(5));
				TaskManager.confirmEditTask(x);
			}

        tempMainDiv.appendChild(ok);
    }

    return {
        createNewTaskView: _createNewTaskView,
   }

})();
