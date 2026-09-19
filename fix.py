import os

with open('app.js', 'r', encoding='utf-8') as f:
    content = f.read()

# I18N replacement
content = content.replace("navWiki: 'Справочник',", "navWiki: 'Справочник',\n    navSettings: 'Настройки',")
content = content.replace("navWiki: 'Wiki',", "navWiki: 'Wiki',\n    navSettings: 'Settings',")

with open('app.js', 'w', encoding='utf-8', newline='\n') as f:
    f.write(content)
