import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://uitestingplayground.com/ajax')
    await page.getByText('Button Triggering AJAX Request    ').click()
})

test('Auto waiting', async ({page}) => {
    const successButton = page.locator('.bg-success')
    // await successButton.click()

    // await successButton.waitFor({state: 'attached'})
    // const successText = await successButton.allTextContents()
    // expect(successText).toContain('Data loaded with AJAX get request.')

    await expect(successButton).toHaveText('Data loaded with AJAX get request.', {timeout: 20000})
})

test('Alternative waits',async ({page}) => {
    const successButton = page.locator('.bg-success')

    // wait for element
    // await page.waitForSelector('.bg-success') 

    // wait for particular response
    // await page.waitForResponse('http://uitestingplayground.com/ajaxdata')

    // wait for network calls to complete AVOID
    await page.waitForLoadState('networkidle')


    const successText = await successButton.allTextContents()
    expect(successText).toContain('Data loaded with AJAX get request.')
})

test('Timeouts',async ({page}) => {
    const successButton = page.locator('.bg-success')
    await successButton.click()
    
})