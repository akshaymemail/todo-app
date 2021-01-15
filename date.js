exports.getExternalDate = function(){
    options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };return new Date().toLocaleDateString("en-IN", options)
}
exports.getExternalTime = function(){
    return new Date().toLocaleTimeString()
}