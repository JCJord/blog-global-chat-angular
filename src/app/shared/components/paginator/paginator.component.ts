import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent {
  @Input() current_page!: number;

  @Input() last_page!: number;
  
  pages: number[] = [];

  @Output() selectedPage = new EventEmitter<number>();

  ngAfterViewInit() {
    this.loadPaginator();
  }

  loadPaginator() {
    for(let i = 0; i<this.last_page; i++){
      this.pages.push(i);
    }
  }

  selectPage(page: number) {
    console.log(this.current_page)
    this.current_page = page;
    this.selectedPage.emit(page);
  }

  isLastPage() {
    return (this.current_page + 1) == this.pages.length;
  }

  isFirstPage() {
    return this.current_page == 0;
  }
}
