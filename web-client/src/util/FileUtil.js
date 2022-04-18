export function readFileDataAsBase64(file) {
    // return new Promise((resolve, reject) => {
    //     const reader = new FileReader();

    //     reader.onload = (event) => {
    //         let base64String = btoa(new Uint8Array(event.target.result).reduce(function (data, byte) {
    //             return data + String.fromCharCode(byte);
    //         }, ''));
    //         resolve(base64String);
    //     };

    //     reader.onerror = (err) => {
    //         reject(err);
    //     };

    //     reader.readAsArrayBuffer(file);
    // });
    return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = (event) => {
            resolve(event.target.result);
        };

        reader.onerror = (err) => {
            reject(err);
        };

        reader.readAsArrayBuffer(file);
    });
}
