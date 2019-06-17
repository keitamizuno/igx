import { Component, OnInit, ViewChild, ViewChildren, QueryList, Inject, OnDestroy } from "@angular/core";
import { Subject } from "rxjs";
import { filter, takeUntil } from "rxjs/operators";
import { IgxColumnComponent, IgxHierarchicalGridComponent, IgxRowIslandComponent, IgxSnackbarComponent, IgxToastPosition, IgxChipsAreaComponent, IgxLinearProgressBarComponent, IgxTextAlign, IgxOverlayService } from "igniteui-angular";
import { SINGERS } from "../data";
import { CardSample1Component } from "../../layouts/card/card-sample-1/card-sample-1.component";

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
    public numberOfAllItems = 20;
    public checkItemsAndNumberOfAllItems = this.checkedItems + ' / ' + this.numberOfAllItems;
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

        // if (!this._overlayId) {
        //     this._overlayId = this.overlayService.attach(CardSample1Component);
        // }

        // this.overlayService.show(this._overlayId);

        //     // ローディング開始
        //     this.spinner.attach(new ComponentPortal(MatSpinner));
        //     setTimeout(() => {
        //       // ローディング終了
        //       this.spinner.detach();
        //     }, 3000);

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
        this.checkedItems = this.checkedItems + this.numberOfStampted;
        this.checkItemsAndNumberOfAllItems = this.checkedItems + ' / ' + this.numberOfAllItems;
        toast.show()

    }

    public handleRowSelectionChange(args) {
        this.selectedItems = this.hierarchicalGrid.selectedRows()

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
// export class OverlaySampleMain1Component implements OnDestroy {
//     private destroy$ = new Subject<boolean>();
//     private _overlayId: string;

//     constructor(
//         @Inject(IgxOverlayService) public overlayService: IgxOverlayService
//     ) {
//         //  overlay service deletes the id when onClosed is called. We should clear our id
//         //  also in same event
//         this.overlayService
//             .onClosed
//             .pipe(
//                 filter((x) => x.id === this._overlayId),
//                 takeUntil(this.destroy$))
//             .subscribe(() => delete this._overlayId);
//     }

//     public showOverlay() {
//         if (!this._overlayId) {
//             this._overlayId = this.overlayService.attach(CardSample1Component);
//         }

//         this.overlayService.show(this._overlayId);
//     }

//     public ngOnDestroy() {
//         this.destroy$.next(true);
//         this.destroy$.complete();
//     }
// }

