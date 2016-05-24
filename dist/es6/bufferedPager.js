var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Defaults } from './common/defaults';
import { filter } from './filterAnnotation';
export class BufferedPager {
    constructor() {
        this.takeRowCountInternal = Defaults.bufferedListSettings.defaultRowCount;
        this.totalCount = 0;
        this.loadedCount = 0;
        this.defaultRowCount = Defaults.bufferedListSettings.defaultRowCount;
        this.minRowCount = Defaults.bufferedListSettings.minRowCount;
        this.maxRowCount = Defaults.bufferedListSettings.maxRowCount;
        this.skip = 0;
    }
    get takeRowCount() {
        return this.takeRowCountInternal;
    }
    set takeRowCount(value) {
        const valueStr = (value + '').replace(/[^0-9]/g, '');
        let rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : this.defaultRowCount;
        if (rowCount < this.minRowCount) {
            rowCount = this.defaultRowCount;
        }
        if (rowCount > this.maxRowCount) {
            rowCount = this.maxRowCount;
        }
        if (this.totalCount !== 0) {
            if (this.skip + rowCount > this.totalCount) {
                rowCount = this.totalCount - this.skip;
            }
        }
        this.takeRowCountInternal = rowCount;
    }
    processResponse(result) {
        this.totalCount = result[Defaults.listSettings.totalCountParameterName] || 0;
        this.skip = (result[Defaults.listSettings.loadedCountParameterName] === null || result[Defaults.listSettings.loadedCountParameterName] === undefined) ?
            0 : this.skip + result[Defaults.listSettings.loadedCountParameterName];
        this.loadedCount = this.skip;
    }
    reset() {
        this.totalCount = 0;
        this.takeRowCount = this.defaultRowCount;
        this.skip = 0;
    }
}
__decorate([
    filter({
        defaultValue: function () { return this.defaultRowCount; },
        parameterName: Defaults.bufferedListSettings.takeRowCountParameterName,
        parseFormatter: function (proposedParam, allParams) {
            let result;
            if (allParams && !isNaN(allParams.skip) && !isNaN(allParams.take)) {
                result = (allParams.skip || 0) + (allParams.take || 0);
            }
            return result || this.defaultRowCount;
        }
    }), 
    __metadata('design:type', Object)
], BufferedPager.prototype, "takeRowCountInternal", void 0);
__decorate([
    filter({
        defaultValue: 0,
        parameterName: Defaults.bufferedListSettings.skipRowCountParameterName,
        parseFormatter: function () { return 0; }
    }), 
    __metadata('design:type', Object)
], BufferedPager.prototype, "skip", void 0);

//# sourceMappingURL=data:application/json;base64,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QUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7UUFDbEUsYUFBYSxFQUFFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUI7UUFDdEUsY0FBYyxFQUFFLFVBQVUsYUFBa0IsRUFBRSxTQUFjO1lBQ3hELElBQUksTUFBTSxDQUFDO1lBQ1gsRUFBRSxDQUFDLENBQUMsU0FBUyxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoRSxNQUFNLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUMzRCxDQUFDO1lBQ0QsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsZUFBZSxDQUFDO1FBQzFDLENBQUM7S0FDYSxDQUFDOzsyREFBQTtBQVNuQjtJQUFDLE1BQU0sQ0FBQztRQUNKLFlBQVksRUFBRSxDQUFDO1FBQ2YsYUFBYSxFQUFFLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyx5QkFBeUI7UUFDdEUsY0FBYyxFQUFFLGNBQXNCLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ25DLENBQUM7OzJDQUFBO0FBb0N0QiIsImZpbGUiOiJidWZmZXJlZFBhZ2VyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge0lQYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVBhZ2VyJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcblxyXG5leHBvcnQgY2xhc3MgQnVmZmVyZWRQYWdlciBpbXBsZW1lbnRzIElQYWdlciB7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IGZ1bmN0aW9uICgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5kZWZhdWx0Um93Q291bnQ7IH0sXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogZnVuY3Rpb24gKHByb3Bvc2VkUGFyYW06IGFueSwgYWxsUGFyYW1zOiBhbnkpOiBudW1iZXIge1xyXG4gICAgICAgICAgICBsZXQgcmVzdWx0O1xyXG4gICAgICAgICAgICBpZiAoYWxsUGFyYW1zICYmICFpc05hTihhbGxQYXJhbXMuc2tpcCkgJiYgIWlzTmFOKGFsbFBhcmFtcy50YWtlKSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gKGFsbFBhcmFtcy5za2lwIHx8IDApICsgKGFsbFBhcmFtcy50YWtlIHx8IDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQgfHwgdGhpcy5kZWZhdWx0Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgfSBhcyBJRmlsdGVyQ29uZmlnKVxyXG4gICAgcHJpdmF0ZSB0YWtlUm93Q291bnRJbnRlcm5hbCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRSb3dDb3VudDtcclxuXHJcbiAgICB0b3RhbENvdW50OiBudW1iZXIgPSAwO1xyXG4gICAgbG9hZGVkQ291bnQ6IG51bWJlciA9IDA7XHJcbiAgICBkZWZhdWx0Um93Q291bnQ6IG51bWJlciA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRSb3dDb3VudDtcclxuICAgIG1pblJvd0NvdW50OiBudW1iZXIgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5taW5Sb3dDb3VudDtcclxuICAgIG1heFJvd0NvdW50OiBudW1iZXIgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3Muc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogZnVuY3Rpb24gKCk6IG51bWJlciB7IHJldHVybiAwOyB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBza2lwID0gMDtcclxuXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTldL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IHRoaXMuZGVmYXVsdFJvd0NvdW50O1xyXG4gICAgICAgIGlmIChyb3dDb3VudCA8IHRoaXMubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLmRlZmF1bHRSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJvd0NvdW50ID4gdGhpcy5tYXhSb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IHRoaXMubWF4Um93Q291bnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnRvdGFsQ291bnQgIT09IDApIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2tpcCArIHJvd0NvdW50ID4gdGhpcy50b3RhbENvdW50KSB7XHJcbiAgICAgICAgICAgICAgICByb3dDb3VudCA9IHRoaXMudG90YWxDb3VudCAtIHRoaXMuc2tpcDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudEludGVybmFsID0gcm93Q291bnQ7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc1Jlc3BvbnNlKHJlc3VsdDogT2JqZWN0KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy50b3RhbENvdW50ID0gcmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy50b3RhbENvdW50UGFyYW1ldGVyTmFtZV0gfHwgMDtcclxuICAgICAgICB0aGlzLnNraXAgPSAocmVzdWx0W0RlZmF1bHRzLmxpc3RTZXR0aW5ncy5sb2FkZWRDb3VudFBhcmFtZXRlck5hbWVdID09PSBudWxsIHx8IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXSA9PT0gdW5kZWZpbmVkKSA/XHJcbiAgICAgICAgICAgIDAgOiB0aGlzLnNraXAgKyByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5sb2FkZWRDb3VudCA9IHRoaXMuc2tpcDtcclxuICAgIH1cclxuXHJcbiAgICByZXNldCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRvdGFsQ291bnQgPSAwO1xyXG4gICAgICAgIHRoaXMudGFrZVJvd0NvdW50ID0gdGhpcy5kZWZhdWx0Um93Q291bnQ7XHJcbiAgICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgIH1cclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
