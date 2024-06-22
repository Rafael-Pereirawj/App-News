
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ApiService } from '../services/api.service';
import { InfiniteScrollCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
})
export class Tab1Page implements OnInit {
  public lista_items: any[] = [];
  public img_base = 'https://agenciadenoticias.ibge.gov.br/';
  public qtd: number = 20;
  public page: number = 1;

  constructor(public apiService: ApiService, private navegacao: NavController) { }

  carregaPagina(qtd: number = 20, page: number = 1) {
    this.apiService.getgNews(qtd, page).subscribe(
      (data: any) => {
        const newItems = data.items.map(item => {
          let imagens = JSON.parse(item.imagens);
          item.imagemUrl = this.img_base + imagens.image_intro;
          return item;
        });
        this.lista_items = [...this.lista_items, ...newItems];
        console.log(`Novos itens carregados: ${newItems.length}`);
      },
      error => {
        console.log(error);
      }
    );
  }

  handleRefresh(event) {
    setTimeout(() => {
      this.lista_items = [];
      this.page = 1;
      this.carregaPagina(this.qtd, this.page);
      event.target.complete();
    }, 2000);
  }

  ngOnInit(): void {
    this.carregaPagina(this.qtd, this.page);
  }

  onIonInfinite(event: InfiniteScrollCustomEvent) {
    this.page++;  // Incrementar a página
    this.carregaPagina(this.qtd, this.page);
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  ionViewDidEnter() {
    this.lista_items = [];
    this.page = 1;
    this.carregaPagina(this.qtd, this.page);
  }
}
