import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { IBlog } from '../../../model/blog';
import { BlogService } from '../../../service/blog';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class ViewBlog {
  oBlog: IBlog | null = null;

  constructor(private oBlogService: BlogService, private route: ActivatedRoute) {
    // Obtener el ID del blog desde la ruta
    const idParam = this.route.snapshot.paramMap.get('id');
    const blogId = idParam ? Number(idParam) : NaN;
    if (isNaN(blogId)) {
      console.error('Invalid blog id:', idParam);
      return;
    }
    this.getBlog(blogId);
  }

  ngOnInit() { }

  getBlog(blogId: number) {
    this.oBlogService.get(blogId).subscribe({
      next: (data: IBlog) => {
        this.oBlog = data;
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching blog:', error);
      },
    });
  }
}
