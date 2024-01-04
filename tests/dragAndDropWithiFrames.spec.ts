import { test, expect } from '@playwright/test'

test('Auto waiting', async ({page}) => {
    await page.goto('https://www.globalsqa.com/demo-site/draganddrop')

    const frame = page.frameLocator('[class="demo-frame lazyloaded"]')

    // drag method
    const highTatras2 = frame.locator('li', {hasText: 'High Tatras 2'})
    const trash = frame.locator('#trash')
    await highTatras2.dragTo(trash)

    const trashItems = trash.locator('li')
    await expect(trashItems).toHaveCount(1)
 
    // mouse drag
    const highTatras4 = frame.locator('li', {hasText: 'High Tatras 4'})
    await highTatras4.hover()
    await page.mouse.down()
    await trash.hover()
    await page.mouse.up()
    await expect(trashItems).toHaveCount(2)

})