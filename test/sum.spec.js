import {expect, test, vi} from 'vitest'
import { sum, sub } from './sum'

vi.mock('./sum', async (importOriginal) => {
  const mod = await importOriginal()
  return {
    ...mod,
    sub(a,b) {
      return a-b
    },
    namedExport: vi.fn()
  }
})

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1,2)).toEqual(3)
})

test('toBe toEqual', () => {
  const obj1 = {
    name: 'ziggy'
  }
  const obj2 = {
    name: 'ziggy',
    sex: undefined
  }
  expect(obj1).toEqual(obj2)
  expect([obj1]).toEqual([obj2])
})

test('toHaveLength', () => {
  expect([1, 2, 3]).toHaveLength(3)
  expect({length: 3}).toHaveLength(3)
})

test('toMatch', () => {
  expect('top fruits include apple').toMatch(/apple/)
})

test('toMatchObject', () => {
  expect({cache: new Set([1])}).toEqual({cache: new Set([1])})
  expect({name: 'ziggy', sex: 'male', age: 18}).toMatchObject({name: 'ziggy'})
  expect([{ foo: 'bar' }, { baz: 1 }]).toMatchObject([
    { foo: 'bar' },
    { baz: 1 },
  ])
})

test('toMatchSnapshot', () => {
  const bar = {
    foo: {
      x: 1,
      y: 2,
    },
    bar: new Set([1])
  }

  expect(bar).toMatchSnapshot({foo: {x: expect.any(Number)}})
})


const market = {
  buy(subject, amount) {

  }
}
test('toHaveBeenCalled toHaveBeenCalledTimes', () => {
  const buySpy = vi.spyOn(market, 'buy')
  expect(buySpy).not.toHaveBeenCalled()

  market.buy('apple', 10)
  expect(buySpy).toHaveBeenCalled()
  expect(buySpy).toHaveBeenCalledTimes(1)
  market.buy('apple', 10)
  expect(buySpy).toHaveBeenCalledTimes(2)
})


test('toHaveBeenCalledWith', () => {
  const buySpy = vi.spyOn(market, 'buy')
  market.buy('apple', 10)
  expect(buySpy).toHaveBeenCalledWith('apple', 10)
})

function getApplesPrice(amount) {
  const PRICE = 10
  return amount * PRICE
}

test('spy function returned a value', () => {
  const getPriceSpy = vi.fn(getApplesPrice)

  const price = getPriceSpy(10)

  expect(price).toBe(100)
  expect(getPriceSpy).toHaveReturned()
})

test('vi.mock', () => {
  expect(sub(1,1)).toBe(0)
})