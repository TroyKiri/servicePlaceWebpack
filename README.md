# serviceMestoWebpack
---
## Ссылка на проект: https://TroyKiri.github.io/servicePlaceWebpack/
---
### Version 1.0.0.
---
### В данном проекте:
---
1. Настроил сборку build и dev.
2. Настроил хеширование CSS и JS-файлов.
3. Создал в корне проекта пустой файл с именем .nojekyll, для корректной работы БЭМ в GitHub.
4. Настроил автоматическое обновление страницы проекта при сохранении файлов (hot reload).
5. Настроил вебпак для работы с изображениями и их оптимизации.
6. Настроил два режима сборки: development и production.
7. Настроил работу со стилями в зависимости от сборки.
8. Разбил код на модули.
9. Связал модули директивами export и import.
---
### Функционал сервиса "Место":
1. Добавление карточки (кнопка "+"): данные отправляются на сервер с помощью API запроса, в случае получения положительного ответа - карточка с вашими данными добавляется в DOM. Поля ввода данных проходят валидацию и предупреждают пользователя о некорректности введённой информации.
2. Редактирование профиля (кнопка "Edit"). Поля ввода данных проходят валидацию и предупреждают пользователя о некорректности введённой информации.
3. Информация о пользователе и начальные карточки подгружаются с сервера.
4. Отображение количества "лайков".
5. Возможность удаления добавленной карточки.
---
В дальнейшейм есть несколько задач для доработки проекта:
- реализовать постановку и снятие "лайка";
- добавить возможность обновления аватара пользователя;
- улучшить UX-дизайн;
- добавить к проекту backend-часть (https://github.com/TroyKiri/serviceMestoBackend).
---
### Инструкция по развертыванию проекта:
1. Клонируем репозиторий на свой компьютер командой (git clone https://github.com/TroyKiri/servicePlaceWebpack.git);
2. Необходимо установить node.js и NPM (https://nodejs.org/en/download/);
3. В папке с проектом выполнить команду npm init.
