# Cashly

Локально работающий финансовый PWA на React, TypeScript, Vite и Firebase.

## Разработка

```sh
npm ci
npm run dev
npm test
npm run test:rules
npm run build
npm run test:e2e
```

Для полной установки зависимостей используется Node.js 24; тесты правил запускают Firestore Emulator и требуют Java 21.

## Firebase

Клиент использует публичную web-конфигурацию Firebase проекта `cashly-2312f`. Облачные данные размещаются в `users/{uid}/...`; правила в `firestore.rules` запрещают доступ без входа и между пользователями. Перед включением синхронизации опубликуйте правила:

```sh
npx firebase-tools login
npx firebase-tools deploy --only firestore:rules --project cashly-2312f
```

Не публикуйте service account keys. Вход Google использует redirect в Safari/iOS и popup в других браузерах.

## Публикация GitHub Pages

Workflow `.github/workflows/deploy.yml` собирает приложение, запускает unit-тесты и публикует `dist` на GitHub Pages. Базовый путь настроен как `/cashly/`.

## Хранение и резервные копии

Без входа данные хранятся в IndexedDB этого браузера. При входе используется отдельная локальная база для UID, а операции синхронизируются в Firestore с проверкой `updatedAt`. JSON и CSV можно экспортировать в настройках.
