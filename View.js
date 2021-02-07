

class View {

    getValue = (type) => {
        const value = document.getElementById(type + "NameInput").value;
        if(Validator.validateInput(value)) {
            return value;
        } else {
            alert("EMPTY");
            return false;
        }
    }

	deleteAll = (type) => {
        const className = type === "task" ? "taskItem" : "item";
		const el = document.getElementsByClassName(className);

		while(el.length > 0) {
			document.getElementById(type + "Container").removeChild(el[el.length - 1]);
		}
	}

	removeItem = (type, item) => {
        const className = type === "task" ? "taskItem" : "item";

		const el = document.getElementsByClassName(className + "" + item.getId())[0];

		document.getElementById(type + "Container").removeChild(el);
    }


    static updateView = () => {

        ProjectView.getInstance().updateView();

        TaskView.getInstance().clearInput();

        TaskView.getInstance().updateView();


	}

}

