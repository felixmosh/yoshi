describe('React application', () => {
  it('should display title', async () => {
    await global.page.goto('http://localhost:3100');
    await global.page.waitForSelector('h2');

    expect(await global.page.$eval('h2', e => e.innerText)).toMatchSnapshot();
  });
});
