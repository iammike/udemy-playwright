import { test, expect } from '@playwright/test'
import { DatePickerPage } from '../page-objects/datePickerPage'
import { NavigationPage } from '../page-objects/navigationPage'
import { FormLayoutPage } from '../page-objects/formLayoutsPage'
import { PageManager } from '../page-objects/pageManager'

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
    await datePickerPage.selectCommonDatePickerDateFromToday(-1)
    await datePickerPage.selectRangedDatePickerFromToday(-10, -5)
})

test('Parameterized methods w/ Page Manager', async ({page}) => {
    const pm = new PageManager(page)

    await pm.navigateTo().formLayoutsPage()
    await pm.onFormLayoutPage().submitUsingGridFormWithCredsAndSelectOption('test@test.com', 'password', 'Option 2')
    await pm.onFormLayoutPage().submitInlineFormWithNameEmailAndCheckbox('mike', 'iammikec@gmail.com', true)

    await pm.navigateTo().datePickerPage()
    await pm.onDatePickerPage().selectCommonDatePickerDateFromToday(-1)
    await pm.onDatePickerPage().selectRangedDatePickerFromToday(-5, -1)
})