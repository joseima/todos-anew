import { test, expect, type Page } from '@playwright/test'
import { type Todo } from '../src/types'
const LOCAL_HOST = 'http://localhost:5173/'


test.beforeEach(async ({ page }) => {
  await page.goto(LOCAL_HOST)
})

const MOCK_TODO_ITEMS = [
  'buy some beer ',
  'feed the lizzard ',
  'go to the gym '
] as const

test.describe('app shows components correctly', () => {

  test('rendering some elements', async ({ page }) => {

    const text = await page.getByRole('paragraph')
    const input = await page.getByPlaceholder('What do you wanna do?')

    const textContent = await text.textContent()
    const inputValue = await input.getAttribute('value') 

    await expect(textContent?.length).toBeGreaterThan(0)
    await expect(inputValue?.length).toBe(0)
  })
})


test.describe('New Todo handle', () => {
  test('should allow me to add todo items', async ({ page }) => {

    const newTodo = await page.getByPlaceholder('What do you wanna do?')
    const listOfTodos = await page.getByTitle('List of todos')
    const textContent = await listOfTodos.textContent()

    await newTodo.fill(MOCK_TODO_ITEMS[0])
    await newTodo.press('Enter')

    await expect(listOfTodos).toContainText(
      MOCK_TODO_ITEMS[0]
    )

    await newTodo.fill(MOCK_TODO_ITEMS[1])
    await newTodo.press('Enter')

    await expect(listOfTodos).toContainText(
      MOCK_TODO_ITEMS[0]+ MOCK_TODO_ITEMS[1]
    )
  })

  test('check if items were added to local storage', async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 1)
  })

})

test.describe('complete task and remove completed', () => {
  test.beforeEach(async ({ page }) => {
    await createDefaultTodos(page)
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  test.afterEach(async ({ page }) => {
    await checkNumberOfTodosInLocalStorage(page, 3)
  })

  test('checkbox should allow me to mark completed tasks  ', async ({ page }) => {

    const removeCompletedButton  = await page.getByTitle('clear-completed')
    const listOfTodos = await page.getByTitle('List of todos')
    const firstTodo = await listOfTodos.getByRole('listitem').filter({ hasText: 'buy some beer' })
    
    await  firstTodo.getByRole('checkbox', { name: 'buy some beer' }).check()

    await expect(firstTodo).toHaveClass('completed')
    await checkNumberOfCompletedTodosInLocalStorage(page, 1)

    test('should allow me to remove all completed items ', async () => {
      await removeCompletedButton.click()
      await expect(firstTodo).toBeFalsy()
  
    })

  })

})

async function createDefaultTodos(page: Page) {
  const newTodo = page.getByPlaceholder('What do you wanna do?')
  for (const item of MOCK_TODO_ITEMS) {
    await newTodo.fill(item)
    await newTodo.press('Enter')
  }
}

async function checkNumberOfTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['_todos_']).length >= e
  }, expected)
}

async function checkNumberOfCompletedTodosInLocalStorage(page: Page, expected: number) {
  return await page.waitForFunction(e => {
    return JSON.parse(localStorage['_todos_']).filter((todo: Todo) => todo.completed).length >= e
  }, expected)
}

async function checkTodosInLocalStorage(page: Page, title: string) {
  return await page.waitForFunction(t => {
    return JSON.parse(localStorage['_todos_']).map((todo: Todo) => todo.title).includes(t)
  }, title)
}