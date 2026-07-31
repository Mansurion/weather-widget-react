import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // Вручную прописываем правила и настройки, чтобы обойти баг ESLint v10
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true }
      },
    },
    settings: {
      react: { version: 'detect' },
    },
    rules: {
      // Базовые правила JavaScript
      ...js.configs.recommended.rules,

      // Стабильные правила React Hooks
      ...reactHooks.configs.recommended.rules,

      // Правила Vite Fast Refresh
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],

      // Безопасные правила React, которые не ломают ESLint 10
      'react/jsx-uses-react': 'error',     // Предотвращает ошибку, если React импортирован, но не используется в JSX
      'react/jsx-uses-vars': 'error',      // Предотвращает ложное срабатывание no-unused-vars для компонентов
      'react/jsx-no-duplicate-props': 'error', // Запрещает дублирование пропсов в одном компоненте
      'react/jsx-key': 'error',            // Контролирует наличие уникальных key в итерациях (map)

      // Отключение несовместимых и избыточных правил
      'react/prop-types': 'off',           // Отключаем обязательную валидацию prop-types
      'react/display-name': 'off',         // Отключаем правило, ломающее парсер ESLint v10
      'react-hooks/set-state-in-effect': 'off' // Отключаем ложное срабатывание на fetch-хуках с useCallback
    },

  },
])
