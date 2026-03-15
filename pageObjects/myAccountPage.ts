import { expect } from '@playwright/test';
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class MyAccountPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async logOut(){
        await this.page.locator('[aria-label="Open account panel"]').click()
        await this.page.getByRole('button', { name: 'Log out' }).click()
    }

    async orders(){
        await this.page.locator('[aria-label="Open account panel"]').click()
        await this.page.getByRole('link', { name: 'Orders & Returns' }).click()
    }

    async addresses(){
        await this.page.locator('[aria-label="Open account panel"]').click()
        await this.page.getByRole('link', { name: 'Addresses' }).click()
    }
}