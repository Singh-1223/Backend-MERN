// making our own error class...............
class AppError extends Error{
    cosntructor(message,status){
        // super();
        this.message=message;
        this.status=status;
    }
}

module.exports =AppError;