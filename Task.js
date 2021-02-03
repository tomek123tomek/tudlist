
class Task {

    #id;
    #name;
    #important;

    constructor(_id, _name, _important) {
        this.setId(_id);
        this.#name = _name;
        this.#important = _important;
    }

    static checkId(_id) {
        return true; //TaskManager.checkIfIdIsUsed(_id);
    }

    getId = () => {
        return this.#id;
    }

    setId = (id_) =>  {
        if (!Task.checkId(id_)) throw new Error('Invalid Id.');
        this.#id = id_;
    }

    getName = () =>  {
        return this.#name;
    }

    setName = (_name) => {
        this.#name = _name;
    }
    getDone = () =>  {
        return this.done;
    }

    setDone = (_done) =>  {
        this.done = _done;
    }

    getImportant = () =>  {
        return this.#important;
    }

    setImportant = (_important) => {
        this.#important = _important;
    }

}

