import { Page, TestInfo } from '@playwright/test';

export class ReportHelper {
  static async attachScreenshot(page: Page, testInfo: TestInfo, name: string = 'screenshot') {
    const screenshot = await page.screenshot();
    await testInfo.attach(name, {
      body: screenshot,
      contentType: 'image/png',
    });
  }
  static async attachOnFailure(page: Page, testInfo: TestInfo, name: string = 'failure-screenshot') {
    if (testInfo.status !== testInfo.expectedStatus) {
      const screenshot = await page.screenshot();
      await testInfo.attach(name, {
        body: screenshot,
        contentType: 'image/png',
      });
    }
  }
}
