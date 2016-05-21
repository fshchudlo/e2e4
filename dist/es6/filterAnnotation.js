import { FilterConfig } from './filterConfig';
export function filter(targetOrNameOrConfig, key) {
    const configurableDecorate = (target, key2) => {
        const config = FilterConfig.getDefaultConfig(key2);
        if (typeof targetOrNameOrConfig === 'string') {
            config.parameterName = targetOrNameOrConfig;
        }
        else {
            Object.assign(config, targetOrNameOrConfig);
        }
        return new FilterConfig(config).register(target.constructor);
    };
    if (key) {
        const targetTemp = targetOrNameOrConfig;
        targetOrNameOrConfig = null;
        return configurableDecorate(targetTemp, key);
    }
    return configurableDecorate;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImZpbHRlckFubm90YXRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0I7QUFFM0MsdUJBQXVCLG9CQUFtRCxFQUFFLEdBQVk7SUFDcEYsTUFBTSxvQkFBb0IsR0FBRyxDQUFDLE1BQU0sRUFBRSxJQUFJO1FBQ3RDLE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsQ0FBQyxPQUFPLG9CQUFvQixLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsTUFBTSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQztRQUNoRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBQ2hELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxZQUFZLENBQUMsTUFBTSxDQUFDLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUM7SUFFRixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBQ04sTUFBTSxVQUFVLEdBQUcsb0JBQW9CLENBQUM7UUFDeEMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO1FBQzVCLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDakQsQ0FBQztJQUNELE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQztBQUNoQyxDQUFDIiwiZmlsZSI6ImZpbHRlckFubm90YXRpb24uanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge0ZpbHRlckNvbmZpZ30gZnJvbSAnLi9maWx0ZXJDb25maWcnO1xyXG5pbXBvcnQge0lGaWx0ZXJDb25maWd9IGZyb20gJy4vY29udHJhY3RzL0lGaWx0ZXJDb25maWcnO1xyXG5leHBvcnQgZnVuY3Rpb24gZmlsdGVyKHRhcmdldE9yTmFtZU9yQ29uZmlnPzogc3RyaW5nIHwgSUZpbHRlckNvbmZpZyB8IGFueSwga2V5Pzogc3RyaW5nKTogYW55IHtcclxuICAgIGNvbnN0IGNvbmZpZ3VyYWJsZURlY29yYXRlID0gKHRhcmdldCwga2V5MikgPT4ge1xyXG4gICAgICAgIGNvbnN0IGNvbmZpZyA9IEZpbHRlckNvbmZpZy5nZXREZWZhdWx0Q29uZmlnKGtleTIpO1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0T3JOYW1lT3JDb25maWcgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbmZpZy5wYXJhbWV0ZXJOYW1lID0gdGFyZ2V0T3JOYW1lT3JDb25maWc7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgT2JqZWN0LmFzc2lnbihjb25maWcsIHRhcmdldE9yTmFtZU9yQ29uZmlnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG5ldyBGaWx0ZXJDb25maWcoY29uZmlnKS5yZWdpc3Rlcih0YXJnZXQuY29uc3RydWN0b3IpO1xyXG4gICAgfTtcclxuXHJcbiAgICBpZiAoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0VGVtcCA9IHRhcmdldE9yTmFtZU9yQ29uZmlnO1xyXG4gICAgICAgIHRhcmdldE9yTmFtZU9yQ29uZmlnID0gbnVsbDtcclxuICAgICAgICByZXR1cm4gY29uZmlndXJhYmxlRGVjb3JhdGUodGFyZ2V0VGVtcCwga2V5KTtcclxuICAgIH1cclxuICAgIHJldHVybiBjb25maWd1cmFibGVEZWNvcmF0ZTtcclxufVxyXG4iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
