export function registeringServiceWorker()
{
    if ('serviceWorker' in navigator) {
        // Путь к файлу serviceWorker
        let serviceWorkerPath = '/MobileSite/js/pwa/sw.js';

        // Путь к данным, которыми будет пользоваться serviceWorker
        let serviceWorkerScope = "../";

        // Регистрация service worker
        navigator.serviceWorker.register(serviceWorkerPath, {scope: serviceWorkerScope})
            .then(
                // Обработка успешного результата регистрации
                (regIsSuccess) => {
                    console.log('Service worker registration succeeded:', registration);
                },
                (regWithError) => {
                    console.error('Service worker registration failed');
                }
            );
    } else {
        console.error('Service workers are not supported.');
    }
}