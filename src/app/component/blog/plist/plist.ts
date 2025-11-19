import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IPage } from '../../../model/plist';
import { IBlog } from '../../../model/blog';
import { BlogService } from '../../../service/blog';
import { neighborhood } from '../../../environment/environment';
import { Paginacion } from "../../shared/paginacion/paginacion";

@Component({
  selector: 'app-plist',
  imports: [RouterLink, Paginacion],
  templateUrl: './plist.html',
  styleUrl: './plist.css',
})
export class PlistBlog {
  oPage: IPage<IBlog> | null = null;
  numPage: number = 0;
  numRpp: number = 5;
  neighborhood = neighborhood;

  constructor(private oBlogService: BlogService) { }

  oBotonera: string[] = [];

  ngOnInit() {
    this.getPage();
  }

  getPage() {
    this.oBlogService.getPage(this.numPage, this.numRpp).subscribe({
      next: (data: IPage<IBlog>) => {
        this.oPage = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error(error);
      },
    });
  }

  goToPage(numPage: number) {
    this.numPage = numPage;
    this.getPage();
    return false;
  }
}
