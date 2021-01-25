

var TaskView = (function() {

    const _getTaskValue = () => {
        const value = document.getElementById("input1").value;
        if(Validator.validateInput(value)) {
            return value;
        } else {
            alert("EMPTY");
            return false;
        }
    }

	const _findRemovedTasks = (justRemovedTask) => {
        const tasks = TaskManager.getTasks();

		const el = document.getElementsByClassName("item");

		if(tasks.length == 0) {
			document.getElementById("taskContainer").removeChild(el[0]);
			return;
		}

		for(let i = 0; i < el.length; i++) {

			const id = parseInt(el[i].id.substr(4));
			const taskName = document.getElementsByClassName("name" + id)[0].innerHTML;

			if(justRemovedTask['name'] && (justRemovedTask['name'] === taskName)) {
				document.getElementById("taskContainer").removeChild(document.getElementById("item" + id));
				return;
			}
		}

    }

    const _clearInput = () => {
        document.getElementById("input1").value = "";
    }

    const _updateView = () => {
        const tasks = TaskManager.getTasks();

        for (let i = 0; i < tasks.length; i++) {

			const element = tasks[i];
			const _id = tasks[i]['id'];
			const el = document.getElementsByClassName("item" + _id);

			if(el.length > 0) {
				const htmlName = document.getElementsByClassName("name" + _id)[0].innerHTML;

				if(element['name'] !== htmlName)
					document.getElementsByClassName("name" + _id)[0].innerHTML = element['name'];

				const editText = document.getElementById("edittext" + _id);

				if(element['editOpen']) {

					editText.classList.add("showed");
					editText.value = document.getElementsByClassName("name" + _id)[0].innerHTML;

					document.getElementsByClassName("name" + _id)[0].classList.add("hidden");
					document.getElementsByClassName("delBtn" + _id)[0].classList.add("hidden");
					document.getElementsByClassName("editBtn" + _id)[0].classList.add("hidden");
					document.getElementsByClassName("madedBtn" + _id)[0].classList.add("hidden");
					document.getElementsByClassName("okBtn" + _id)[0].classList.add("showed");

				} else {

					editText.classList.remove("showed");
					editText.value = "";

					document.getElementsByClassName("name" + _id)[0].classList.remove("hidden");
					document.getElementsByClassName("delBtn" + _id)[0].classList.remove("hidden");
					document.getElementsByClassName("editBtn" + _id)[0].classList.remove("hidden");
					document.getElementsByClassName("madedBtn" + _id)[0].classList.remove("hidden");
					document.getElementsByClassName("okBtn" + _id)[0].classList.remove("showed");
				}

				if(element['done']) {
					document.getElementsByClassName('item' + _id)[0].classList.add("maded");
				} else {
					document.getElementsByClassName('item' +_id)[0].classList.remove("maded");
                }

			} else {
                TaskBuilder.createNewTaskView(tasks[i]['name']);
            }
        }

        _clearInput();

    }

    return {
        getTaskValue: _getTaskValue,
        updateView: _updateView,
        findRemovedTasks: _findRemovedTasks
   }

})();
