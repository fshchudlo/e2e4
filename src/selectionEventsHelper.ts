import {ISelectionManager} from './contracts/ISelectionManager';
import {ISelectableItemClickedEventArgs} from './contracts/ISelectableItemClickedEventArgs';
import {KeyCodes} from './common/keyCodes';
import {MouseButtons} from './common/MouseButtons';
export class SelectionEventsHelper {
    selectionManager: ISelectionManager;
    constructor(selectionManager: ISelectionManager) {
        this.selectionManager = selectionManager;
    }
    trySelectAll(evt: KeyboardEvent): void {
        if (evt.ctrlKey) {
            this.selectionManager.selectAll();
            evt.stopPropagation();
            evt.preventDefault();
        }
    }
    onArrowUp(evt: KeyboardEvent, allowMultipleSelection: boolean): void {
        if (evt.ctrlKey) {
            this.selectionManager.selectFirst();
            evt.stopPropagation();
            evt.preventDefault();
        } else if (this.selectionManager.lastProcessedIndex === null || this.selectionManager.lastProcessedIndex === undefined) {
            this.selectionManager.selectFirst();
            evt.stopPropagation();
            evt.preventDefault();
        } else if (evt.shiftKey && false === this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex)) {
            this.selectionManager.selectRange(this.selectionManager.lastProcessedIndex, this.selectionManager.lastProcessedIndex - 1);
        } else if (this.selectionManager.lastProcessedIndex > 0) {
            if (this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex - 1)) {
                this.selectionManager.deselectIndex(this.selectionManager.lastProcessedIndex);
            }
            this.selectionManager.selectIndex(this.selectionManager.lastProcessedIndex - 1, evt.shiftKey && allowMultipleSelection);
            evt.stopPropagation();
            evt.preventDefault();
        }
    }
    onArrowDown(evt: KeyboardEvent, allowMultipleSelection: boolean): void {
        if (evt.ctrlKey) {
            this.selectionManager.selectLast();
            evt.stopPropagation();
            evt.preventDefault();
        } else if (this.selectionManager.lastProcessedIndex === null || this.selectionManager.lastProcessedIndex === undefined) {
            this.selectionManager.selectFirst();
            evt.stopPropagation();
            evt.preventDefault();
        } else if (evt.shiftKey && false === this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex)) {
            this.selectionManager.selectRange(this.selectionManager.lastProcessedIndex, this.selectionManager.lastProcessedIndex + 1);
        } else {
            if (this.selectionManager.isIndexSelected(this.selectionManager.lastProcessedIndex + 1)) {
                this.selectionManager.deselectIndex(this.selectionManager.lastProcessedIndex);
            }
            this.selectionManager.selectIndex(this.selectionManager.lastProcessedIndex + 1, evt.shiftKey && allowMultipleSelection);
            evt.stopPropagation();
            evt.preventDefault();
        }
    }
    keyDownHandler(evt: KeyboardEvent, allowMultipleSelection: boolean): void {
        switch (evt.keyCode) {
            case KeyCodes.ArrowUp:
                this.onArrowUp(evt, allowMultipleSelection);
                break;
            case KeyCodes.ArrowDown:
                this.onArrowDown(evt, allowMultipleSelection);
                break;
            case KeyCodes.A:
                this.trySelectAll(evt);
                break;
            default:
                break;
        }
    }
    onMouseUp(eventArgs: ISelectableItemClickedEventArgs, toggleOnly: boolean, allowMultipleSelection: boolean): void {
        const isItemSelected = this.selectionManager.isIndexSelected(eventArgs.itemIndex);
        if (isItemSelected === false || eventArgs.browserEvent.which === MouseButtons.Left) {
            if (toggleOnly) {
                this.selectionManager.toggleSelection(eventArgs.itemIndex, true);
                setTimeout(this.clearWindowSelection, 0);
                return;
            }
        }
        if (isItemSelected === false || eventArgs.browserEvent.which === MouseButtons.Left) {
            if (eventArgs.browserEvent.ctrlKey && allowMultipleSelection) {
                this.selectionManager.toggleSelection(eventArgs.itemIndex, true);
            } else if (eventArgs.browserEvent.shiftKey && allowMultipleSelection) {
                const minIndex = this.selectionManager.getMinSelectedIndex();
                this.selectionManager.selectRange(minIndex === null ? eventArgs.itemIndex : minIndex, eventArgs.itemIndex);
            } else {
                this.selectionManager.toggleSelection(eventArgs.itemIndex, false);
            }
            setTimeout(this.clearWindowSelection, 0);
        }
    }
    clearWindowSelection(): void {
        try {
            if (window.getSelection) {
                window.getSelection().removeAllRanges();
            } else if (document.hasOwnProperty('selection')) {
                /* tslint:disable:no-string-literal */
                document['selection'].empty();
                /* tslint:enable:no-string-literal */
            }
        } catch (e) {

        }
    }
}
