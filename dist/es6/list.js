import { Defaults } from './common/defaults';
import { Utility } from './common/utility';
import { SelectionManager } from './selectionManager';
import { FilterManager } from './filterManager';
import { ProgressState } from './common/progressState';
import { SortManager } from './sortManager';
export class List {
    constructor(stateManager) {
        this.disposed = false;
        this.inited = false;
        this.state = null;
        ///IList
        this.items = [];
        this.totalCount = 0;
        this.loadedCount = 0;
        ///IRequestCanceller
        ///IObjectWithState
        this.useModelState = true;
        this.stateManager = stateManager;
        SelectionManager.includeIn(this, 'items');
        FilterManager.includeIn(this);
        SortManager.includeIn(this);
        this.filterManager.registerFilterTarget(this.sortManager);
        this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
        this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
    }
    listLoadDataSuccessCallback(result) {
        this.loadedCount = result[Defaults.listSettings.loadedCountParameterName];
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.state = ProgressState.Done;
        return result;
    }
    listLoadDataFailCallback() {
        this.state = ProgressState.Fail;
    }
    clearDataInternal() {
        this.totalCount = 0;
        this.selectionManager.deselectAll();
        Utility.disposeAll(this.items);
    }
    get busy() {
        return this.state === ProgressState.Progress;
    }
    get ready() {
        return this.state !== ProgressState.Progress;
    }
    init(queryParams) {
        this.inited = true;
        const restoredState = this.getRestoredState(queryParams);
        this.filterManager.parseParams(restoredState);
    }
    dispose() {
        this.disposed = true;
        delete this.listLoadDataSuccessBinded;
        delete this.listLoadDataFailBinded;
        this.clearDataInternal();
        this.sortManager.dispose();
        this.filterManager.dispose();
        this.selectionManager.dispose();
    }
    onSortChangesCompleted() {
        if (this.ready) {
            this.clearDataInternal();
            this.loadData();
        }
    }
    toRequest() {
        return this.filterManager.buildRequest(null);
    }
    getLocalState() {
        return this.filterManager.buildPersistedState(null);
    }
    loadData() {
        if (!this.inited) {
            throw new Error('loadData can be called only after activation.');
        }
        this.totalCount = 0;
        this.state = ProgressState.Progress;
        const promise = this.getDataReadPromise();
        this.addToCancellationSequence(promise);
        promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
        if (this.useModelState) {
            this.saveRequestState();
            this.saveLocalState();
        }
        return promise;
    }
    clearData() {
        this.clearDataInternal();
    }
    reloadData() {
        if (this.ready) {
            this.clearData();
            this.loadData();
        }
    }
    ///IList
    ///IRequestCanceller
    addToCancellationSequence(promise) { }
    ;
    cancelRequests() { }
    ;
    saveRequestState() {
        this.stateManager.flushRequestState(this.toRequest());
    }
    ;
    saveLocalState() {
        this.stateManager.persistLocalState(this.getLocalState());
    }
    ;
    getRestoredState(params) {
        if (this.useModelState === false) {
            return params;
        }
        return this.stateManager.mergeStates(params);
    }
}

//# sourceMappingURL=data:application/json;base64,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Q0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUMxQixDQUFDO1FBQ0QsTUFBTSxDQUFDLE9BQU8sQ0FBQztJQUNuQixDQUFDO0lBQ0QsU0FBUztRQUNMLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzdCLENBQUM7SUFDRCxVQUFVO1FBQ04sRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7WUFDakIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3BCLENBQUM7SUFDTCxDQUFDO0lBQ0QsUUFBUTtJQUVSLG9CQUFvQjtJQUNwQix5QkFBeUIsQ0FBQyxPQUF3QixJQUFVLENBQUM7O0lBQzdELGNBQWMsS0FBVyxDQUFDOztJQUsxQixnQkFBZ0I7UUFDWixJQUFJLENBQUMsWUFBWSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO0lBQzFELENBQUM7O0lBQ0QsY0FBYztRQUNWLElBQUksQ0FBQyxZQUFZLENBQUMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQzs7SUFDTyxnQkFBZ0IsQ0FBQyxNQUFjO1FBQ25DLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUMvQixNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ2xCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUM7SUFDakQsQ0FBQztBQU1MLENBQUM7QUFBQSIsImZpbGUiOiJsaXN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge1V0aWxpdHl9IGZyb20gJy4vY29tbW9uL3V0aWxpdHknO1xyXG5pbXBvcnQge1NlbGVjdGlvbk1hbmFnZXJ9IGZyb20gJy4vc2VsZWN0aW9uTWFuYWdlcic7XHJcbmltcG9ydCB7RmlsdGVyTWFuYWdlcn0gZnJvbSAnLi9maWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL2NvbW1vbi9wcm9ncmVzc1N0YXRlJztcclxuaW1wb3J0IHtJU3RhdGVNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU3RhdGVNYW5hZ2VyJztcclxuaW1wb3J0IHtJTGlzdH0gZnJvbSAnLi9jb250cmFjdHMvSUxpc3QnO1xyXG5pbXBvcnQge0lTb3J0TWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNvcnRNYW5hZ2VyJztcclxuaW1wb3J0IHtTb3J0TWFuYWdlcn0gZnJvbSAnLi9zb3J0TWFuYWdlcic7XHJcbmltcG9ydCB7SUZpbHRlck1hbmFnZXJ9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJNYW5hZ2VyJztcclxuaW1wb3J0IHtJU2VsZWN0aW9uTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVNlbGVjdGlvbk1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIExpc3QgaW1wbGVtZW50cyBJTGlzdCB7XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NDYWxsYmFjayhyZXN1bHQ6IE9iamVjdCk6IE9iamVjdCB7XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbGlzdExvYWREYXRhRmFpbENhbGxiYWNrKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSBQcm9ncmVzc1N0YXRlLkZhaWw7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ6IChyZXN1bHQ6IE9iamVjdCkgPT4gT2JqZWN0O1xyXG4gICAgcHJpdmF0ZSBsaXN0TG9hZERhdGFGYWlsQmluZGVkOiAoZXJyb3I6IE9iamVjdCkgPT4gdm9pZDtcclxuICAgIHByaXZhdGUgY2xlYXJEYXRhSW50ZXJuYWwoKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gMDtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICBVdGlsaXR5LmRpc3Bvc2VBbGwodGhpcy5pdGVtcyk7XHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3RvcihzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXIpIHtcclxuICAgICAgICB0aGlzLnN0YXRlTWFuYWdlciA9IHN0YXRlTWFuYWdlcjtcclxuICAgICAgICBTZWxlY3Rpb25NYW5hZ2VyLmluY2x1ZGVJbih0aGlzLCAnaXRlbXMnKTtcclxuICAgICAgICBGaWx0ZXJNYW5hZ2VyLmluY2x1ZGVJbih0aGlzKTtcclxuICAgICAgICBTb3J0TWFuYWdlci5pbmNsdWRlSW4odGhpcyk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLnJlZ2lzdGVyRmlsdGVyVGFyZ2V0KHRoaXMuc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0JpbmRlZCA9IHRoaXMubGlzdExvYWREYXRhU3VjY2Vzc0NhbGxiYWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5saXN0TG9hZERhdGFGYWlsQmluZGVkID0gdGhpcy5saXN0TG9hZERhdGFGYWlsQ2FsbGJhY2suYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGRpc3Bvc2VkID0gZmFsc2U7XHJcbiAgICBpbml0ZWQgPSBmYWxzZTtcclxuICAgIHN0YXRlOiBQcm9ncmVzc1N0YXRlID0gbnVsbDtcclxuXHJcbiAgICBnZXQgYnVzeSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5zdGF0ZSA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgIH1cclxuXHJcbiAgICBnZXQgcmVhZHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RhdGUgIT09IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdChxdWVyeVBhcmFtcz86IE9iamVjdCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuaW5pdGVkID0gdHJ1ZTtcclxuICAgICAgICBjb25zdCByZXN0b3JlZFN0YXRlID0gdGhpcy5nZXRSZXN0b3JlZFN0YXRlKHF1ZXJ5UGFyYW1zKTtcclxuICAgICAgICB0aGlzLmZpbHRlck1hbmFnZXIucGFyc2VQYXJhbXMocmVzdG9yZWRTdGF0ZSk7XHJcbiAgICB9XHJcbiAgICBkaXNwb3NlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzcG9zZWQgPSB0cnVlO1xyXG4gICAgICAgIGRlbGV0ZSB0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZDtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgdGhpcy5zb3J0TWFuYWdlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgdGhpcy5maWx0ZXJNYW5hZ2VyLmRpc3Bvc2UoKTtcclxuICAgICAgICB0aGlzLnNlbGVjdGlvbk1hbmFnZXIuZGlzcG9zZSgpO1xyXG4gICAgfVxyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5yZWFkeSkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG4gICAgaXRlbXM6IE9iamVjdFtdID0gW107XHJcbiAgICB0b3RhbENvdW50ID0gMDtcclxuICAgIGxvYWRlZENvdW50ID0gMDtcclxuICAgIHRvUmVxdWVzdCgpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRSZXF1ZXN0KG51bGwpO1xyXG4gICAgfVxyXG4gICAgZ2V0TG9jYWxTdGF0ZSgpOiBPYmplY3Qge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmZpbHRlck1hbmFnZXIuYnVpbGRQZXJzaXN0ZWRTdGF0ZShudWxsKTtcclxuICAgIH1cclxuXHJcbiAgICBsb2FkRGF0YSgpOiBQcm9taXNlPE9iamVjdD4ge1xyXG4gICAgICAgIGlmICghdGhpcy5pbml0ZWQpIHtcclxuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkRGF0YSBjYW4gYmUgY2FsbGVkIG9ubHkgYWZ0ZXIgYWN0aXZhdGlvbi4nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudG90YWxDb3VudCA9IDA7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHRoaXMuZ2V0RGF0YVJlYWRQcm9taXNlKCk7XHJcbiAgICAgICAgdGhpcy5hZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2UpO1xyXG4gICAgICAgIHByb21pc2UudGhlbih0aGlzLmxpc3RMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQsIHRoaXMubGlzdExvYWREYXRhRmFpbEJpbmRlZCk7XHJcbiAgICAgICAgaWYgKHRoaXMudXNlTW9kZWxTdGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNhdmVSZXF1ZXN0U3RhdGUoKTtcclxuICAgICAgICAgICAgdGhpcy5zYXZlTG9jYWxTdGF0ZSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcclxuICAgIH1cclxuICAgIGNsZWFyRGF0YSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmNsZWFyRGF0YUludGVybmFsKCk7XHJcbiAgICB9XHJcbiAgICByZWxvYWREYXRhKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnJlYWR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJEYXRhKCk7XHJcbiAgICAgICAgICAgIHRoaXMubG9hZERhdGEoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICAvLy9JTGlzdFxyXG5cclxuICAgIC8vL0lSZXF1ZXN0Q2FuY2VsbGVyXHJcbiAgICBhZGRUb0NhbmNlbGxhdGlvblNlcXVlbmNlKHByb21pc2U6IFByb21pc2U8T2JqZWN0Pik6IHZvaWQgeyB9O1xyXG4gICAgY2FuY2VsUmVxdWVzdHMoKTogdm9pZCB7IH07XHJcbiAgICAvLy9JUmVxdWVzdENhbmNlbGxlclxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgdXNlTW9kZWxTdGF0ZSA9IHRydWU7XHJcbiAgICBzdGF0ZU1hbmFnZXI6IElTdGF0ZU1hbmFnZXI7XHJcbiAgICBzYXZlUmVxdWVzdFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLmZsdXNoUmVxdWVzdFN0YXRlKHRoaXMudG9SZXF1ZXN0KCkpO1xyXG4gICAgfTtcclxuICAgIHNhdmVMb2NhbFN0YXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuc3RhdGVNYW5hZ2VyLnBlcnNpc3RMb2NhbFN0YXRlKHRoaXMuZ2V0TG9jYWxTdGF0ZSgpKTtcclxuICAgIH07XHJcbiAgICBwcml2YXRlIGdldFJlc3RvcmVkU3RhdGUocGFyYW1zOiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIGlmICh0aGlzLnVzZU1vZGVsU3RhdGUgPT09IGZhbHNlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBwYXJhbXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnN0YXRlTWFuYWdlci5tZXJnZVN0YXRlcyhwYXJhbXMpO1xyXG4gICAgfVxyXG4gICAgLy8vSU9iamVjdFdpdGhTdGF0ZVxyXG4gICAgc2VsZWN0aW9uTWFuYWdlcjogSVNlbGVjdGlvbk1hbmFnZXI7XHJcbiAgICBmaWx0ZXJNYW5hZ2VyOiBJRmlsdGVyTWFuYWdlcjtcclxuICAgIHNvcnRNYW5hZ2VyOiBJU29ydE1hbmFnZXI7XHJcbiAgICBhYnN0cmFjdCBnZXREYXRhUmVhZFByb21pc2UoKTogUHJvbWlzZTxPYmplY3Q+O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
