import { Component, OnInit, ViewChild, ViewChildren, QueryList } from "@angular/core";
import { IgxColumnComponent, IgxHierarchicalGridComponent, IgxRowIslandComponent, IgxSnackbarComponent, IgxToastPosition, IgxChipsAreaComponent, IgxLinearProgressBarComponent, IgxTextAlign } from "igniteui-angular";
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
    public numberOfStampted = 0;
    public checkedItems = 0;
    public numberOfAllItems = 0;
    public toastPosition: IgxToastPosition = IgxToastPosition.Middle;

    @ViewChild("hierarchicalGrid")
    private hierarchicalGrid: IgxHierarchicalGridComponent;

    @ViewChild(IgxSnackbarComponent)
    public snackbar: IgxSnackbarComponent;

    @ViewChildren(IgxLinearProgressBarComponent, { read: IgxLinearProgressBarComponent })
    public linearBars: QueryList<IgxLinearProgressBarComponent>;

    public navItems: any[];
    public deletedItems = [];
    public selectedItems = [];
    public num = 0;

    public disable = false;
    public interval: any;
    public positionCenter: IgxTextAlign;
    public positionEnd: IgxTextAlign;






    constructor() {
        this.localdata = SINGERS;
    }

    public ngOnInit() {
        this.positionCenter = IgxTextAlign.CENTER;
        this.positionEnd = IgxTextAlign.END;
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

    public stamp(toast) {

        this.numberOfStampted = 0;

        console.log(JSON.stringify(this.hierarchicalGrid.selectedRows()));
        this.hierarchicalGrid.selectedRows().forEach((data) => {
            const row = this.hierarchicalGrid.getRowByKey(data);
            row.delete();
            this.numberOfStampted = this.numberOfStampted + 1;

        });

        this.linearBars.map((bar) => bar.value += this.numberOfStampted);

        this.checkedItems = + this.numberOfStampted;

        //this.snackbar.show()
        toast.show()

    }

    public handleRowSelectionChange(args) {
        this.selectedItems = this.hierarchicalGrid.selectedRows()


        //args.newSelection = args.oldSelection; // overwrites the new selection, making it so that no new row(s) are entered in the selectionAPI
        //args.checked = true; // overwrites the checkbox state
    }
    public handleRowSelection(event) {
        this.num = this.num + 1;
        const targetCell = event.cell;
        this.selectedItems.push(event.cell)
        if (!this.selection) {
            this.hierarchicalGrid.deselectAllRows();
            this.hierarchicalGrid.selectRows([targetCell.row.rowID]);
        }
    }

    public removeRow() {
        const row = this.hierarchicalGrid.getRowByIndex(1);
        row.delete();
    }

}
