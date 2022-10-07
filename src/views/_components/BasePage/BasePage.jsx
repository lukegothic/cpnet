export const BasePage = ({ children }) => {
  <section id="page">
      <header>{ localeStrings.ui.header }</header>
      <nav>{ localeStrings.ui.nav } <LanguageSelector /></nav>
      <main>
        { children }
      </main>
      <footer>{ localeStrings.ui.footer }</footer>
    </section>;
}