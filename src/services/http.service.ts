class HttpService {
  private readonly api = "http://localhost:3020/api";

  constructor() {}   

  public GetApiUrl(): string {
    return this.api;
  }

  async Post(endpoint: string, data: Object): Promise<any> {
    const url = `${this.api}/${endpoint}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    };
    try {
      const res = await fetch(url, options);
      return await res.json();
    } catch(error) {
      console.error(`${url} POST error! ${error}`);
      return null;
    }
  }

  async Get(endpoint: string): Promise<any> {
    const url = `${this.api}/${endpoint}`;
    try {
      const res = await fetch(url);
      return await res.json();
    } catch(error) {
      console.error(error);
      return null;
    }
  }
}
export const MyHttpService = new HttpService();
