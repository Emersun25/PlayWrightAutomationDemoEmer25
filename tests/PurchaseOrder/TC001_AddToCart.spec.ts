import { expect } from '@playwright/test';
import { PageManager } from '../../pageObjects/pageManager';
import { test } from '../../test-options';


test.describe('Add to Cart', async () => {
  test('Add to Cart with Account', async ({ page, loginlink }) => {
    const pm = new PageManager(page)

    await pm.signUpPage().fillAndSignUp('testg04@test', 'autotest')
    await pm.loginPage().loginFillandSubmit('testg04@test','autotest')
    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert('Checkered Shirt')
    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart('teal','S', '2')
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
  })

  test('Add to Cart without Account', async ({ page, loginlink }) => {
    const pm = new PageManager(page)

    await pm.navigationMenu().shopAll()
    await pm.shoppingPage().selectItemAndAssert('Checkered Shirt')
    const itemDescriptionList: string[] = await pm.shoppingPage().addtoCart('teal','S', '2')
    const itemDescriptioninCart: string[] = await pm.shoppingPage().verifyCart()
    await expect(itemDescriptionList).toEqual(itemDescriptioninCart)
  })
})



test.afterEach('reload', async ({ page }) => {
  await page.close()
})