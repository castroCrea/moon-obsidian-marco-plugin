"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const handleAnchors_1 = require("../handleAnchors");
describe('handleConditions', () => {
    it('handleConditions', () => {
        const content = 'Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}';
        const result = (0, handleAnchors_1.handleConditions)({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } });
        console.log({ result });
        expect(result).toEqual('Content Before ---  some content in the condition some text - https://moonjot.com -   --- Some content after ---  ---   some content in the condition link to the url https://moonjot.com ');
    });
    it('handleConditions recursive with good value', () => {
        const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`;
        const result = (0, handleAnchors_1.handleConditions)({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } });
        expect(result).toEqual('\n\ncontent\n\nURL: https://moonjot.com\n\n');
    });
    it('handleConditions recursive with wrong value', () => {
        const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.BOOM}
URL: \${SOURCE.URL}
\${END_IF SOURCE.BOOM}
\${END_IF SOURCE.TEXT}`;
        const result = (0, handleAnchors_1.handleConditions)({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } });
        expect(result).toEqual('\n\ncontent\n\n');
    });
});
describe('handleReplacingProperties', () => {
    it('handleReplacingProperties', () => {
        const content = 'Content Before --- ${IF SOURCE.TEXT} some content in the condition ${SOURCE.TEXT} - ${SOURCE.URL} - ${SOURCE.TITLE} ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up ${SOURCE.URL} ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url ${SOURCE.URL} ${END_IF SOURCE.URL}';
        const result = (0, handleAnchors_1.handleReplacingProperties)({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } });
        expect(result).toEqual('Content Before --- ${IF SOURCE.TEXT} some content in the condition some text - https://moonjot.com -  ${END_IF SOURCE.TEXT} --- Some content after --- ${IF TITLE} some content in the condition the should show up https://moonjot.com ${END_IF TITLE} ---  ${IF SOURCE.URL} some content in the condition link to the url https://moonjot.com ${END_IF SOURCE.URL}');
    });
    it('handleReplacingProperties with condition', () => {
        const content = `
\${IF SOURCE.TEXT}
content
\${IF SOURCE.URL}
URL: \${SOURCE.URL}
\${END_IF SOURCE.URL}
\${END_IF SOURCE.TEXT}`;
        const result = (0, handleAnchors_1.handleReplacingProperties)({ content, searchObj: { source: { text: 'some text', url: 'https://moonjot.com' } } });
        expect(result).toContain('URL: https://moonjot.com');
    });
});
//# sourceMappingURL=handleConditions.test%20copy.js.map