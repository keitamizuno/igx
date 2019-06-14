import { Component, OnInit, ViewChild } from "@angular/core";
import { IgxColumnComponent, IgxHierarchicalGridComponent, IgxRowIslandComponent, IgxSnackbarComponent } from "igniteui-angular";
import { SINGERS } from "../data";

@Component({
    selector: "hierarchical-grid-resizing",
    styleUrls: ["./hierarchical-grid-resizing.component.scss"],
    templateUrl: "hierarchical-grid-resizing.component.html"
})

export class HGridColumnResizingSampleComponent implements OnInit {
    public selection = true;
    public localdata;
    public col: IgxColumnComponent;
    public pWidth: string;
    public nWidth: string;

    @ViewChild("hierarchicalGrid")
    private hierarchicalGrid: IgxHierarchicalGridComponent;

    @ViewChild(IgxSnackbarComponent)
    public snackbar: IgxSnackbarComponent;
    public navItems: any[];
    public deletedItems = [];
    public selectedItems: any[];

    
    
    
    

    constructor() {
        this.localdata = SINGERS;
    }

    public ngOnInit() {
        // this.navItems = [{
        //   avatar: "https://jp.infragistics.com/angular-demos/assets/images/avatar/2.jpg",
        //   text: "Richard Mahoney"
        // },
        // {
        //   avatar: "https://jp.infragistics.com/angular-demos/assets/images/avatar/4.jpg",
        //   text: "Lisa Landers"
        // },
        // {
        //   avatar: "https://jp.infragistics.com/angular-demos/assets/images/avatar/14.jpg",
        //   text: "Marianne Taylor"
        // }, {
        //   avatar: "https://jp.infragistics.com/angular-demos/assets/images/avatar/17.jpg",
        //   text: "Ward Riley"
        // }];
      }

    public onResize(event) {
        this.col = event.column;
        this.pWidth = event.prevWidth;
        this.nWidth = event.newWidth;
    }

    public delete(item) {
        this.deletedItems.push([item, this.localdata.indexOf(item)]);
        this.localdata.splice(this.localdata.indexOf(item), 1);
        this.snackbar.show();
      }
    
      public restore() {
        const [item, index] = this.deletedItems.pop();
        this.localdata.splice(index, 0, item);
        this.snackbar.hide();
      }

      public handleRowSelection(event) {
        this.selectedItems = this.hierarchicalGrid.selectedRows();
        const targetCell = event.cell;
        if (!this.selection) {
            this.hGrid.deselectAllRows();
            this.hGrid.selectRows([targetCell.row.rowID]);
        }
    }

}
