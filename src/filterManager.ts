import {IFilterConfig} from './contracts/IFilterConfig';
import {Utility} from './common/utility';
import {IFilterManager} from './contracts/IFilterManager';

export class FilterManager implements IFilterManager {
    public static filterPropertiesMap: Map<any, Array<IFilterConfig>> = new Map<any, Array<IFilterConfig>>();
    private appliedFiltersMapInternal: Map<Object, Array<IFilterConfig>> = new Map<Object, Array<IFilterConfig>>();

    public static registerFilter(targetType: Object, propertyConfig: IFilterConfig): void {
        const typeConfigs = FilterManager.filterPropertiesMap.has(targetType) ? FilterManager.filterPropertiesMap.get(targetType) : new Array<IFilterConfig>();
        typeConfigs.push(propertyConfig);
        FilterManager.filterPropertiesMap.set(targetType, typeConfigs);
    }
    public static buildFilterValue(target: Object, value: any, config: IFilterConfig): Object {
        if (config && config.serializeFormatter) {
            return config.serializeFormatter.call(target, value);
        }

        value = config && config.emptyIsNull ? value || null : value;

        if (value && value.toRequest) {
            return value.toRequest();
        }
        if (Array.isArray(value)) {
            const temp = [];
            for (let i = 0; i < value.length; i++) {
                temp[i] = FilterManager.buildFilterValue(target, value[i], null);
            }
            return temp;
        }
        return value;
    }

    public dispose(): void {
        this.appliedFiltersMapInternal.clear();
    }
    public get appliedFiltersMap(): Map<Object, Array<IFilterConfig>> {
        return this.appliedFiltersMapInternal;
    }
    public resetValues(): void {
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<IFilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const defaultValue = (typeof config.defaultValue === 'function') ? (config.defaultValue as Function).call(target) : config.defaultValue;
                const clonedObject = Utility.cloneLiteral({ defaultValue: defaultValue });
                target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, clonedObject.defaultValue) : clonedObject.defaultValue;
            }
        });
    }
    public applyParams(params: Object): void {
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<IFilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (params && params.hasOwnProperty(config.parameterName) && false === config.ignoreOnAutoMap) {
                    let proposedVal = config.emptyIsNull ? params[config.parameterName] || null : params[config.parameterName];
                    proposedVal = config.coerce ? Utility.coerceValue(proposedVal) : proposedVal;
                    target[config.propertyName] = config.parseFormatter ? config.parseFormatter.call(target, proposedVal, params) : proposedVal;
                }
            }
        });
    }
    public getRequestState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<IFilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                const proposedVal = target[config.propertyName];
                result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public getPersistedState(result?: Object): any {
        result = result || {};
        this.appliedFiltersMapInternal.forEach((targetConfig: Array<IFilterConfig>, target: Object) => {
            for (let i = 0; i < targetConfig.length; i++) {
                const config = targetConfig[i];
                if (!config.persisted) {
                    continue;
                }
                let proposedVal = target[config.propertyName];
                result[config.parameterName] = FilterManager.buildFilterValue(target, proposedVal, config);
            }
        });
        return result;
    }
    public registerFilterTarget(target: Object): void {
        let targetConfig = new Array<IFilterConfig>();
        FilterManager.filterPropertiesMap.forEach((typeConfig: Array<IFilterConfig>, type: any) => {
            if (target instanceof type) {
                targetConfig = targetConfig.concat(typeConfig);
                for (let i = 0; i < targetConfig.length; i++) {
                    let config = targetConfig[i];
                    if (config.defaultValue === undefined) {
                        config.defaultValue = Utility.cloneLiteral({ defaultValue: target[config.propertyName] }).defaultValue;
                    }
                }
            }
        });
        if (targetConfig.length > 0) {
            this.appliedFiltersMapInternal.set(target, targetConfig);
        } else {
            this.appliedFiltersMapInternal.delete(target);
        }
    }
    constructor(target?: Object) {
        if (target) {
            this.registerFilterTarget(target);
        }
    }
}
