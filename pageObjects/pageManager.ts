import { Page } from "@playwright/test";
import { LoginPage } from "./loginPage";
import { SignUp } from "./signUp";
import { MyAccountPage } from "./myAccountPage";
import { NavigationMenu} from "./navigationMenu";
import { ShoppingPage } from "./shoppingPage";

export class PageManager{
    private readonly page: Page
    private readonly login: LoginPage
    private readonly signup: SignUp
    private readonly myAccount: MyAccountPage
    private readonly navMenu: NavigationMenu
    private readonly shopPage: ShoppingPage
    constructor(page: Page){
        this.page = page
        this.login = new LoginPage(this.page)
        this.signup = new SignUp(this.page)
        this.myAccount = new MyAccountPage(this.page)
        this.navMenu = new NavigationMenu(this.page)
        this.shopPage = new ShoppingPage(this.page)
    }

    loginPage(){
        return this.login
    }

    signUpPage(){
        return this.signup
    }

    myAccountPage(){
        return this.myAccount
    }

    navigationMenu(){
        return this.navMenu
    }

    shoppingPage(){
        return this.shopPage
    }
}