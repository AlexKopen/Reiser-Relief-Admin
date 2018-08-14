import { AngularAuthenticationTemplatePage } from './app.po';

describe('reiser-relief-admin App', () => {
  let page: AngularAuthenticationTemplatePage;

  beforeEach(() => {
    page = new AngularAuthenticationTemplatePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
