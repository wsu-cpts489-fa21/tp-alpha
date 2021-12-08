import { Selector } from 'testcafe';

fixture `updateRoundsTest`
    .page `http://localhost:8081`;

test('updateRounds', async t => {
    await t
        .expect(Selector("#loginPage").visible).eql(true)
        //email: testEmail@yahoo.com
        //password: Password01
        .typeText('#email', 'testEmail@yahoo.com')
        .typeText('#password', 'Password01')
        .click("#loginBtn")
        .expect(Selector("#root").visible).eql(true)
        .click("#roundsMode")
        .click("#roundsModeActionBtn")
        .typeText('#roundCourse', 'Round Update Test1')
        .typeText('#roundNotes', 'This round is a test driven round creation.')
        .pressKey('enter')
        .expect(Selector("roundsModeTab").visible).eql(true)
        .expect(Selector("roundsTable").value).eql('Round Update Test1')
        //Expected after creating round, edit the round and then delete the round.
});