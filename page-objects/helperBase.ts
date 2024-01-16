import { Page } from "@playwright/test"

export class HelperBase {
// I'd call this a Base Page
    readonly page: Page
    
    constructor(page: Page) {
        this.page = page
    }

    async waitForNumberOfSeconds(timeInSeconds: number) {
        await this.page.waitForTimeout(timeInSeconds * 1000)
    }

}