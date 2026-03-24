import { expect } from '@playwright/test';
import { PageManager } from '../../pageObjects/pageManager';
import { test } from '../../test-options';


test.describe('Add to Cart', async () => {
  test('Add to Cart without Account', async ({ page, loginlink }) => {
    const pm = new PageManager(page)

    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert(process.env.ITEM!)
    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart(process.env.COLOR!,process.env.SIZE!, process.env.QUANTITY!)
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
  })
  
  test('Add to Cart with Account', async ({ page, loginlink }) => {
    const pm = new PageManager(page)

    await pm.signUpPage().fillAndSignUp(process.env.USER!, process.env.PASSWORD!)
    await pm.loginPage().loginFillandSubmit(process.env.USER!,process.env.PASSWORD!)
    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert('Checkered Shirt')
    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart(process.env.COLOR!,process.env.SIZE!, process.env.QUANTITY!)
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
  })
})




test.afterEach('teardown', async ({ page }) => {
  await page.close()
})