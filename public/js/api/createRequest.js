/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if (options.data) {
        const xhr = new XMLHttpRequest;
        let sendDataURL = options.url + '?';
        console.log('createRequest options: ', options);
        if (options.method !== 'GET') {
            const formData = new FormData();
            console.log('options.data: ', options.data);
            Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
            sendDataURL = formData;
        }
        else {
            Object.entries(options.data).forEach(([key, value]) => sendDataURL += `${key}=${value}&`).slice(0, -1);
        }
        console.log('createRequest URL: ', sendDataURL);
        try {
            xhr.open(options.method, sendDataURL);
            xhr.send();       
        }
        catch (err) {
            options.callback(err, null);
        }
        xhr.responseType = 'json';
        xhr.addEventListener('readystatechange', function() {
            if (xhr.status === 200 && xhr.readyState === xhr.DONE) {           
                options.callback(null, xhr.response);       
            }
        });
    }
}
