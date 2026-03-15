import { expect } from '@playwright/test';
import { Page } from "@playwright/test";
import { HelperBase } from "./helperBase";


export class ShoppingPage extends HelperBase{
    constructor(page: Page){
        super(page)
    }

    async selectItemAndAssert(itemName: string){
        await this.scrollToPageEnd()   
        const allItem = '//turbo-frame/div[2]/div/div/div/div/a/div[2]/h3'
        for(let i = 1; i < allItem.length; i++){
            let item = `//turbo-frame/div[2]/div/div/div[${i}]/div/a/div[2]/h3`
            let itemlink = `//turbo-frame/div[2]/div/div/div[${i}]/div/a`
            let regularPricePath = `//turbo-frame/div[2]/div/div/div[${i}]/div/a/div[2]/div/div/div/div/p[1]`

            let regularPrice = await this.getElementText(this.page.locator(regularPricePath))
            //let salePrice = await this.getElementText(this.page.locator(salePricePath))
            
            let getItemName = await this.page.locator(item).innerText()

            if(itemName === getItemName.trim()){
                await this.page.locator(itemlink).click()
                await expect(this.page.locator('div.block-title h1')).toHaveText(getItemName, { ignoreCase: true })
                await expect(this.page.locator('div.block-price p').first()).toHaveText(regularPrice)

                break;
      
            }
        }      
    }

    async addtoCart(color: string, itemSize: string, quantity: string): Promise<string[]>{
        const itemDescriptionList: string[] = []
        const colorLocator = `[value="${color}"]`
        const sizetext = `[aria-label="Size:${itemSize}"] span`

        await this.clickViaJS(this.page.locator(colorLocator).first())
        await this.page.locator('div button[aria-label="Please choose Size"]').click()
        await this.waitUntilElementVisible(this.page.locator('[data-dropdown-target="menu"]'))

        if(itemSize === 'S'){
            await this.clickViaJS(this.page.locator('input[aria-label="S"]').first())
        }
        else if(itemSize === 'M'){
            await this.waitUntilVisibleAndClick(this.page.locator('div input[aria-label="M"]').first())
        }
        else if(itemSize === 'L'){
            await this.waitUntilVisibleAndClick(this.page.locator('div input[aria-label="L"]').first())
        }
        else{
            console.error("No item size found");
        }
        await this.waitForNumberofSeconds(5);
        await this.clearAndfillText(this.page.locator('input#quantity'), quantity)

        const itemNametext = await this.getElementText(this.page.locator('div.block-title h1'))
        const itemPricetext = await this.getElementText(this.page.locator('div.block-price p'))
        const itemVarianttext = await this.getElementText(this.page.locator('div.block-variant-picker span').first())
        const itemSizetext = await this.getElementText(this.page.locator(sizetext))

        itemDescriptionList.push(itemNametext)
        itemDescriptionList.push(itemPricetext)
        itemDescriptionList.push(itemVarianttext.split(':')[1].trim())
        itemDescriptionList.push(itemSizetext)
        itemDescriptionList.push(quantity)

        await this.waitUntilVisibleAndClick(this.page.locator('button.btn-primary.btn-icon.w-full.h-12.add-to-cart-button').first())
        
        return itemDescriptionList;
    }

    async verifyCart(): Promise<string[]>{
        const itemCartDescriptionList: string[] = []
        const itemNametext = await this.getElementText(this.page.locator('div#cart-container div.flex.justify-between a'))
        const itemPricetext = await this.getElementText(this.page.locator('div#cart-container div.mb-2.text-sm span').first())
        const itemVarianttext = await this.getElementText(this.page.locator('div.text-sm.px-2').first())
        const itemSizetext = await this.getElementText(this.page.locator('div.text-sm.px-2').nth(1))       

        const itemQuantity = await this.page.locator('form.edit_line_item input[aria-label="Quantity"]').first();
        const itemQuantitytext = await itemQuantity.getAttribute('value')?? '';

        itemCartDescriptionList.push(itemNametext.toUpperCase())
        itemCartDescriptionList.push(itemPricetext)
        itemCartDescriptionList.push(itemVarianttext.toUpperCase())
        itemCartDescriptionList.push(itemSizetext)
        itemCartDescriptionList.push(itemQuantitytext)

        const itemPrice = itemPricetext.split('$')[1].trim()
        const expectedTotal = Number(itemQuantitytext) * Number(itemPrice)

        await expect(this.page.locator('span.shopping-cart-total-amount').first()).toContainText(String(expectedTotal))

        return itemCartDescriptionList
    }
    
}