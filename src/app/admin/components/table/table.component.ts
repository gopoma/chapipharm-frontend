import { Component, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Product } from 'src/app/models/product.interface';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit, AfterViewInit {
  dataSource:any = null;
  displayedColumns: string[] = ['id','name','laboratory','stock','price','options'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    this.productService.getAll().subscribe({
      next: (resp:any) => {
        this.dataSource = new MatTableDataSource<Product>(resp.products);
        this.dataSource.paginator = this.paginator;
      },
    });
  }
}
