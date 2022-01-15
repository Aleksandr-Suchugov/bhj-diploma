/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    let sendData;
    let type = 0;
    console.log('options: ', options);
    if (options.method !== 'GET') {
        const formData = new FormData();
        console.log('options.data: ', options.data);
        Object.entries(options.data).forEach(([key, value]) => formData.append(key, value));
        sendData = formData;
    }
    else {
        sendData = `${options.url}?mail=${options.data.email}&password=${options.data.password}`;
        type = 1;
    }
    try {
        switch (type) {
            case 0:
                xhr.open(options.method, options.url);
                xhr.send(sendData);
            break;
            case 1:
                xhr.open(options.method, sendData);
                xhr.send();
            break;
        }
        xhr.responseType = 'json';
        xhr.addEventListener('readystatechange', function() {
            if (xhr.status === 200 && xhr.readyState === xhr.DONE) {           
                options.callback(err = null, xhr.response);       
            }
        });
    }
    catch (err) {
        options.callback(err, response = null);
    }
}
