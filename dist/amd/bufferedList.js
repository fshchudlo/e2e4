var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
define(["require", "exports", './list', './common/defaults', './filterAnnotation'], function (require, exports, list_1, defaults_1, filterAnnotation_1) {
    "use strict";
    var BufferedList = (function (_super) {
        __extends(BufferedList, _super);
        function BufferedList(stateManager, sortManager) {
            _super.call(this, stateManager, sortManager);
            this.takeRowCountInternal = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.skip = 0;
            this.bufferedLoadDataSuccessBinded = this.bufferedLoadDataSuccess.bind(this);
        }
        Object.defineProperty(BufferedList.prototype, "takeRowCount", {
            get: function () {
                return this.takeRowCountInternal;
            },
            set: function (value) {
                var valueStr = (value + '').replace(/[^0-9\.]/g, '');
                var rowCount = parseInt(valueStr, 10) ? parseInt(valueStr, 10) : defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                if (rowCount < defaults_1.Defaults.bufferedListSettings.minRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
                if (rowCount > defaults_1.Defaults.bufferedListSettings.maxRowCount) {
                    rowCount = defaults_1.Defaults.bufferedListSettings.maxRowCount;
                }
                if (this.totalCount !== 0) {
                    if (this.skip + rowCount > this.totalCount) {
                        rowCount = this.totalCount - this.skip;
                    }
                }
                this.takeRowCountInternal = rowCount;
            },
            enumerable: true,
            configurable: true
        });
        BufferedList.prototype.dispose = function () {
            _super.prototype.dispose.call(this);
            delete this.bufferedLoadDataSuccessBinded;
        };
        BufferedList.prototype.bufferedLoadDataSuccess = function (result) {
            this.loadedCount = this.skip + result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.skip += result[defaults_1.Defaults.listSettings.loadedCountParameterName];
            this.loadedCount = this.skip;
            // In case when filter changed from last request and theres no data now
            if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                this.clearData();
            }
            return result;
        };
        BufferedList.prototype.loadData = function () {
            var promise = (_a = _super.prototype.loadData).call.apply(_a, [this].concat(Array.prototype.slice.call(arguments)));
            promise.then(this.bufferedLoadDataSuccessBinded);
            return promise;
            var _a;
        };
        BufferedList.prototype.onSortChangesCompleted = function () {
            this.takeRowCount = defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
            this.skip = 0;
            _super.prototype.onSortChangesCompleted.call(this);
        };
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount,
                parameterName: defaults_1.Defaults.bufferedListSettings.takeRowCountParameterName,
                parseFormatter: function (proposedParam, allParams) {
                    if (allParams && allParams.skip !== undefined && allParams.take !== undefined) {
                        return allParams.skip + allParams.take;
                    }
                    return defaults_1.Defaults.bufferedListSettings.defaultTakeRowCount;
                }
            }), 
            __metadata('design:type', Object)
        ], BufferedList.prototype, "takeRowCountInternal", void 0);
        __decorate([
            filterAnnotation_1.filter({
                defaultValue: 0,
                parameterName: defaults_1.Defaults.bufferedListSettings.skipRowCountParameterName,
                parseFormatter: function () { return 0; }
            }), 
            __metadata('design:type', Object)
        ], BufferedList.prototype, "skip", void 0);
        return BufferedList;
    }(list_1.List));
    exports.BufferedList = BufferedList;
});

//# sourceMappingURL=data:application/json;base64,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Q0F6RUEsQUF5RUMsQ0F6RTBDLFdBQUksR0F5RTlDO0lBekVxQixvQkFBWSxlQXlFakMsQ0FBQSIsImZpbGUiOiJidWZmZXJlZExpc3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0xpc3R9IGZyb20gJy4vbGlzdCc7XHJcbmltcG9ydCB7SVN0YXRlTWFuYWdlcn0gZnJvbSAnLi9jb250cmFjdHMvSVN0YXRlTWFuYWdlcic7XHJcbmltcG9ydCB7RGVmYXVsdHN9IGZyb20gJy4vY29tbW9uL2RlZmF1bHRzJztcclxuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJy4vZmlsdGVyQW5ub3RhdGlvbic7XHJcbmltcG9ydCB7SUZpbHRlckNvbmZpZ30gZnJvbSAnLi9jb250cmFjdHMvSUZpbHRlckNvbmZpZyc7XHJcbmltcG9ydCB7SVNvcnRNYW5hZ2VyfSBmcm9tICcuL2NvbnRyYWN0cy9JU29ydE1hbmFnZXInO1xyXG5cclxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEJ1ZmZlcmVkTGlzdCBleHRlbmRzIExpc3Qge1xyXG4gICAgcHJpdmF0ZSBidWZmZXJlZExvYWREYXRhU3VjY2Vzc0JpbmRlZDogKHJlc3VsdDogT2JqZWN0KSA9PiBPYmplY3Q7XHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MudGFrZVJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKHByb3Bvc2VkUGFyYW0sIGFsbFBhcmFtcyk6IG51bWJlciA9PiB7XHJcbiAgICAgICAgICAgIGlmIChhbGxQYXJhbXMgJiYgYWxsUGFyYW1zLnNraXAgIT09IHVuZGVmaW5lZCAmJiBhbGxQYXJhbXMudGFrZSAhPT0gdW5kZWZpbmVkKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gYWxsUGFyYW1zLnNraXAgKyBhbGxQYXJhbXMudGFrZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuICAgICAgICB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBwcml2YXRlIHRha2VSb3dDb3VudEludGVybmFsID0gRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MuZGVmYXVsdFRha2VSb3dDb3VudDtcclxuXHJcbiAgICBAZmlsdGVyKHtcclxuICAgICAgICBkZWZhdWx0VmFsdWU6IDAsXHJcbiAgICAgICAgcGFyYW1ldGVyTmFtZTogRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3Muc2tpcFJvd0NvdW50UGFyYW1ldGVyTmFtZSxcclxuICAgICAgICBwYXJzZUZvcm1hdHRlcjogKCk6IG51bWJlciA9PiB7IHJldHVybiAwOyB9XHJcbiAgICB9IGFzIElGaWx0ZXJDb25maWcpXHJcbiAgICBza2lwID0gMDtcclxuXHJcbiAgICBnZXQgdGFrZVJvd0NvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFrZVJvd0NvdW50SW50ZXJuYWw7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0IHRha2VSb3dDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgY29uc3QgdmFsdWVTdHIgPSAodmFsdWUgKyAnJykucmVwbGFjZSgvW14wLTlcXC5dL2csICcnKTtcclxuICAgICAgICBsZXQgcm93Q291bnQgPSBwYXJzZUludCh2YWx1ZVN0ciwgMTApID8gcGFyc2VJbnQodmFsdWVTdHIsIDEwKSA6IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgaWYgKHJvd0NvdW50IDwgRGVmYXVsdHMuYnVmZmVyZWRMaXN0U2V0dGluZ3MubWluUm93Q291bnQpIHtcclxuICAgICAgICAgICAgcm93Q291bnQgPSBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5kZWZhdWx0VGFrZVJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocm93Q291bnQgPiBEZWZhdWx0cy5idWZmZXJlZExpc3RTZXR0aW5ncy5tYXhSb3dDb3VudCkge1xyXG4gICAgICAgICAgICByb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLm1heFJvd0NvdW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy50b3RhbENvdW50ICE9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNraXAgKyByb3dDb3VudCA+IHRoaXMudG90YWxDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgcm93Q291bnQgPSB0aGlzLnRvdGFsQ291bnQgLSB0aGlzLnNraXA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy50YWtlUm93Q291bnRJbnRlcm5hbCA9IHJvd0NvdW50O1xyXG4gICAgfVxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHN0YXRlTWFuYWdlcjogSVN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXI6IElTb3J0TWFuYWdlcikge1xyXG4gICAgICAgIHN1cGVyKHN0YXRlTWFuYWdlciwgc29ydE1hbmFnZXIpO1xyXG4gICAgICAgIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQgPSB0aGlzLmJ1ZmZlcmVkTG9hZERhdGFTdWNjZXNzLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcG9zZSgpOiB2b2lkIHtcclxuICAgICAgICBzdXBlci5kaXNwb3NlKCk7XHJcbiAgICAgICAgZGVsZXRlIHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3MocmVzdWx0OiBPYmplY3QpOiBPYmplY3Qge1xyXG4gICAgICAgIHRoaXMubG9hZGVkQ291bnQgPSB0aGlzLnNraXAgKyByZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLmxvYWRlZENvdW50UGFyYW1ldGVyTmFtZV07XHJcbiAgICAgICAgdGhpcy5za2lwICs9IHJlc3VsdFtEZWZhdWx0cy5saXN0U2V0dGluZ3MubG9hZGVkQ291bnRQYXJhbWV0ZXJOYW1lXTtcclxuICAgICAgICB0aGlzLmxvYWRlZENvdW50ID0gdGhpcy5za2lwO1xyXG4gICAgICAgIC8vIEluIGNhc2Ugd2hlbiBmaWx0ZXIgY2hhbmdlZCBmcm9tIGxhc3QgcmVxdWVzdCBhbmQgdGhlcmVzIG5vIGRhdGEgbm93XHJcbiAgICAgICAgaWYgKChyZXN1bHRbRGVmYXVsdHMubGlzdFNldHRpbmdzLnRvdGFsQ291bnRQYXJhbWV0ZXJOYW1lXSB8fCAwKSA9PT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFyRGF0YSgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG5cclxuICAgIGxvYWREYXRhKCk6IFByb21pc2U8T2JqZWN0PiB7XHJcbiAgICAgICAgY29uc3QgcHJvbWlzZSA9IHN1cGVyLmxvYWREYXRhLmNhbGwodGhpcywgLi4uQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSk7XHJcbiAgICAgICAgcHJvbWlzZS50aGVuKHRoaXMuYnVmZmVyZWRMb2FkRGF0YVN1Y2Nlc3NCaW5kZWQpO1xyXG4gICAgICAgIHJldHVybiBwcm9taXNlO1xyXG4gICAgfVxyXG4gICAgb25Tb3J0Q2hhbmdlc0NvbXBsZXRlZCgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnRha2VSb3dDb3VudCA9IERlZmF1bHRzLmJ1ZmZlcmVkTGlzdFNldHRpbmdzLmRlZmF1bHRUYWtlUm93Q291bnQ7XHJcbiAgICAgICAgdGhpcy5za2lwID0gMDtcclxuICAgICAgICBzdXBlci5vblNvcnRDaGFuZ2VzQ29tcGxldGVkKCk7XHJcbiAgICB9XHJcbn1cclxuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
