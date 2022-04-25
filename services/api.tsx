class API {
  headers = {
    'Content-Type': 'application/json',
  };

  base: string = `${process.env.NEXT_PUBLIC_API_URL}/api/`;

  async request (method, path, data) {
    let url = this.base + path;

    let json = null;

    if (data && method === 'GET') {
      url += `?${Object.keys(data).map((key) => data && `${key}=${data[key]}`).join('&')}`;
    }

    try {
      const res = await fetch(url, {
        body: method === 'GET' ? undefined : JSON.stringify(data),
        headers: this.headers,
        method,
      });

      json = await res.json();
    } catch (e) {
      json = {
        errors: [e.message],
      };
    }

    return json;
  }

  get = this.request.bind(this, 'GET');
  put = this.request.bind(this, 'PUT');
  post = this.request.bind(this, 'POST');
  patch = this.request.bind(this, 'PATCH');
  delete = this.request.bind(this, 'DELETE');

  getProjects () {
    return this.get('projects')
  }
}

export default new API();
