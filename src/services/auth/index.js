import argon2 from "argon2";
import Logger from "../../base/logger";
import AuthUtilities from "../../utils/auth";
import { ApplicationError } from "../types/error/index"
import omit from "lodash/omit";
import { randomBytes } from 'crypto';
import FirestoreLib from "./../loaders/firestore";
import FireBaseUtilities from "../utils/firebase";
const firestore = new FirestoreLib();
const db = firestore.getDatabase();

const signUp = async (userInput) => {
  try {
    const { email, name, password } = userInput;
    const usersRef = db.collection("users");
    const exist = await usersRef.where("email", "==", email.trim()).get();

    if (!exist.empty) {
      Logger.error("User is existed");
      throw new ApplicationError("user_existed", {
        user: {
          email,
        },
      });
    }

    const salt = randomBytes(32);
    Logger.silly("Hashing password");
    const hashedPassword = await argon2.hash(password, { salt });
    Logger.silly("Creating user db record");


    const ref = await usersRef.add({
      email,
      name,
      salt: salt.toString("hex"),
      password: hashedPassword,
    });
    Logger.silly("Generating JWT");
  
    const snapshot = await ref.get();
  

    const user = {
      ...snapshot.data(),
      id: snapshot.id
    }
    const token = AuthUtilities.generateToken(user);

  
    return { user: {...omit(user, ["password", "salt"])}, token };
  } catch (e) {
    throw e;
  }
};

const login = async (userInput) => {
  try{
    const { email, name, password } = userInput;
    const usersRef = db.collection("users");
    const query = await usersRef.where("email", "==", email.trim()).get();

    if (query.empty) {
      throw new ApplicationError('user_not_registered', {
        user: {
          email
        }
      });
    }
    const record = FireBaseUtilities.querySnapshopToArray(query)[0];
    
    Logger.silly('Checking password');
    const validPassword = await argon2.verify(record.password, password);
    if (validPassword) {
      Logger.silly('Password is valid!');
      Logger.silly('Generating JWT');
      const token = AuthUtilities.generateToken(record);

      return { user: {...omit(record, ["password", "salt"])}, token };
    } else {
     throw new ApplicationError('invalid_password', {
        user: {
          email
        }
      });
    }
  }catch(e){
    throw e;
  }
};

const AuthService = {
  signUp,
  login,
};

export default AuthService;
