describe('React application', () => {
  it('should display title', async () => {
    await global.page.goto(global.app.getUrl('/'));
    await global.page.waitForSelector('h2', { timeout: 1000 });

    expect(await global.page.$eval('h2', e => e.innerText)).toEqual('Hello World!');
  });
});
