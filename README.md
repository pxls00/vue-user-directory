# **Таблица пользователей (Vue 3 + TS)**

Небольшое SPA для просмотра и управления пользователями: поиск, фильтры, сортировка, пагинация, создание/редактирование/удаление.

## **Стек**

- Vue 3 (Composition API) + TypeScript
- Pinia (UI-состояние)
- Vite
- (Inspired) FSD-структура (app/pages/widgets/features/entities/shared)
- LocalStorage + /public/userList.json как источник данных
- Vitest + Vue Test Utils (базовые юнит-тесты)

## **Запуск**
Версия NODE: v22+


```
npm i
npm run dev
# откройте указанный в терминале адрес (localhost:8080)
```

## **Сборка**

```
npm run build
npm run preview (localhost:3000)
```

## **Тесты**

```
npm run test
# без UI
npm run test:run
# UI-раннер
npm run test:ui
```

## **Структура проекта (кратко)**

```
src/
  app/            # инициализация, провайдеры, резолвер лэйаутов
  pages/          # страницы роутов (тонкие)
  widgets/        # оркестраторы страниц (композируют фичи)
  features/       # user-search, user-crud, user-pagination, users-table
  entities/
    user/         # model/dto/mappers, repo (данные), helpers (filters/sort/paginate)
  shared/
    ui/           # AppButton/AppInput/AppModal/AppPagination/... (тупые UI-компоненты)
    lib/          # утилиты (datetime, debounce и т.п.)
```

## **Поток данных**

- При первом запуске приложение загружает /public/userList.json и сохраняет в **localStorage**.
- Далее чтение/запись только из **localStorage**.
- Pinia хранит **только UI-состояние** (search, filters, sort, page, pageSize).
- Фильтрация/сортировка/пагинация — **чистые функции** в entities/user.

## **Типизация**

- UserDTO (как в JSON) → маппится в доменную модель User (например, lastVisitedAt: number → Date).
- UI и фичи используют **доменные** типы, не DTO.

## **Заметки по UI**

- Компоненты App* в shared/ui (AppButton, AppModal, AppInput, AppPagination) — простые и переиспользуемые.
- Лэйаут выбирается через route.meta.layout и применяется в App.vue.
- Каждая страница импортирует **один** виджет (например, UsersSection) и больше ничего.

## **Как сбросить данные**

- Очистите ключ users.json в localStorage через DevTools и обновите страницу.

## **Осознанные упрощения**

- Нет бэкенда; устойчивость имитируется через localStorage.
- Тестами покрыта «ядро-логика» (пагинация, переключение сортировки, базовые emits/валидация).



## **Фокус**

- Расширяемость (FSD: widgets → features → entities → shared).
- Чистая доменная модель + маппинг DTO.
- UI-состояние только в Pinia.
- Явные типы + точечные тесты.

## **Оговорки**

- Стили минимальны.
- TanStack Query — отложен (не обязателен; архитектура подготовлена).
- Покрытие тестами выборочное (~15–20%).