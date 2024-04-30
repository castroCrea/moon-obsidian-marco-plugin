"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const searchObject_1 = require("../searchObject");
describe('searchObject', () => {
    it('searchObject 1', () => {
        const obj = { item: { hello: { world: 'boom' } } };
        const result = (0, searchObject_1.searchObject)({ obj, path: 'item' });
        expect(result).toEqual(obj.item);
    });
    it('searchObject 2', () => {
        const obj = { item: { hello: { world: 'boom' } } };
        const result = (0, searchObject_1.searchObject)({ obj, path: 'item.hello' });
        expect(result).toEqual(obj.item.hello);
    });
    it('searchObject 3', () => {
        const obj = { item: { hello: { world: 'boom' } } };
        const result = (0, searchObject_1.searchObject)({ obj, path: 'item.hello.world' });
        expect(result).toEqual(obj.item.hello.world);
    });
    it('searchObject not defined', () => {
        const obj = { item: { hello: { world: 'boom' } } };
        const result = (0, searchObject_1.searchObject)({ obj, path: 'item.hello.world_not_defined' });
        expect(result).toBeUndefined();
    });
});
//# sourceMappingURL=searchObject.test%20copy.js.map