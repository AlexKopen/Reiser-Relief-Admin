import { VolzapEventAdminPage } from './app.po';

describe('volzap-event-admin App', () => {
  let page: VolzapEventAdminPage;

  beforeEach(() => {
    page = new VolzapEventAdminPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
