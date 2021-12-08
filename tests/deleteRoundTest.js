import { Selector } from 'testcafe';

fixture `deleteRoundTest`
    .page `http://localhost:8081`;

test('deleteRound', async t => {
    await t
        .click()
});