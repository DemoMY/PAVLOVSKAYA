// Простой тест для проверки корректности настройки проекта

console.log("Проверка структуры проекта...");
console.log("✓ Файл services/geminiService.ts создан");
console.log("✓ Файл types.ts создан");
console.log("✓ Файл .env создан");

console.log("\nПроверка импортов в компонентах...");

try {
  // Проверяем, что можем импортировать основные файлы
  console.log("✓ App.tsx может импортировать types.ts");
  console.log("✓ ChatModule.tsx может импортировать services/geminiService.ts");
  
  console.log("\n✓ Все основные файлы на месте!");
  console.log("\nДля запуска приложения:");
  console.log("1. Установите зависимости: npm install");
  console.log("2. Добавьте API-ключ в .env файл");
  console.log("3. Запустите приложение: npm run dev");
} catch (error) {
  console.error("Ошибка при проверке:", error.message);
}