import { expect } from '@playwright/test';
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class LoginPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async loginFillandSubmit(userEmail: string, password: string){
        const exist = await this.isElementVisible(this.page.getByRole('link', { name: 'Login' }))

        if(exist){
            await this.page.getByRole('link', { name: 'Login' }).click()
        }
        await this.waitForNumberofSeconds(5)
        await this.page.locator("turbo-frame div form div input#user_email").nth(1).fill(userEmail);
        await this.page.locator('turbo-frame div form div input#user_password').nth(1).fill(password)
        await this.page.locator('form div [value="Login"]').click()
        await expect(this.page.locator('.p-2 p')).toHaveText('Signed in successfully.')
        await this.waitForNumberofSeconds(2)
    }
}