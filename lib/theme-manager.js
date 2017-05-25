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

  toggleTheme () {
    let newTheme = this.currentTheme === this.BRIGHT_THEME ? this.DARK_THEME : this.BRIGHT_THEME
    this.currentTheme = newTheme

    return newTheme
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