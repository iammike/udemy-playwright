import { test, expect } from '@playwright/test'
import { DatePickerPage } from '../page-objects/datePickerPage'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutsPage'

test.beforeEach(async({page}) => {
    await page.goto('http://localhost:4200')
})

test('Navigate to pages', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    await navigateTo.datePickerPage()
    await navigateTo.formLayoutsPage()
    await navigateTo.smartTablePage()
    await navigateTo.toastrPage()
    await navigateTo.tooltipPage()
})

test('Parameterized methods', async ({page}) => {
    const navigateTo = new NavigationPage(page)
    const formLayoutsPage = new FormLayoutPage(page)
    const datePickerPage = new DatePickerPage(page)

    await navigateTo.formLayoutsPage()
    await formLayoutsPage.submitUsingGridFormWithCredsAndSelectOption('test@test.com', 'password', 'Option 2')
    await formLayoutsPage.submitInlineFormWithNameEmailAndCheckbox('mike', 'iammikec@gmail.com', true)

    await navigateTo.datePickerPage()
    await datePickerPage.selectCommonDatePickerDateFromToday(10)
    await datePickerPage.selectRangedDatePickerFromToday(1, 5)
})