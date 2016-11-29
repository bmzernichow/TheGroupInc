import { WebappPage } from './app.po';

describe('webapp App', function() {
  let page: WebappPage;

  beforeEach(() => {
    page = new WebappPage();
  });

  it('should display message saying DHIS2 Moving Average Statistics', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('DHIS2 Moving Average Statistics');
  });
});
