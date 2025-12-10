# Руководство по развертыванию на VPS

## Подготовка VPS

1. Установите Docker и Docker Compose:
   ```bash
   # Для Ubuntu/Debian
   sudo apt update
   sudo apt install -y docker.io docker-compose
   
   # Добавьте вашего пользователя в группу docker
   sudo usermod -aG docker $USER
   
   # Перезагрузите систему или выполните
   newgrp docker
   ```

2. Скопируйте файлы проекта на ваш VPS (например, с помощью `scp` или `git clone`)

## Подготовка приложения

1. Перейдите в директорию с проектом:
   ```bash
   cd /path/to/your/project
   ```

2. Создайте файл `.env` с вашим API-ключом:
   ```bash
   echo "VITE_GEMINI_API_KEY=ваш_ключ_здесь" > .env
   ```

3. Убедитесь, что порт 5173 свободен или настройте firewall:
   ```bash
   # Для ufw
   sudo ufw allow 5173
   
   # Или для iptables
   sudo iptables -A INPUT -p tcp --dport 5173 -j ACCEPT
   ```

## Запуск приложения

1. Соберите и запустите контейнер:
   ```bash
   docker-compose up --build -d
   ```

2. Проверьте статус контейнера:
   ```bash
   docker-compose ps
   ```

3. Приложение будет доступно по адресу: `http://ВАШ_IP:5173`

## Обновление приложения

1. Остановите текущий контейнер:
   ```bash
   docker-compose down
   ```

2. Обновите файлы приложения

3. Пересоберите и запустите контейнер:
   ```bash
   docker-compose up --build -d
   ```

## Полезные команды

- Просмотр логов: `docker-compose logs -f`
- Остановка приложения: `docker-compose down`
- Перезапуск приложения: `docker-compose restart`
- Просмотр потребления ресурсов: `docker stats`

## Безопасность

Для продакшена рекомендуется:
1. Использовать reverse proxy (nginx) с SSL/HTTPS
2. Не открывать порт 5173 напрямую, а использовать прокси
3. Хранить API-ключи в безопасном месте

Пример конфигурации nginx:
```
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:5173;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```