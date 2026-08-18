import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/weather-widget-react/',
  // Добавляем конфигурацию локального сервера
  server: {
    // Разрешаем Vite автоматически обрабатывать и перенаправлять пути без слэша
    strictPort: false,
    cors: true
  },
  preview: {
    // То же самое для команды проверки продакшен-билда
    strictPort: false,
    cors: true
  }
})
