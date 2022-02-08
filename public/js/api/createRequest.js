/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    if (options.data) {
        const xhr = new XMLHttpRequest;
        let formData = new FormData();
        let sendURL = options.url;
        if (options.method !== 'GET') {
            console.log('options.data !GET: ', options.data);
            Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        }
        else {
            sendURL += '?';
            for (let prop in options.data) {
                sendURL += `${prop}=${options.data.prop}&`
            }
            sendURL = sendURL.slice(0, -1);
            formData = '';
        }
        try {
            xhr.open(options.method, sendURL);
            xhr.send(formData);       
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
