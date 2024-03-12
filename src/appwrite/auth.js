import { Account, Client, ID } from "appwrite";
import conf from "../conf/conf.js";
import { useActionData } from "react-router-dom";


// On later time if we wish to change the BAAS(Backend as a service) option, we will only need to change the body of the constructor and other methods defined within the class
class AuthService {

    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);

        this.account = new Account(this.client);
    }

    // method to create user(sign UP)
    async createAccount({ email, password, name }) {
        try {


            const userAccount = await this.account.create(ID.unique(), email, password, name);
            console.log("User Created : ", userAccount)
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (e) {
            console.log("Unable to create account z.😢 " + e)
            throw e;
        }
    }

    // method to logout
    async login({ email, password }) {
        try {
            // handle the other option in front end
            return await this.account.createEmailSession(email, password);
        } catch (e) {
            throw e;
        }

    }


    async logout() {
        try {
            return await this.account.deleteSessions();
        } catch (e) {
            console.log(e);
        }
    }


    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.log(" 😢 Appwrite service :: getCurrentUSer :: error ", error)
        }

        // if user does not exist
        return null;
    }
}

const authService = new AuthService();

export default authService