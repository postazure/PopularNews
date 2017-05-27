import PersistenceClient from './persistence-client'
const persistenceClient = new PersistenceClient()

let instance = null
class ThemeManager {
  constructor () {
    if (!instance) {
      instance = this
    }

    this.BRIGHT_THEME = 'bright'
    this.DARK_THEME = 'dark'

    this.currentTheme = this.BRIGHT_THEME
    this.colors = {}

    return instance
  }

  setTheme(theme) {
    return this.currentTheme = theme
  }

  toggleTheme () {
    let newTheme = this.currentTheme === this.BRIGHT_THEME ? this.DARK_THEME : this.BRIGHT_THEME
    this.currentTheme = newTheme

    persistenceClient.persistTheme(newTheme)
    return newTheme
  }

  getSavedTheme () {
    return persistenceClient.retrieveTheme(this.BRIGHT_THEME)
      .then(theme => this.setTheme(theme))
  }

  getColorsFor ( componentName ) {
    return this.colors[ componentName ][ this.currentTheme ]
  }

  setColorsFor ( componentName, theme, colors ) {
    this.colors[ componentName ] = Object.assign({}, this.colors[ componentName ])
    this.colors[ componentName ][ theme ] = colors
  }
}

export default new ThemeManager()