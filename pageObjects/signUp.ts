import { expect } from '@playwright/test';
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class SignUp extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async fillAndSignUp(userEmail: string, password: string){
        await this.page.locator('[aria-label="Open account panel"]').click()
        await this.waitForNumberofSeconds(2)
        await this.page.getByRole('link', { name: 'Sign Up' }).click()
        await this.waitForNumberofSeconds(5)
        await this.page.getByRole('textbox', { name: 'Email' }).fill(userEmail)
        await this.page.locator('#user_password').fill(password)
        await this.page.locator('#user_password_confirmation').fill(password)
        await this.page.locator('[value="Sign Up"]').click()
        await this.waitForNumberofSeconds(3)
        const exist = await this.isTextEquals(this.page.locator('#errorExplanation li'), 'Email has already been taken')

        if(!exist){
            await this.waitUntilElementVisible(this.page.locator('.p-2 p').first())
            await expect(this.page.locator('.p-2 p').first()).toHaveText('Welcome! You have signed up successfully.')
            await this.waitForNumberofSeconds(2)
        }
        else{
            await this.page.getByRole('link', { name: 'Login' }).click()
        }
        
        
    }
}