import { Page } from '@playwright/test'

export class  FormLayoutPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async submitUsingGridFormWithCredsAndSelectOption(email: string, password: string, optionText: string) {
        const usingTheGridForm = this.page.locator('nb-card', {hasText: "Using the Grid"})
        await usingTheGridForm.getByRole('textbox', {name: 'Email'}).fill(email)
        await usingTheGridForm.getByRole('textbox', {name: 'Password'}).fill(password)
        await usingTheGridForm.getByRole('radio', {name: optionText}).check({force: true})
        await usingTheGridForm.getByRole('button').click()
    }

    async submitInlineFormWithNameEmailAndCheckbox(name: string, email: string, checkCheckbox: boolean) {
        const inlineForm = this.page.locator('nb-card', {hasText: "Inline form"})
        await inlineForm.getByRole('textbox', {name: 'Jane Doe'}).fill(name)
        await inlineForm.getByRole('textbox', {name: 'Email'}).fill(email)
        const checkbox = inlineForm.getByRole('checkbox')
        if(checkCheckbox) {
            await checkbox.check({force: true})
        } else {
            await checkbox.uncheck({force: true})
        }
    }

}