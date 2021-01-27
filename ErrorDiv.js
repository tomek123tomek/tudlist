
var ErrorDiv = (function () {

    const _setErrorInfo = (error) => {
        document.getElementById("testPlace").innerHTML = error;
    }

    return {
        setErrorInfo: _setErrorInfo,
   }

})();
