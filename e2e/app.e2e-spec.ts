import { ReiserRliefAdminPage } from './app.po';

describe('reiser-relief-admin App', () => {
  let page: ReiserRliefAdminPage;

  beforeEach(() => {
    page = new ReiserRliefAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
