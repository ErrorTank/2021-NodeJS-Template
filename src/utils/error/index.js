import { Errors } from "./errors";

const CustomError = (config, data = null) => {
  const { id, code, message = "" } = config;
  return class extends Error {
    constructor() {
      super(id);
      Error.captureStackTrace(this, this.constructor);
      this.isCustom = true;
      this.name = id;
      this.status = code;
      this.data = data;
      this.message = message;
    }
  };
};

const AppError = (config = {}) => {
  const { id, data } = config;
  const errorConfig = Errors[id] || Errors.DEFAULT_ERROR;

  return new CustomError(errorConfig, data);
};

export default AppError;
