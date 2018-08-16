import axios from 'axios';

describe('When rendering', () => {
  it('should display a title', async () => {
    const url = global.app.getUrl('/');
    const response = await axios.get(url);

    expect(response.data).toMatchSnapshot();
  });
});
