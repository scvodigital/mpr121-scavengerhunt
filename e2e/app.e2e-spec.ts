import { FruitkeyboardPage } from './app.po';

describe('fruitkeyboard App', function() {
  let page: FruitkeyboardPage;

  beforeEach(() => {
    page = new FruitkeyboardPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
