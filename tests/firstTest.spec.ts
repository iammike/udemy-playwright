import {expect, test} from '@playwright/test'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
})

test.describe('Form Suite', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Forms').click()
    })

    test.describe('Click Form Layouts link', () => {
        test.beforeEach(async({page}) => {
            await page.getByText('Form Layouts').click()
        })

        test('Locator syntax rules', async ({page}) => {
            //by tag name
            await page.locator('input').first().click()

            //by ID
            page.locator('#inputEmail1')

            //by class value
            page.locator('.shape-rectangle')

            //by attribute
            page.locator('[placeholder="Email"]')

            //by class value (full)
            page.locator('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')

            //combination
            page.locator('input[placeholder="Email"][nbinput]')

            //by XPath (bound to implementation - avoid)
            page.locator('//*[@id="inputEmail1"]')

            //by partial text
            page.locator(':text("Using")')

            //by exact text
            page.locator(':text-is("Using the Grid")')
        })

        test('User facing locators', async ({page}) => {
            await page.getByRole('textbox', {name: 'Email'}).first().click()
            await page.getByRole('button', {name: 'Sign in'}).first().click()
            await page.getByLabel('Email').first().click()
            await page.getByPlaceholder('Jane Doe').click()
            await page.getByText('Check me out').click()
            await page.getByTestId('submitSignInButton').click()
            await page.getByTitle('IoT Dashboard').click()

        })

        test('Locating child elements', async ({page}) =>  {
            await page.locator('nb-card nb-radio :text-is("Option 1")').click()
            await page.locator('nb-card').locator('nb-radio').locator(':text-is("Option 2")').click()

            await page.locator('nb-card').getByRole('button', {name: 'Sign in'}).first().click()

            await page.locator('nb-card').nth(3).getByRole('button').click()
        })

        test('Locating parent elements', async ({page}) => {
            await page.locator('nb-card', {hasText: "Using the Grid"})
                .getByRole('textbox', {name: "Email"})
                .click()
            await page.locator('nb-card', {has: page.locator("#inputEmail1")})
                .getByRole('textbox', {name: "Email"})
                .click()
            await page.locator('nb-card')
                .filter({hasText: "Basic form"})
                .getByRole('textbox', {name: "Email"})
                .click()
            await page.locator('nb-card')
                .filter({has: page.locator('.status-danger')})
                .getByRole('textbox', {name: "Password"})
                .click()
            await page.locator('nb-card')
                .filter({has: page.locator('nb-checkbox')})
                .filter({hasText: 'Sign in'})
                .getByRole('textbox', {name: "Email"})
                .click()
            await page.locator(':text-is("Using the Grid")')
                .locator('..')
                .getByRole('textbox', {name: "Email"})
                .click()
        })

        test('Reusing locators', async ({page}) => {
            const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
            const emailField = basicForm.getByRole('textbox', {name: "Email"})

            await emailField.fill('test@test.com')
            await basicForm.getByRole('textbox', {name: "Password"}).fill('Welcome123')
            await basicForm.locator('nb-checkbox').click()
            await basicForm.getByRole('button').click()

            await expect(emailField).toHaveValue('test@test.com')
        })

        test('Extracting values',async ({page}) => {
            //single value
            const basicForm = page.locator('nb-card').filter({hasText: "Basic form"})
            const buttonText = await basicForm.locator('button').textContent()
            expect(buttonText).toEqual('Submit')

            //all values
            const radioButtonLabels = await page.locator('nb-radio').allTextContents()
            expect(radioButtonLabels).toContain('Option 1')

            //input value
            const emailField = basicForm.getByRole('textbox', {name: "Email"})
            await emailField.fill('test@test.com')
            const emailFieldValue = await emailField.inputValue()
            expect(emailFieldValue).toEqual('test@test.com')

            //attribute value
            const placeholderValue = await emailField.getAttribute('placeholder')
            expect(placeholderValue).toEqual('Email')
        })

        test('Assertions',async ({page}) => {
            //general
            const value = 5
            expect(value).toEqual(5)

            const basicFormButton = page.locator('nb-card').filter({hasText: "Basic form"}).locator('button')
            const basicFormButtonText = await basicFormButton.textContent()
            expect(basicFormButtonText).toEqual('Submit')

            //locator
            await expect(basicFormButton).toHaveText('Submit')

            //soft
            await expect.soft(basicFormButton).toHaveText('Submit5')
            await basicFormButton.click()
        })
    })

    test('Click Datepicker link', async ({page}) => {
        await page.getByText('Datepicker').click()
    })
})

test.describe('Charts Suite', () => {
    test.beforeEach(async({page}) => {
        await page.getByText('Charts', {exact: true}).click()
    })

    test('Click Echarts link', async ({page}) => {
        await page.getByText('Echarts').click()
        // await expect(page.getByText('Pie').toBeVisible())
    })
})