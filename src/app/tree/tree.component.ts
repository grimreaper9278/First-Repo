import {
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
  ViewChildren,
  HostListener,
  QueryList,
} from '@angular/core';
import { Tree } from '../tree';
import { TreeService } from '../tree.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.css'],
})
export class TreeComponent {
  @ViewChildren('list') listlist!: QueryList<ElementRef>;

  list: any[] = [];

  constructor(
    private treeService: TreeService,
    private router: Router,

    private renderer: Renderer2
  ) {
    this.renderer.listen('window', 'click', (e: Event) => {
      if (this.lists.length > 1) {
        this.listlist.forEach((list: ElementRef) =>
          this.list.push(list.nativeElement)
        );

        if (!this.list.includes(e.target)) {
          this.lists.splice(1);
          this.selectedId.splice(0)
          console.log(this.lists);
        }
      }
    });
  }
  @Input() data!: Tree;
  lists: any[] = [];
  dataBase: any = { categories: [] };
  ngOnInit() {
    this.getData();
  }

  selectedId: any[] = [];
  selectedTitle: any[] = [];
  getNext(tree: any, branch: any, id: number, title: string) {
    if (this.lists[tree][branch].children.length > 0) {
      this.lists[tree + 1] = this.lists[tree][branch].children;
    }else{
      this.lists.splice(tree+1)
    }
    this.selectedId[tree] = id;
    this.selectedTitle[tree] = title;
    for (let i = 0; i <= this.lists.length; i++) {
      this.lists.splice(tree + 2);
      this.selectedId.splice(tree + i + 1);
      this.selectedTitle.splice(tree + i + 1);
      console.log(this.selectedId);
      console.log(this.selectedTitle);
    }
    /////
  }
      // for (let i = 0; i <= this.lists.length; i++){
    //   if (i > this.selectedId.length){
    //     this.lists.splice(i)
    //     this.selectedId.splice(i)
    //   }
    //   console.log(this.lists.length)
    //   console.log(this.selectedId)
    // }

  // getData(){
  //   this.treeService.getData().subscribe(
  //     (data) =>{this.dataBase = data},
  //     ()=>{},
  //     ()=> {this.lists[0] = this.dataBase.categories; console.log(this.lists)}
  //     )
  //   }
  getData() {
    this.treeService.getData().subscribe(
      (data) => {
        this.lists[0] = data;
      },
      () => {},
      () => {}
    );
  }
}
