import { Status } from './common/status';
import { Defaults } from './common/defaults';
import { ProgressState } from './common/progressState';
import * as _ from 'lodash';
export class StatusTracker {
    static get statusDisplayed() {
        return StatusTracker.status !== ProgressState.Done;
    }
    static get isActive() {
        return StatusTracker.statusDisplayed || StatusTracker.modalDisplayed;
    }
    static trackStatus(title) {
        const sid = setTimeout(() => {
            StatusTracker.status = ProgressState.Progress;
            if (title) {
                const status = new Status(ProgressState.Progress, title);
                status.sid = sid;
                StatusTracker.statusList.push(status);
            }
        }, Defaults.uiSettings.progressDelayInterval);
        return sid;
    }
    static resolveStatus(sid, status) {
        if (sid) {
            clearTimeout(sid);
            const current = StatusTracker.statusList.find(item => {
                return item.sid === sid;
            });
            if (current) {
                current.status = status;
            }
        }
        setTimeout(() => {
            const undone = StatusTracker.statusList.find(item => {
                return item.status === ProgressState.Progress;
            });
            if (undone === undefined) {
                StatusTracker.statusList.length = 0;
                StatusTracker.status = ProgressState.Done;
            }
            else {
                _.remove(StatusTracker.statusList, item => {
                    return item.sid === sid;
                });
            }
        }, Defaults.uiSettings.elementVisibilityInterval);
    }
    ;
}
StatusTracker.status = ProgressState.Done;
StatusTracker.modalDisplayed = false;
StatusTracker.statusList = new Array();

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0YXR1c1RyYWNrZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ik9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxpQkFBaUI7T0FDL0IsRUFBQyxRQUFRLEVBQUMsTUFBTSxtQkFBbUI7T0FDbkMsRUFBQyxhQUFhLEVBQUMsTUFBTSx3QkFBd0I7T0FDN0MsS0FBSyxDQUFDLE1BQU0sUUFBUTtBQUUzQjtJQUtJLFdBQVcsZUFBZTtRQUN0QixNQUFNLENBQUMsYUFBYSxDQUFDLE1BQU0sS0FBSyxhQUFhLENBQUMsSUFBSSxDQUFDO0lBQ3ZELENBQUM7SUFDRCxXQUFXLFFBQVE7UUFDZixNQUFNLENBQUMsYUFBYSxDQUFDLGVBQWUsSUFBSSxhQUFhLENBQUMsY0FBYyxDQUFDO0lBQ3pFLENBQUM7SUFDRCxPQUFPLFdBQVcsQ0FBQyxLQUFhO1FBQzVCLE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQztZQUNuQixhQUFhLENBQUMsTUFBTSxHQUFHLGFBQWEsQ0FBQyxRQUFRLENBQUM7WUFDOUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDUixNQUFNLE1BQU0sR0FBRyxJQUFJLE1BQU0sQ0FBQyxhQUFhLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztnQkFDakIsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDMUMsQ0FBQztRQUNMLENBQUMsRUFBRSxRQUFRLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7UUFDOUMsTUFBTSxDQUFDLEdBQUcsQ0FBQztJQUNmLENBQUM7SUFDRCxPQUFPLGFBQWEsQ0FBQyxHQUFXLEVBQUUsTUFBcUI7UUFDbkQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNOLFlBQVksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNsQixNQUFNLE9BQU8sR0FBRyxhQUFhLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJO2dCQUM5QyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxHQUFHLENBQUM7WUFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO2dCQUNWLE9BQU8sQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDO1lBQzVCLENBQUM7UUFDTCxDQUFDO1FBQ0QsVUFBVSxDQUFDO1lBQ1AsTUFBTSxNQUFNLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSTtnQkFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssYUFBYSxDQUFDLFFBQVEsQ0FBQztZQUNsRCxDQUFDLENBQUMsQ0FBQztZQUNILEVBQUUsQ0FBQyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDO2dCQUN2QixhQUFhLENBQUMsVUFBVSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ3BDLGFBQWEsQ0FBQyxNQUFNLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQztZQUM5QyxDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ0osQ0FBQyxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsVUFBVSxFQUFFLElBQUk7b0JBQ25DLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLEdBQUcsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7WUFDUCxDQUFDO1FBQ0wsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxVQUFVLENBQUMseUJBQXlCLENBQUMsQ0FBQztJQUN0RCxDQUFDOztBQUNMLENBQUM7QUE3Q1Usb0JBQU0sR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDO0FBQzVCLDRCQUFjLEdBQUcsS0FBSyxDQUFDO0FBQ3ZCLHdCQUFVLEdBQUcsSUFBSSxLQUFLLEVBQVUsQ0EyQzFDIiwiZmlsZSI6InN0YXR1c1RyYWNrZXIuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1N0YXR1c30gZnJvbSAnLi9jb21tb24vc3RhdHVzJztcclxuaW1wb3J0IHtEZWZhdWx0c30gZnJvbSAnLi9jb21tb24vZGVmYXVsdHMnO1xyXG5pbXBvcnQge1Byb2dyZXNzU3RhdGV9IGZyb20gJy4vY29tbW9uL3Byb2dyZXNzU3RhdGUnO1xyXG5pbXBvcnQgKiBhcyBfIGZyb20gJ2xvZGFzaCc7XHJcblxyXG5leHBvcnQgY2xhc3MgU3RhdHVzVHJhY2tlciB7XHJcbiAgICBzdGF0aWMgc3RhdHVzID0gUHJvZ3Jlc3NTdGF0ZS5Eb25lO1xyXG4gICAgc3RhdGljIG1vZGFsRGlzcGxheWVkID0gZmFsc2U7XHJcbiAgICBzdGF0aWMgc3RhdHVzTGlzdCA9IG5ldyBBcnJheTxTdGF0dXM+KCk7XHJcblxyXG4gICAgc3RhdGljIGdldCBzdGF0dXNEaXNwbGF5ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIFN0YXR1c1RyYWNrZXIuc3RhdHVzICE9PSBQcm9ncmVzc1N0YXRlLkRvbmU7XHJcbiAgICB9XHJcbiAgICBzdGF0aWMgZ2V0IGlzQWN0aXZlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBTdGF0dXNUcmFja2VyLnN0YXR1c0Rpc3BsYXllZCB8fCBTdGF0dXNUcmFja2VyLm1vZGFsRGlzcGxheWVkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHRyYWNrU3RhdHVzKHRpdGxlOiBzdHJpbmcpOiBudW1iZXIge1xyXG4gICAgICAgIGNvbnN0IHNpZCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuUHJvZ3Jlc3M7XHJcbiAgICAgICAgICAgIGlmICh0aXRsZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzID0gbmV3IFN0YXR1cyhQcm9ncmVzc1N0YXRlLlByb2dyZXNzLCB0aXRsZSk7XHJcbiAgICAgICAgICAgICAgICBzdGF0dXMuc2lkID0gc2lkO1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0LnB1c2goc3RhdHVzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MucHJvZ3Jlc3NEZWxheUludGVydmFsKTtcclxuICAgICAgICByZXR1cm4gc2lkO1xyXG4gICAgfVxyXG4gICAgc3RhdGljIHJlc29sdmVTdGF0dXMoc2lkOiBudW1iZXIsIHN0YXR1czogUHJvZ3Jlc3NTdGF0ZSk6IHZvaWQge1xyXG4gICAgICAgIGlmIChzaWQpIHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnQgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnNpZCA9PT0gc2lkO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgaWYgKGN1cnJlbnQpIHtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnQuc3RhdHVzID0gc3RhdHVzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCk6IHZvaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB1bmRvbmUgPSBTdGF0dXNUcmFja2VyLnN0YXR1c0xpc3QuZmluZChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBpdGVtLnN0YXR1cyA9PT0gUHJvZ3Jlc3NTdGF0ZS5Qcm9ncmVzcztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIGlmICh1bmRvbmUgPT09IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICAgICAgU3RhdHVzVHJhY2tlci5zdGF0dXNMaXN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICBTdGF0dXNUcmFja2VyLnN0YXR1cyA9IFByb2dyZXNzU3RhdGUuRG9uZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF8ucmVtb3ZlKFN0YXR1c1RyYWNrZXIuc3RhdHVzTGlzdCwgaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGl0ZW0uc2lkID09PSBzaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIERlZmF1bHRzLnVpU2V0dGluZ3MuZWxlbWVudFZpc2liaWxpdHlJbnRlcnZhbCk7XHJcbiAgICB9O1xyXG59XHJcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==