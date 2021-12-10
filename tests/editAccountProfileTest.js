import { Selector } from 'testcafe';

fixture `editAccountProfile`
    .page `http://localhost:8081`;

test('editAccountProfile', async t => {
    await t
        .click()
});