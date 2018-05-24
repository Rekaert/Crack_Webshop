import { Component, OnInit } from '@angular/core';
import { HttpLocalService } from '../http.service';

@Component({
  selector: 'app-kategoriak',
  templateUrl: './kategoriak.component.html',
  styleUrls: ['./kategoriak.component.css']
})
export class KategoriakComponent implements OnInit {

  kategoriak: any = [];
  newKategoria: Object = {
    name: '',
    imgLink: '',
    rank: ''
  };

  constructor(public http: HttpLocalService) {
    this.getDatas();
  }

  getDatas() {
    this.http.getCategories();
    setTimeout(() => {
      this.kategoriak = this.http.categories;
    }, 200);
  }

  ngOnInit() {
  }

  create(newKategoria) {
    newKategoria.rank = parseInt(newKategoria.rank);
    this.http.createCategory(newKategoria);
    this.getDatas();
  }

  remove(category) {

    this.http.deleteCategory(category);
    this.getDatas();
  }

  update(category) {
    category.rank = parseInt(category.rank);
    this.http.updateCategory(category);
    this.getDatas();
  }

}
