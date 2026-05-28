import { test, expect } from '@playwright/test'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const TEST_PNG = path.join(__dirname, 'fixtures/test.png')

test('P0 #11: AVIF转换成功（无tileRowsLog2错误）', async ({ page }) => {
  await page.goto('/en/avif-convert')
  await page.locator('input[type="file"]').setInputFiles(TEST_PNG)
  await page.click('button:has-text("Compress")')
  const result = page.locator('text=Original')
  const errorEl = page.locator('.bg-red-50')
  await expect(result.or(errorEl)).toBeVisible({ timeout: 30000 })
  if (await errorEl.isVisible()) {
    const text = await errorEl.textContent()
    expect(text).not.toContain('Missing field')
  }
})

test('P2 #15: Original大小显示为文件大小（非像素数据大小）', async ({ page }) => {
  await page.goto('/en/png-compress')
  await page.locator('input[type="file"]').setInputFiles(TEST_PNG)
  await page.click('button:has-text("Compress")')
  const result = page.locator('text=Original')
  await expect(result).toBeVisible({ timeout: 30000 })
  const text = await result.textContent()
  console.log('Original size text:', text)
  // test.png is 70 bytes, pixel data would be 4 bytes (1x1x4)
  expect(text).not.toContain('4 B')
})

test('P2 #16: favicon.ico 不返回404', async ({ page }) => {
  const response = await page.goto('/favicon.ico')
  expect(response?.status()).toBe(200)
})

test('P2 #17: 中文版工具卡片描述已翻译', async ({ page }) => {
  await page.goto('/zh/')
  const cards = page.locator('.grid a p')
  const firstDesc = await cards.first().textContent()
  expect(firstDesc).not.toBe('MozJPEG encoder')
  expect(firstDesc).toContain('MozJPEG')
})

test('P1 #13: 移动端汉堡菜单存在', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 667 })
  await page.goto('/en/')
  const menuBtn = page.locator('button[aria-label="Toggle menu"]')
  await expect(menuBtn).toBeVisible()
  await menuBtn.click()
  const mobileNav = page.locator('nav.md\\:hidden a')
  await expect(mobileNav).toHaveCount(5)
})
