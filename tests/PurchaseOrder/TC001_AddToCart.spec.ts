import { expect } from '@playwright/test';
import { PageManager } from '../../pageObjects/pageManager';
import { test } from '../../test-options';
import { ReportHelper } from '../../pageObjects/reporter';


test.describe('Add to Cart', async () => {
  test('Add to Cart without Account', async ({ page, loginlink }, testInfo) => {
    const pm = new PageManager(page)

    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert(process.env.ITEM!)
    await ReportHelper.attachScreenshot(page, testInfo, 'Selecting Item in Cart');

    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart(process.env.COLOR!,process.env.SIZE!, process.env.QUANTITY!)
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
    await ReportHelper.attachScreenshot(page, testInfo, 'Items in Cart');
  })
  
  test('Add to Cart with Account', async ({ page, loginlink }, testInfo) => {
    const pm = new PageManager(page)

    await pm.signUpPage().fillAndSignUp(process.env.USER!, process.env.PASSWORD!)
    await pm.loginPage().loginFillandSubmit(process.env.USER!,process.env.PASSWORD!)
    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert(process.env.ITEM!)
    await ReportHelper.attachScreenshot(page, testInfo, 'Selecting Item in Cart');

    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart(process.env.COLOR!,process.env.SIZE!, process.env.QUANTITY!)
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
    await ReportHelper.attachScreenshot(page, testInfo, 'Items in Cart');
  })


})




test.afterEach('after hook', async ({ page }, testInfo) => {
  await ReportHelper.attachOnFailure(page, testInfo);
  await page.close()
})