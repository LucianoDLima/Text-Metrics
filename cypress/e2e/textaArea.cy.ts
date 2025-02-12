const textArea = '[data-testid="text-area-input"]';
const exceedError = '[data-testid="exceed-error"]';
const spaceCheck = '[data-testid="space-check"] input';
const limitCheck = '[data-testid="limit-check"] input';
const limitInput = '[data-testid="limit-filter-input"] input';
const limitInputLabel = '[data-testid="limit-filter-input"] label';
const aproxTime = '[data-testid="aprox-time"]';

const testText1 = 'LoremLorem, ipsum dolor.';
const testText2 =
  'Lorem ipsum dolor sit? Amet consectetur! Adipisicing elit. Odit, consequuntur.';

beforeEach(() => {
  cy.visit('http://localhost:5173');
});

describe('Default state', () => {
  it('should render the text area empty', () => {
    cy.get(textArea).should('exist').and('contain', '');
  });

  it('should not render the exceed error message', () => {
    cy.get(exceedError).should('not.exist');
  });

  it('should render the checkboxes unselected', () => {
    cy.get(spaceCheck).should('exist').and('not.be.checked');
    cy.get(limitCheck).should('exist').and('not.be.checked');
  });

  it('should not render the character limit input', () => {
    cy.get(limitInput).should('not.exist');
    cy.get(limitInputLabel).should('not.exist');
  });

  it('should render the approximate time', () => {
    cy.get(aproxTime)
      .should('exist')
      .and('contain', 'Approx. reading time: 0 minutes');
  });
});

describe('Text in textarea', () => {
  it('should render the text area with short text. Aprox time at less than 1 minute', () => {
    cy.get(textArea).type(testText1).should('have.value', testText1);
    cy.get(aproxTime).should('contain', 'Approx. reading time: <1 minute');
  });
});

describe('Aprox time', () => {
  it('should update aprox reading time to 1 minute', () => {
    cy.get(textArea).type('1 2 3 4 5 6 7 8 9 10 '.repeat(20));
    cy.get(aproxTime).should('contain', 'Approx. reading time: 1 minute');
  });

  it('should update aprox reading time to 2 minutes', () => {
    cy.get(textArea).type('1 2 3 4 5 6 7 8 9 10 '.repeat(40));
    cy.get(aproxTime).should('contain', 'Approx. reading time: 2 minutes');
  });
});

describe('Checkboxes state', () => {
  it('should toggle checkboxes to checked', () => {
    cy.get(spaceCheck).click().should('be.checked');
    cy.get(limitCheck).click().should('be.checked');
  });

  it('should render the limit input when limit checkbox is checked', () => {
    cy.get(limitCheck).click();
    cy.get(limitInput).should('exist');
  });
});

describe('Character limit', () => {
  beforeEach(() => {
    cy.get(limitCheck).click();
  });

  it('should not allow letters symbols', () => {
    cy.get(limitInput).type('abc!@#e^^').should('have.value', '');
    cy.get(textArea).type(testText1).should('have.value', testText1);
  });

  it('should ignore letters and symbols when there is a number among them', () => {
    cy.get(limitInput).type('abc1!@$#2e^^3def').should('have.value', '123');
    cy.get(textArea).type(testText1).should('have.value', testText1);
  });

  it('should have exclude space checked off render the exceed error message when the limit is reached with the exceed error message showing -68 characters', () => {
    cy.get(limitInput).type('10').should('have.value', '10');
    cy.get(textArea).type(testText2).should('have.value', testText2);
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 10 characters. (-68)');
  });

  it('should have exclude space checked on and render the exceed error message when the limit is reached with the exceed error message showing -59 characters', () => {
    cy.get(spaceCheck).click();

    cy.get(limitInput).type('10').should('have.value', '10');
    cy.get(textArea).type(testText2).should('have.value', testText2);
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 10 characters. (-59)');
  });

  it('should remove the exceed error message when text is reduced back to the limit', () => {
    cy.get(limitInput).type('20');

    cy.get(textArea).type(testText1);
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 20 characters. (-4)');

    cy.get(textArea).type('{backspace}{backspace}{backspace}');
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 20 characters. (-1)');

    cy.get(textArea).type('{backspace}');
    cy.get(exceedError).should('not.exist');
  });

  it('should remove the exceed error message when the limit is increased', () => {
    cy.get(limitInput).type('10');

    cy.get(textArea).type(testText1);
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 10 characters. (-14)');

    cy.get(limitInput).clear().type('20');
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 20 characters. (-4)');

    cy.get(limitInput).clear().type('30');
    cy.get(exceedError).should('not.exist');
  });

  it('should remove the exceed error message when the limit is removed', () => {
    cy.get(limitInput).type('10');

    cy.get(textArea).type(testText1);
    cy.get(exceedError)
      .should('exist')
      .and('contain', 'Limit reached! Your text exceeds 10 characters. (-14)');

    cy.get(limitCheck).click();
    cy.get(exceedError).should('not.exist');
  });
});
