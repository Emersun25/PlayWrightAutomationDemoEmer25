import {test as base} from '@playwright/test'

export type TestOptions = {
    globalURL: string
    loginlink: string
}

export const test = base.extend<TestOptions>({
    globalURL: ['', {option: true}],
    
    loginlink: async({page}, use) => {
        await page.goto('/')
        await use('')
    }
})