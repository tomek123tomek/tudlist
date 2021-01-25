

var Validator = (function() {

    const _validateInput = (input) => {
        return (input !== '') ? true : false;
    }

    return {
        validateInput: _validateInput,
   }

})();
