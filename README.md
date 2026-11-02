# herdr-theme-vitesse

🎨 [Vitesse](https://github.com/antfu/vscode-theme-vitesse) dark and light themes for the [Herdr](https://herdr.dev) desktop app

## Install

Copy both themes into the `themes` folder of your Herdr home (`~/.config/herdr-app` by default).

macOS / Linux:

```bash
base=https://raw.githubusercontent.com/guanyme/herdr-theme-vitesse/main/themes
for theme in vitesse-dark vitesse-light; do
  curl -fsSL "$base/$theme.json" -o ~/.config/herdr-app/themes/$theme.json
done
```

Windows (PowerShell):

```powershell
$base = 'https://raw.githubusercontent.com/guanyme/herdr-theme-vitesse/main/themes'
'vitesse-dark', 'vitesse-light' | ForEach-Object {
  Invoke-WebRequest "$base/$_.json" -OutFile "$HOME\.config\herdr-app\themes\$_.json"
}
```

## Usage

Pick the themes in Herdr's Settings, or run:

```bash
herdr-app do app.theme --name vitesse-dark
herdr-app do app.theme --name vitesse-light
```

Each command sets the half that matches the theme's lightness, so after running both, Herdr follows the system's light or dark mode.

To set them as the default for layouts without a theme, add this to `settings.json`:

```json
{ "theme": { "light": "vitesse-light", "dark": "vitesse-dark" } }
```

### Colors

Herdr themes only accept opaque `#rrggbb` colors, so Vitesse's translucent colors are blended onto its background. Terminal colors come from Vitesse's `terminal.*` values, and panel colors map as follows:

| Herdr                             | Vitesse                              |
| --------------------------------- | ------------------------------------ |
| `canvas`, `surface`               | `editor.background`                  |
| `chrome`                          | `sideBar.background`                 |
| `popover`, `raised`, `hover`      | `list.hoverBackground`               |
| `selected`                        | `list.activeSelectionBackground`     |
| `border`                          | `panel.border`                       |
| `muted`                           | `descriptionForeground`              |
| `dim`, `input`, `idle`, `unknown` | `editorLineNumber.foreground`        |
| `accent`, `solid`, `ring`         | `button.background`                  |
| `accent_foreground`, `solid_foreground` | `button.foreground`            |
| `working`                         | `editorWarning.foreground`           |
| `blocked`                         | `errorForeground`                    |
| `done`                            | `gitDecoration.addedResourceForeground` |

## License

[MIT](https://opensource.org/licenses/MIT) © Guany

Colors from [vscode-theme-vitesse](https://github.com/antfu/vscode-theme-vitesse) by Anthony Fu, under the MIT License.
