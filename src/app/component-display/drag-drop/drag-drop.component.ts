// drag-drop.component.ts
import { Component, Input, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { faQuestionCircle } from   '@fortawesome/free-solid-svg-icons';
import { Game } from '../../models/game.model';
import { Option } from '../../models/option.model';
import { MatDialog } from '@angular/material/dialog';
import { MaterialModalComponent } from '../../material-modal/material-modal.component';

@Component({
  selector: 'app-drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.css']
})
export class DragDropComponent implements OnInit {
  @Input() jsonData!: Game;
  constructor(private dialog: MatDialog) {}
  droppedItems: (Option | null)[] = [];
  availableItems: Option[] = [];
  dropZoneIds: string[] = [];
  validationResults: boolean[] = [];
  isModalOpen: boolean = false;
  questionIcon = faQuestionCircle;
  ngOnInit() {
    this.initializeItems();
    this.dropZoneIds = this.jsonData.options.map((_, i) => `drop-${i}`);
  }

  initializeItems() {
    this.availableItems = this.jsonData.options.map(option => new Option(option));
    this.droppedItems = new Array(this.jsonData.options.length).fill(null);
    this.validationResults = new Array(this.droppedItems.length).fill(false);
  }

  onDrop(event: any) {
    // Check if dropped outside of a valid drop zone
    if (!event.isPointerOverContainer) {
      // Move item back to available list
      const itemToMoveBack = event.previousContainer.data[event.previousIndex];
      if (itemToMoveBack) {
        // Only add if it doesn't already exist in availableItems
        const existsInAvailable = this.availableItems.some(existingItem => existingItem.text === itemToMoveBack.text);
        if (!existsInAvailable) {
          this.availableItems.push(itemToMoveBack);
        }
        // Remove from dropped items
        const indexToRemove = this.droppedItems.indexOf(itemToMoveBack);
        if (indexToRemove !== -1) {
          this.droppedItems[indexToRemove] = null;
        }
      }
    }
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      if (item) {
        if (event.container.id === 'availableList') {
          // Moving from drop zone to available list
          this.droppedItems[this.droppedItems.indexOf(item)] = null;
          this.availableItems.splice(event.currentIndex, 0, item);
        } else {
          // Moving from available list to drop zone
          const dropIndex = parseInt(event.container.id.split('-')[1]);
          if (this.droppedItems[dropIndex] === null) {
            this.droppedItems[dropIndex] = item;
            this.availableItems.splice(this.availableItems.indexOf(item), 1);
          }
        }
      }
    }
    
  }
  //if the box is drag from class="drop-zone-item"  tand is out oof zone , send it to  "availableList"
  /* validate() {
     // Implement validation logic here
     console.log('Validating...');
     // Example: Check if all drop zones are filled
     const allFilled = this.droppedItems.every(item => item !== null);
     // if not all zone filled display error message
     console.log('All drop zones filled:', allFilled);
     // check for each zone is the right answer
     // if right make it in green
     // if  wronge make it in red
   }*/
  validate() {
    console.log('Validating...');

    // Check if all drop zones are filled
    const allFilled = this.droppedItems.every(item => item !== null);

    if (!allFilled) {
      console.error('Not all drop zones are filled.');
      alert('Please fill all drop zones before validating.');
      return;
    }

    // Check for correctness and update validation results
    this.validationResults = this.droppedItems.map((item, index) => {
      const correctAnswer = this.jsonData.options[index]; // Assuming options are in order
      return item?.text === correctAnswer.text; // Adjust as needed based on your answer checking logic
    });

    // Log results and provide visual feedback
    console.log('Validation Results:', this.validationResults);

    // Update styles based on correctness
    this.updateDropZoneStyles();
  }

  updateDropZoneStyles() {
    const dropZones = document.querySelectorAll('.drop-zone');

    dropZones.forEach((zone, index) => {
      if (this.validationResults[index]) {
        zone.classList.add('correct');
        zone.classList.remove('incorrect');
      } else {
        zone.classList.add('incorrect');
        zone.classList.remove('correct');
      }
    });
  }

  reset() {
    this.initializeItems();
  }

  // openModal() {
  //   this.isModalOpen = true; // Show modal
  // }
  openModal(): void {
    const dialogRef = this.dialog.open(MaterialModalComponent, {
      width: '300px',
      data: { title: this.jsonData.question, explain: this.jsonData.explain }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  closeModal() {
    this.isModalOpen = false; // Hide modal
  }
}