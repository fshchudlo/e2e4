var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { SimpleList } from './simpleList';
import { PagedPager } from './pagedPager';
import { Utility } from './common/utility';
import { Defaults } from './common/defaults';
import { filter } from './filterAnnotation';
export class PagedList extends SimpleList {
    constructor(stateManager) {
        super(stateManager, new PagedPager());
        this.pageSizeInternal = Defaults.pagedListSettings.defaultPageSize;
        this.pageNumberInternal = 1;
        this.displayFrom = 1;
        this.displayTo = 1;
        this.pagedLoadDataSuccessBinded = this.pagedLoadDataSuccessCallback.bind(this);
    }
    pagedLoadDataSuccessCallback(result) {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.displayFrom = result[Defaults.pagedListSettings.displayFromParameterName] || 1;
        this.displayTo = result[Defaults.pagedListSettings.displayToParameterName] || 1;
        return result;
    }
    dispose() {
        super.dispose();
        delete this.pagedLoadDataSuccessBinded;
    }
    get pageCount() {
        return Math.ceil(this.totalCount / this.pageSizeInternal);
    }
    get pageNumber() {
        return this.pageNumberInternal;
    }
    set pageNumber(value) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageNumber = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : 1;
        if (pageNumber > this.pageCount) {
            pageNumber = this.pageCount;
        }
        if (pageNumber < 1) {
            pageNumber = 1;
        }
        this.pageNumberInternal = pageNumber;
    }
    get pageSize() {
        return this.pageSizeInternal;
    }
    set pageSize(value) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let pageSize = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : Defaults.pagedListSettings.defaultPageSize;
        if (pageSize > Defaults.pagedListSettings.maxPageSize) {
            pageSize = Defaults.pagedListSettings.maxPageSize;
        }
        if (this.totalCount !== 0) {
            if (pageSize > this.totalCount) {
                pageSize = this.totalCount;
            }
            if (this.pageNumber * pageSize > this.totalCount) {
                pageSize = Math.ceil(this.totalCount / this.pageNumber);
                if (pageSize > Defaults.pagedListSettings.maxPageSize) {
                    pageSize = Defaults.pagedListSettings.maxPageSize;
                }
            }
        }
        if (pageSize < Defaults.pagedListSettings.minPageSize || pageSize === 0) {
            pageSize = Defaults.pagedListSettings.defaultPageSize;
        }
        if (this.pageNumber === this.pageCount && pageSize > this.pageSizeInternal) {
            pageSize = this.pageSizeInternal;
        }
        this.pageSizeInternal = pageSize;
    }
    loadData() {
        const promise = super.loadData.call(this, ...Array.prototype.slice.call(arguments));
        Utility.disposeAll(this.items);
        promise.then(this.pagedLoadDataSuccessBinded);
        return promise;
    }
    clearData() {
        super.clearData();
        this.pageNumber = 1;
        this.pageSize = Defaults.pagedListSettings.defaultPageSize;
    }
    goToFirstPage() {
        if (this.pageNumber > 1) {
            this.pageNumber = 1;
            this.loadData();
        }
    }
    goToPreviousPage() {
        if (this.pageNumber > 1) {
            this.pageNumber -= 1;
            this.loadData();
        }
    }
    goToNextPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber += 1;
            this.loadData();
        }
    }
    goToLastPage() {
        if (this.pageNumber < this.pageCount) {
            this.pageNumber = this.pageCount;
            this.loadData();
        }
    }
}
__decorate([
    filter({ defaultValue: 1, parameterName: Defaults.pagedListSettings.pageNumberParameterName }), 
    __metadata('design:type', Number)
], PagedList.prototype, "pageNumber", null);
__decorate([
    filter({
        defaultValue: Defaults.pagedListSettings.defaultPageSize,
        parameterName: Defaults.pagedListSettings.pageSizeParameterName,
        persisted: Defaults.pagedListSettings.persistPageSize
    }), 
    __metadata('design:type', Number)
], PagedList.prototype, "pageSize", null);

//# sourceMappingURL=data:application/json;base64,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RSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsSUFBSSxDQUFDLENBQUM7WUFDckIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBQ0QsWUFBWTtRQUNSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDO1lBQ2pDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNwQixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUF0Rkc7SUFBQyxNQUFNLENBQUMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxFQUFFLGFBQWEsRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsdUJBQXVCLEVBQW1CLENBQUM7OzJDQUFBO0FBZWhIO0lBQUMsTUFBTSxDQUFDO1FBQ0osWUFBWSxFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsQ0FBQyxlQUFlO1FBQ3hELGFBQWEsRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMscUJBQXFCO1FBQy9ELFNBQVMsRUFBRSxRQUFRLENBQUMsaUJBQWlCLENBQUMsZUFBZTtLQUN4RCxDQUFDOzt5Q0FBQTtBQW1FTCIsImZpbGUiOiJwYWdlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1NpbXBsZUxpc3R9IGZyb20gJy4vc2ltcGxlTGlzdCc7XHJcbmltcG9ydCB7UGFnZWRQYWdlcn0gZnJvbSAnLi9wYWdlZFBhZ2VyJztcclxuaW1wb3J0IHtVdGlsaXR5fSBmcm9tICcuL2NvbW1vbi91dGlsaXR5JztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAnLi9maWx0ZXJBbm5vdGF0aW9uJztcclxuaW1wb3J0IHtJRmlsdGVyQ29uZmlnfSBmcm9tICcuL2NvbnRyYWN0cy9JRmlsdGVyQ29uZmlnJztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuXHJcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBQYWdlZExpc3QgZXh0ZW5kcyBTaW1wbGVMaXN0IHtcclxuICAgIHByaXZhdGUgcGFnZVNpemVJbnRlcm5hbCA9IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZTtcclxuICAgIHByaXZhdGUgcGFnZU51bWJlckludGVybmFsID0gMTtcclxuICAgIHByaXZhdGUgcGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBwYWdlZExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrKHJlc3VsdDogT2JqZWN0KTogT2JqZWN0IHtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdO1xyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MudG90YWxDb3VudFBhcmFtZXRlck5hbWVdIHx8IDA7XHJcblxyXG4gICAgICAgIHRoaXMuZGlzcGxheUZyb20gPSByZXN1bHRbRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGlzcGxheUZyb21QYXJhbWV0ZXJOYW1lXSB8fCAxO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheVRvID0gcmVzdWx0W0RlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRpc3BsYXlUb1BhcmFtZXRlck5hbWVdIHx8IDE7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIGRpc3BsYXlGcm9tID0gMTtcclxuICAgIGRpc3BsYXlUbyA9IDE7XHJcblxyXG4gICAgY29uc3RydWN0b3Ioc3RhdGVNYW5hZ2VyOiBJU3RhdGVNYW5hZ2VyKSB7XHJcbiAgICAgICAgc3VwZXIoc3RhdGVNYW5hZ2VyLCBuZXcgUGFnZWRQYWdlcigpKTtcclxuICAgICAgICB0aGlzLnBhZ2VkTG9hZERhdGFTdWNjZXNzQmluZGVkID0gdGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMucGFnZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0IHBhZ2VDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwodGhpcy50b3RhbENvdW50IC8gdGhpcy5wYWdlU2l6ZUludGVybmFsKTtcclxuICAgIH1cclxuICAgIEBmaWx0ZXIoeyBkZWZhdWx0VmFsdWU6IDEsIHBhcmFtZXRlck5hbWU6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLnBhZ2VOdW1iZXJQYXJhbWV0ZXJOYW1lIH0gYXMgSUZpbHRlckNvbmZpZylcclxuICAgIGdldCBwYWdlTnVtYmVyKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZU51bWJlckludGVybmFsO1xyXG4gICAgfVxyXG4gICAgc2V0IHBhZ2VOdW1iZXIodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGNvbnN0IHZhbHVlU3RyID0gKHZhbHVlICsgJycpLnJlcGxhY2UoL1teMC05XS9nLCAnJyk7XHJcbiAgICAgICAgbGV0IHBhZ2VOdW1iZXIgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IDE7XHJcbiAgICAgICAgaWYgKHBhZ2VOdW1iZXIgPiB0aGlzLnBhZ2VDb3VudCkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gdGhpcy5wYWdlQ291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYWdlTnVtYmVyIDwgMSkge1xyXG4gICAgICAgICAgICBwYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVySW50ZXJuYWwgPSBwYWdlTnVtYmVyO1xyXG4gICAgfVxyXG4gICAgQGZpbHRlcih7XHJcbiAgICAgICAgZGVmYXVsdFZhbHVlOiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemUsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGFnZVNpemVQYXJhbWV0ZXJOYW1lLFxyXG4gICAgICAgIHBlcnNpc3RlZDogRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MucGVyc2lzdFBhZ2VTaXplXHJcbiAgICB9KVxyXG4gICAgZ2V0IHBhZ2VTaXplKCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZVNpemVJbnRlcm5hbDtcclxuICAgIH1cclxuICAgIHNldCBwYWdlU2l6ZSh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcGFnZVNpemUgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLnBhZ2VkTGlzdFNldHRpbmdzLmRlZmF1bHRQYWdlU2l6ZTtcclxuXHJcbiAgICAgICAgaWYgKHBhZ2VTaXplID4gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemUpIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5tYXhQYWdlU2l6ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudG90YWxDb3VudCAhPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAocGFnZVNpemUgPiB0aGlzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gdGhpcy50b3RhbENvdW50O1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyICogcGFnZVNpemUgPiB0aGlzLnRvdGFsQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gTWF0aC5jZWlsKHRoaXMudG90YWxDb3VudCAvIHRoaXMucGFnZU51bWJlcik7XHJcbiAgICAgICAgICAgICAgICBpZiAocGFnZVNpemUgPiBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5tYXhQYWdlU2l6ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWF4UGFnZVNpemU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHBhZ2VTaXplIDwgRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MubWluUGFnZVNpemUgfHwgcGFnZVNpemUgPT09IDApIHtcclxuICAgICAgICAgICAgcGFnZVNpemUgPSBEZWZhdWx0cy5wYWdlZExpc3RTZXR0aW5ncy5kZWZhdWx0UGFnZVNpemU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnBhZ2VOdW1iZXIgPT09IHRoaXMucGFnZUNvdW50ICYmIHBhZ2VTaXplID4gdGhpcy5wYWdlU2l6ZUludGVybmFsKSB7XHJcbiAgICAgICAgICAgIHBhZ2VTaXplID0gdGhpcy5wYWdlU2l6ZUludGVybmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnBhZ2VTaXplSW50ZXJuYWwgPSBwYWdlU2l6ZTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGNvbnN0IHByb21pc2UgPSBzdXBlci5sb2FkRGF0YS5jYWxsKHRoaXMsIC4uLkFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cykpO1xyXG4gICAgICAgIFV0aWxpdHkuZGlzcG9zZUFsbCh0aGlzLml0ZW1zKTtcclxuICAgICAgICBwcm9taXNlLnRoZW4odGhpcy5wYWdlZExvYWREYXRhU3VjY2Vzc0JpbmRlZCk7XHJcbiAgICAgICAgcmV0dXJuIHByb21pc2U7XHJcbiAgICB9XHJcbiAgICBjbGVhckRhdGEoKTogdm9pZCB7XHJcbiAgICAgICAgc3VwZXIuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgdGhpcy5wYWdlTnVtYmVyID0gMTtcclxuICAgICAgICB0aGlzLnBhZ2VTaXplID0gRGVmYXVsdHMucGFnZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFBhZ2VTaXplO1xyXG4gICAgfVxyXG4gICAgZ29Ub0ZpcnN0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgPSAxO1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgZ29Ub1ByZXZpb3VzUGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyID4gMSkge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VOdW1iZXIgLT0gMTtcclxuICAgICAgICAgICAgdGhpcy5sb2FkRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdvVG9OZXh0UGFnZSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlTnVtYmVyIDwgdGhpcy5wYWdlQ291bnQpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlTnVtYmVyICs9IDE7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnb1RvTGFzdFBhZ2UoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZU51bWJlciA8IHRoaXMucGFnZUNvdW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZU51bWJlciA9IHRoaXMucGFnZUNvdW50O1xyXG4gICAgICAgICAgICB0aGlzLmxvYWREYXRhKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
