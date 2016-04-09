import { ProgressState } from './progressState';
export class Status {
    constructor(status, title) {
        this.status = status;
        this.title = title;
    }
    get className() {
        switch (this.status) {
            case ProgressState.Done:
                return 'status status-resolved';
            case ProgressState.Progress:
                return 'status status-progress';
            case ProgressState.Fail:
                return 'status status-fail';
            default:
                return '';
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbW1vbi9zdGF0dXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxpQkFBaUI7QUFDN0M7SUFJSSxZQUFZLE1BQXFCLEVBQUUsS0FBYTtRQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztRQUNyQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxTQUFTO1FBQ1QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDbEIsS0FBSyxhQUFhLENBQUMsSUFBSTtnQkFDbkIsTUFBTSxDQUFDLHdCQUF3QixDQUFDO1lBQ3BDLEtBQUssYUFBYSxDQUFDLFFBQVE7Z0JBQ3ZCLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQztZQUNwQyxLQUFLLGFBQWEsQ0FBQyxJQUFJO2dCQUNuQixNQUFNLENBQUMsb0JBQW9CLENBQUM7WUFDaEM7Z0JBQ0ksTUFBTSxDQUFDLEVBQUUsQ0FBQztRQUNsQixDQUFDO0lBQ0wsQ0FBQztBQUNMLENBQUM7QUFBQSIsImZpbGUiOiJjb21tb24vc3RhdHVzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtQcm9ncmVzc1N0YXRlfSBmcm9tICcuL3Byb2dyZXNzU3RhdGUnO1xyXG5leHBvcnQgY2xhc3MgU3RhdHVzIHtcclxuICAgIHNpZDogbnVtYmVyO1xyXG4gICAgc3RhdHVzOiBQcm9ncmVzc1N0YXRlO1xyXG4gICAgdGl0bGU6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSwgdGl0bGU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIH1cclxuICAgIGdldCBjbGFzc05hbWUoKTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKHRoaXMuc3RhdHVzKSB7XHJcbiAgICAgICAgICAgIGNhc2UgUHJvZ3Jlc3NTdGF0ZS5Eb25lOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXJlc29sdmVkJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLlByb2dyZXNzOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICdzdGF0dXMgc3RhdHVzLXByb2dyZXNzJztcclxuICAgICAgICAgICAgY2FzZSBQcm9ncmVzc1N0YXRlLkZhaWw6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJ3N0YXR1cyBzdGF0dXMtZmFpbCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==