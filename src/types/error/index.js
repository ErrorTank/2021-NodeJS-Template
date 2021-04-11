
const CustomError = (name) => {
  return class extends Error{
    constructor(message = 'Error', extra = null){
      super(message);
      Error.captureStackTrace(this, this.constructor);
      this.name = name;
      this.extra = extra;

    }
  }
};

const AuthorizationError = CustomError("AuthorizationError")
const ApplicationError = CustomError("ApplicationError")
const OperatorError = CustomError("OperatorError")
const DBError = CustomError("DBError")
const JWTError = CustomError("JWTError")


export {
  AuthorizationError,
  ApplicationError,
  OperatorError,
  DBError,
  JWTError
};

