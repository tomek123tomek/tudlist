
var Task = (function () {

    var numOfTasks = 0;

    function checkId(_id) {
        // check if id is already used
        return true;
    }

    return function (name_) {

        var done = false;
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

        this.setId(numOfTasks);
        this.setName(name_);

        numOfTasks++;
    }
})();
