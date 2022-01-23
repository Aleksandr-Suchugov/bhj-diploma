/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    let sendDataURL = options.url;
    console.log('options: ', options);
    if (options.method !== 'GET') {
        const formData = new FormData();
        console.log('options.data: ', options.data);
        Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        sendDataURL = formData;
    }
    else {
        Object.entries(options.data).forEach(([key, value]) => sendDataURL = sendDataURL + value);
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
