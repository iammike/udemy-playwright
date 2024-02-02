import moment from 'moment'
import { expect, Page } from '@playwright/test'

export class DatePickerPage {

    private readonly page: Page

    constructor(page: Page) {
        this.page = page
    }

    async selectCommonDatePickerDateFromToday(numDaysFromToday) {
        const dateField = await this.page.getByPlaceholder('Form Picker')
        dateField.click()
        const dateToAssert = await this.selectDateInCalendar(numDaysFromToday)

        await expect(dateField).toHaveValue(dateToAssert)
    }

    async selectRangedDatePickerFromToday(startDayFromToday: number, endDayFromToday: number) {
        const dateField = await this. page.getByPlaceholder('Range Picker')
        dateField.click()

        const dateToAssertStart = await this.selectDateInCalendar(startDayFromToday)
        const dateToAssertEnd = await this.selectDateInCalendar(endDayFromToday)
        const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`

        await expect(dateField).toHaveValue(dateToAssert)
    }

    private async selectDateInCalendar(numDaysFromToday: number) {
        let date = new Date()
        date.setDate(date.getDate() + numDaysFromToday)
        const expectedDate = date.getDate().toString()
        const expectedMonthShort = date.toLocaleString('En-US', {month: 'short'})
        const expectedMonthLong = date.toLocaleString('En-US', {month: 'long'})
        const expectedYear = date.getFullYear()
        const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`

        let calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear}`
        while(!calendarMonthAndYear.includes(expectedMonthAndYear)) {
            await this.page.locator('nb-calendar-pageable-navigation [date-name="chevron-right"]').click()
            calendarMonthAndYear = await this.page.locator('nb-calendar-view-mode').textContent()
        }
        await this.page.locator('.day-cell.ng-star-inserted').getByText(expectedDate, {exact: true}).first().click()

        return dateToAssert
    }
}