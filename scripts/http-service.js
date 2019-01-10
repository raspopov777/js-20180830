// const API_URL = 'https://raspopov777.github.io/js-20180830';
const API_URL = 'http://localhost:3000';


const HttpService = {
  sendRequest(url)  {
      return new Promise((resolve, reject) => {
          let method = 'GET';
          let xhr = new XMLHttpRequest();

          xhr.open(method, `${API_URL}/${url}`, true);

          xhr.send();

          xhr.onload = () => {
              if(xhr.status !== 200) {
                  reject(xhr.status + ': ' + xhr.statusText);
              } else {
                  let data = JSON.parse(xhr.responseText);
                  resolve(data);
              }
          }
      })
  }
};

export default HttpService;