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

  constructor(private http: HttpLocalService) {
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
    this.http.createCategory(newKategoria);
    this.getDatas();
  }

  remove(category) {
    this.http.deleteCategory(category);
    this.getDatas();
  }

  update(category) {
    this.http.updateCategory(category);
    this.getDatas();
  }

}
