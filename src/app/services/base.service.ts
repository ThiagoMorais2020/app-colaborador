import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';

export class BaseService<T> {
    private hostname = 'http://localhost';
    private port = 3000;
    protected fullUrl: string;
    protected headers = new HttpHeaders();
    protected parameters: HttpParams = new HttpParams();

    constructor(protected http: HttpClient, path: string) {
        this.fullUrl = `${this.hostname}:${this.port}/${path}`;
    }

    public addParameter(key: string, value: string): void {
        this.parameters = this.parameters.append(key, value);
    }

    public removeParameter(key: string): void {
        this.parameters = this.parameters.delete(key);
    }

    public hasParameter(key: string): boolean {
        return this.parameters.has(key);
    }

    protected addOptions(parameters?: HttpParams): any {
        const httpOptions = {};

        httpOptions['headers'] = this.headers;

        if (parameters) {
            httpOptions['params'] = parameters;
        }

        return httpOptions;
    }

    public getAll(): any {
        return this.http
            .get<T>(this.fullUrl, this.addOptions(this.parameters));
    }

    public getById(id: number): any {
        return this.http
            .get<T>(`${this.fullUrl}/${id}`, this.addOptions(this.parameters));
    }

    public create(data: T) {
        return this.http.post<T>(this.fullUrl, data);
    }

    public update(data: T, id: number | string) {
        return this.http.put(`${this.fullUrl}/${id}`, data);
    }

    public delete(id: number | string) {
        return this.http
            .delete(`${this.fullUrl}/${id}`, this.addOptions(this.parameters));
    }
}
