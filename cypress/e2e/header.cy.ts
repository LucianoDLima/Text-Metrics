const header = '[data-testid="header"]';
const logoDarkMode = '[data-testid="dark-logo"]';
const logoLightMode = '[data-testid="light-logo"]';
const iconDarkMode = '[data-testid="dark-mode-icon"]';
const iconLightMode = '[data-testid="light-mode-icon"]';
const toggle = '[data-testid="theme-toggle"]';

beforeEach(() => {
  cy.visit('http://localhost:5173');
});

describe('Header component (dark mode is default)', () => {
  it('should render the header', () => {
    cy.get(header).should('be.visible');
  });

  it('should display dark logo and sun icon on the button when the theme is dark (default)', () => {
    cy.get(logoDarkMode).should('be.visible');
    cy.get(iconLightMode).should('be.visible');
  });
});

describe('Theme toggle', () => {
  const theme = {
    dark: 'dark',
    light: 'light',
  } as const;

  function verifyThemeState(mode: keyof typeof theme) {
    const isDark = mode === 'dark';

    cy.get('body').should('have.attr', 'data-theme', theme[mode]);

    cy.get(isDark ? logoDarkMode : logoLightMode).should('be.visible');
    cy.get(isDark ? iconLightMode : iconDarkMode).should('be.visible');
  }

  it('should switch to light theme and show moon icon on the button when the theme toggle is clicked', () => {
    cy.get(toggle).click();

    verifyThemeState('light');
  });

  it('should persist the selected theme after page reload', () => {
    verifyThemeState('dark');

    cy.get(toggle).click();

    cy.reload();

    verifyThemeState('light');
  });
});
