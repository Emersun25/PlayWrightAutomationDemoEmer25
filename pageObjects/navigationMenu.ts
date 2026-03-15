import { expect } from '@playwright/test';
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class NavigationMenu extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async shopAll(){
        await this.page.locator('div .header--nav-item.group [data-title="shop all"]').click()
    }

    async fashion(){
        await this.page.locator('div .header--nav-item.group [data-title="fashion"]').click()
    }

    async wellness(){
        await this.page.locator('div .header--nav-item.group [data-title="wellness"]').click()
    }
}