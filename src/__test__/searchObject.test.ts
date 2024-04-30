import { searchObject } from "../searchObject";

describe('searchObject', () => {
  it('searchObject 1', () => {
    const obj = { item: { hello: {world: 'boom'}}}
    const result = searchObject({ obj, path: 'item' })
    expect(result).toEqual(obj.item)
   })
  it('searchObject 2', () => {
    const obj = { item: { hello: {world: 'boom'}}}
    const result = searchObject({ obj,path: 'item.hello' })
    expect(result).toEqual(obj.item.hello)
   })
  it('searchObject 3', () => {
    const obj = { item: { hello: {world: 'boom'}}}
    const result = searchObject({ obj,path: 'item.hello.world' })
    expect(result).toEqual(obj.item.hello.world)
   })
  it('searchObject not defined', () => {
    const obj = { item: { hello: {world: 'boom'}}}
    const result = searchObject({ obj,path: 'item.hello.world_not_defined' })
    expect(result).toBeUndefined()
   })
  it('searchObject with object', () => {
    const obj = { item: { hello: { world: 'boom' }}, array: [{ hello: { world: 'boom' } }]}
    const result = searchObject({ obj,path: 'array.0.hello' })
    expect(result).toEqual(obj.array[0].hello)
   })
})
