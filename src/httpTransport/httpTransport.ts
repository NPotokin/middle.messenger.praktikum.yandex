export function queryStringify(data: Record<string, unknown>): string {
  if (typeof data !== 'object' || data === null) {
    throw new Error('Data must be an object.');
  }

  const keys = Object.keys(data);
  if (keys.length === 0) {
    return '';
  }

  const queryString = keys
    .map((key) => {
      const value = data[key];
      return `${key}=${value ?? ''}`;
    })
    .join('&');

  return queryString;
}


export enum METHOD {
    Get = 'GET',
    Post = 'POST',
    Put = 'PUT',
    Delete = 'DELETE'
}
type Options = {
    method: METHOD;
    data?: Record<string, unknown>;
    headers?: Record<string, string>
};

type OptionsWithoutMethod = Omit<Options, 'method'>;

export default class HTTPTransport {
  get(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.Get });
  }

  post(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.Post });
  }

  put(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.Put });
  }

  delete(url: string, options: OptionsWithoutMethod = {}): Promise<XMLHttpRequest> {
    return this.request(url, { ...options, method: METHOD.Delete });
  }

  request(url: string, options: Options = { method: METHOD.Get }): Promise<XMLHttpRequest> {
    const { method, headers, data } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();

      if (method === METHOD.Get && data) {
        url = `${url}?${queryStringify(data)}`;
      }

      if (headers){
        Object.keys(headers).forEach(key => {
          xhr.setRequestHeader(key, headers[key])
        })
      }

      xhr.open(method, url);

      xhr.onload = function () {
        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === METHOD.Get || !data) {
        xhr.send();
      } else {
        xhr.send(JSON.stringify(data));
      }
    });
  }
}
