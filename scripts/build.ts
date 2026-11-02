import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

const ANSI_NAMES = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White']

// Herdr themes only accept opaque #rrggbb colors, so Vitesse's translucent ones are blended.
function blend(color: string, background: string) {
  const channel = (hex: string, index: number) =>
    Number.parseInt(hex.slice(1 + index * 2, 3 + index * 2), 16)
  if (color.length === 7) return color.toLowerCase()

  const alpha = channel(color, 3) / 255
  const blended = [0, 1, 2].map((index) =>
    Math.round(channel(color, index) * alpha + channel(background, index) * (1 - alpha)),
  )
  return `#${blended.map((value) => value.toString(16).padStart(2, '0')).join('')}`
}

for (const variant of ['dark', 'light']) {
  const source = fileURLToPath(import.meta.resolve(`theme-vitesse/themes/vitesse-${variant}.json`))
  const { colors } = JSON.parse(readFileSync(source, 'utf8')) as { colors: Record<string, string> }
  const background = colors['editor.background'].toLowerCase()
  const pick = (name: string) => blend(colors[name], background)

  const foreground = pick('terminal.foreground')
  const dim = pick('editorLineNumber.foreground')
  const accent = pick('button.background')
  const accentForeground = pick('button.foreground')
  const hover = pick('list.hoverBackground')

  const theme = {
    background,
    foreground,
    selection: pick('terminal.selectionBackground'),
    cursor: foreground,
    ansi: [
      ...ANSI_NAMES.map((name) => pick(`terminal.ansi${name}`)),
      ...ANSI_NAMES.map((name) => pick(`terminal.ansiBright${name}`)),
    ],
    colors: {
      canvas: background,
      chrome: pick('sideBar.background'),
      surface: background,
      popover: hover,
      raised: hover,
      hover,
      selected: pick('list.activeSelectionBackground'),
      border: pick('panel.border'),
      input: dim,
      muted: pick('descriptionForeground'),
      dim,
      accent,
      accent_foreground: accentForeground,
      solid: accent,
      solid_foreground: accentForeground,
      ring: accent,
      working: pick('editorWarning.foreground'),
      blocked: pick('errorForeground'),
      done: pick('gitDecoration.addedResourceForeground'),
      idle: dim,
      unknown: dim,
    },
  }

  const target = new URL(`../themes/vitesse-${variant}.json`, import.meta.url)
  writeFileSync(target, `${JSON.stringify(theme, null, 2)}\n`)
}
