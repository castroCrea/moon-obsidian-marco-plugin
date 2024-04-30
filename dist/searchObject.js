"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchObject = void 0;
// Function to search into the object using a string path
const searchObject = ({ obj, path }) => {
    const keys = path.split('.'); // Split the path string into an array of keys
    let current = obj;
    for (const key of keys) {
        if (key in current) {
            current = current[key];
        }
        else {
            return undefined;
        } // Key doesn't exist in the object
    }
    return current; // Return the value found at the end of the path
};
exports.searchObject = searchObject;
//# sourceMappingURL=searchObject.js.map