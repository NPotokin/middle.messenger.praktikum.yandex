# Проект **Мессенджер** Спринт 2.

## Задачи.
Задачей данного спринта было внедрить Routing (на базе HistoryAPI браузера) с базовой защитой путей на основании авторизованности пользователя, подключить и наладить взаимодействие с API, сделать хранилище состояния (Store), а также внедрить webSocket для обмена сообщениями в реальном времени. Ну и, наконец, реализовать однонаправленный поток данных в приложении.

## Структура проекта
Проект разбит на следующие папки:
- /core - реализация Блока, Шины событий, Роутера, Хранилища и HTTP транспорта и webSocket.
- /ui - общие компонеты и логика взаимодействия внутри них
(например input - input field, errorLine и сам input)
- /components - компоненты страниц и модулей и логика взаимодействия внутри них (например модальные окна)
- /modules - модули, которые собирают компоненты с логикой взаимодействия между компонентами
- /pages - страницы - собирают модули и компоненты и настраивают логику взаимодействия между ними 
- /utils - утилитарные функции (валидация,навигация, коннект для подписки на обновление в Хранилище и преобразователь даты)
- /api - запросы к бэкенду
- /controllers - сервисы-прослойки для получения данных и запросов от комопнентов, обращения к API(из папки api), работы с Хранилищем

## Страницы.
В проекте представленны следующие страницы:
1. Sign in (Регистрация);
2. Log in (Вход):
3. Error Page (Странцы Ошибок):
- Ошибка 404
- Ошибка 500
4. User Page (Профиль Пользователя):
- Профиль Пользователя
- Страница с изменением данных Пользователя
- Страница с изменением Пароля
5.  Chat (Страница Чата):
- Старница Чата 

## Развертывание (Deploy).
Проект в его текущем состоянии выложен из ветки **deploy** на **Netlify**.
Посмотреть его можно по [по этой ссылке](https://deploy--wondrous-nasturtium-edcfd0.netlify.app/)


## Полезные команды терминала.
1. Запустить проект в режиме разработчика (запустится на **Порту 3000**):
```npm run dev```
2. Запустить билд проекта и превью
```npm run start```
3. Запустить превью
```npm run preview```
4. Запустить линтер кода
```npm run code liner```
5. Запустить линтер стиля
```npm run style liner```
