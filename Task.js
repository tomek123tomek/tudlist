
var Task = (function () {

    var numOfTasks = 0;

    function checkId(_id) {
        return TaskManager.checkIfIdIsUsed(_id);
    }

    return function (name_, important_) {

        var done = false;
        var important = important_;
        var id, name;

        this.getNumOfTask = function () {
            return numOfTasks;
        };

        this.getId = function () {
            return id;
        };

        this.setId = function (id_) {
            if (!checkId(id_)) throw new Error('Invalid Id.');
            id = id_;
        };
        this.getName = function () {
            return name;
        };

        this.setName = function (name_) {
            name = name_;
        };
        this.getDone= function () {
            return done;
        };

        this.setDone = function (done_) {
            done = done_;
        };

        this.getImportant = function () {
            return important;
        };

        this.setImportant = function (important_) {
            important = important_;
        };

        this.setId(numOfTasks);
        this.setName(name_);

        numOfTasks++;
    }
})();
