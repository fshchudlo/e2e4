System.register(['./common/defaults', './filterManager', './common/progressState'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var defaults_1, filterManager_1, progressState_1;
    var List;
    return {
        setters:[
            function (defaults_1_1) {
                defaults_1 = defaults_1_1;
            },
            function (filterManager_1_1) {
                filterManager_1 = filterManager_1_1;
            },
            function (progressState_1_1) {
                progressState_1 = progressState_1_1;
            }],
        execute: function() {
            List = (function () {
                function List(stateManager, pager) {
                    this.disposed = false;
                    this.inited = false;
                    this.state = progressState_1.ProgressState.Initial;
                    ///IRequestCanceller
                    ///IObjectWithState
                    this.useModelState = true;
                    this.stateManager = stateManager;
                    this.pager = pager;
                    this.filterManager = new filterManager_1.FilterManager(this);
                    this.filterManager.registerFilterTarget(this.pager);
                    this.listLoadDataSuccessBinded = this.listLoadDataSuccessCallback.bind(this);
                    this.listLoadDataFailBinded = this.listLoadDataFailCallback.bind(this);
                }
                List.prototype.listLoadDataSuccessCallback = function (result) {
                    this.pager.processResponse(result);
                    this.state = progressState_1.ProgressState.Done;
                    // In case when filter changed from last request and theres no data now
                    if ((result[defaults_1.Defaults.listSettings.totalCountParameterName] || 0) === 0) {
                        this.clearData();
                    }
                    return result;
                };
                List.prototype.listLoadDataFailCallback = function () {
                    this.state = progressState_1.ProgressState.Fail;
                };
                List.prototype.clearData = function () {
                    this.pager.reset();
                };
                Object.defineProperty(List.prototype, "busy", {
                    get: function () {
                        return this.state === progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                Object.defineProperty(List.prototype, "ready", {
                    get: function () {
                        return this.state !== progressState_1.ProgressState.Progress;
                    },
                    enumerable: true,
                    configurable: true
                });
                List.prototype.init = function (queryParams) {
                    this.inited = true;
                    var restoredState = this.getRestoredState(queryParams);
                    this.filterManager.parseParams(restoredState);
                };
                List.prototype.dispose = function () {
                    this.disposed = true;
                    delete this.listLoadDataSuccessBinded;
                    delete this.listLoadDataFailBinded;
                    this.clearData();
                    this.filterManager.dispose();
                };
                List.prototype.toRequest = function () {
                    return this.filterManager.buildRequest(null);
                };
                List.prototype.getLocalState = function () {
                    return this.filterManager.buildPersistedState(null);
                };
                List.prototype.loadData = function () {
                    if (!this.inited) {
                        throw new Error('loadData can be called only after activation.');
                    }
                    this.pager.totalCount = 0;
                    this.state = progressState_1.ProgressState.Progress;
                    var promise = this.getDataReadPromise(this.toRequest());
                    this.addToCancellationSequence(promise);
                    promise.then(this.listLoadDataSuccessBinded, this.listLoadDataFailBinded);
                    if (this.useModelState) {
                        this.saveRequestState();
                        this.saveLocalState();
                    }
                    return promise;
                };
                List.prototype.reloadData = function () {
                    if (this.ready) {
                        this.clearData();
                        this.loadData();
                    }
                };
                ///IList
                ///IRequestCanceller
                List.prototype.addToCancellationSequence = function (promise) { };
                ;
                List.prototype.cancelRequests = function () { };
                ;
                List.prototype.saveRequestState = function () {
                    this.stateManager.flushRequestState(this.toRequest());
                };
                ;
                List.prototype.saveLocalState = function () {
                    this.stateManager.persistLocalState(this.getLocalState());
                };
                ;
                List.prototype.getRestoredState = function (params) {
                    if (this.useModelState === false) {
                        return params;
                    }
                    return this.stateManager.mergeStates(params);
                };
                return List;
            }());
            exports_1("List", List);
        }
    }
});