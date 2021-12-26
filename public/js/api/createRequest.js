/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
    const xhr = new XMLHttpRequest;
    try {
        console.log(options);
        if (options.method !== 'GET') {
            xhr.open(options.method, options.url);
            const formData = new FormData();
            formData.append('name', options.data.name);
            formData.append('email', options.data.eamil);
            formData.append('password', options.data.password);
            xhr.send(formData);
            xhr.responseType = 'json';
            options.callback(options.err, options.success);
        }
    }
    catch (err) {
        options.callback(err);
    }
}
