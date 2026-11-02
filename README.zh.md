# herdr-theme-vitesse

🎨 适用于 Herdr 桌面应用的 Vitesse 深色和浅色主题

## 安装

把两个主题复制到 Herdr 主目录（默认是 `~/.config/herdr-app`）的 `themes` 文件夹。

macOS / Linux：

```bash
base=https://raw.githubusercontent.com/guanyme/herdr-theme-vitesse/main/themes
for theme in vitesse-dark vitesse-light; do
  curl -fsSL "$base/$theme.json" -o ~/.config/herdr-app/themes/$theme.json
done
```

Windows（PowerShell）：

```powershell
$base = 'https://raw.githubusercontent.com/guanyme/herdr-theme-vitesse/main/themes'
'vitesse-dark', 'vitesse-light' | ForEach-Object {
  Invoke-WebRequest "$base/$_.json" -OutFile "$HOME\.config\herdr-app\themes\$_.json"
}
```

## 使用说明

在 Herdr 的设置里选择主题，或者运行：

```bash
herdr-app do app.theme --name vitesse-dark
herdr-app do app.theme --name vitesse-light
```

每条命令只设置主题明暗对应的那一半，两条都运行后，Herdr 会跟随系统的浅色或深色模式。

要让它们成为未指定主题的布局的默认主题，在 `settings.json` 里加上：

```json
{ "theme": { "light": "vitesse-light", "dark": "vitesse-dark" } }
```

### 颜色

Herdr 主题只接受不透明的 `#rrggbb` 颜色，所以 Vitesse 的半透明颜色都和它的背景色合成过。终端颜色来自 Vitesse 的 `terminal.*`，面板颜色的对应关系如下：

| Herdr                                   | Vitesse                                 |
| --------------------------------------- | --------------------------------------- |
| `canvas`、`surface`                     | `editor.background`                     |
| `chrome`                                | `sideBar.background`                    |
| `popover`、`raised`、`hover`            | `list.hoverBackground`                  |
| `selected`                              | `list.activeSelectionBackground`        |
| `border`                                | `panel.border`                          |
| `muted`                                 | `descriptionForeground`                 |
| `dim`、`input`、`idle`、`unknown`       | `editorLineNumber.foreground`           |
| `accent`、`solid`、`ring`               | `button.background`                     |
| `accent_foreground`、`solid_foreground` | `button.foreground`                     |
| `working`                               | `editorWarning.foreground`              |
| `blocked`                               | `errorForeground`                       |
| `done`                                  | `gitDecoration.addedResourceForeground` |

### 构建

主题由 [`theme-vitesse`](https://www.npmjs.com/package/theme-vitesse) 包生成。更新这个包后重新生成：

```bash
pnpm install
pnpm build
```

## 使用许可

[MIT](https://opensource.org/licenses/MIT) © Guany

颜色来自 Anthony Fu 的 [vscode-theme-vitesse](https://github.com/antfu/vscode-theme-vitesse)，遵循 MIT 许可。
