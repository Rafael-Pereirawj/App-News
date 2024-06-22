import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://servicodados.ibge.gov.br/api/v3/noticias';

  constructor(private http: HttpClient) { }

  public getgNews(qtd: number = 20, page: number = 1) {
    const url = `${this.baseUrl}?qtd=${qtd}&page=${page}`;
    return this.http.get(url);
  }
}
