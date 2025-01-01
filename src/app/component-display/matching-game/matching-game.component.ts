import { Component, OnInit } from '@angular/core';

interface MatchItem {
  id: number;
  text: string;
  imageUrl: string;
  matched: boolean;
  selected: boolean;
  color: string;
}

@Component({
  selector: 'app-matching-game',
  templateUrl: './matching-game.component.html',
  styleUrls: ['./matching-game.component.css']
})
export class MatchingGameComponent implements OnInit {
  leftItems: MatchItem[] = [];
  rightItems: MatchItem[] = [];
  lines: { start: number, end: number, color: string }[] = [];
  colors: string[] = ['#FF5733', '#33FF57', '#3357FF', '#FF33F1', '#33FFF1', '#F1FF33'];
  currentColorIndex = 0;

  ngOnInit(): void {
    this.loadItems();
    this.shuffleItems();
  }

  loadItems(): void {
    const items: MatchItem[] = [
      { id: 1, text: 'Apple', imageUrl: 'apple.jpg', matched: false, selected: false, color: '' },
      { id: 2, text: 'Banana', imageUrl: 'banana.jpg', matched: false, selected: false, color: '' },
      { id: 3, text: 'ananas', imageUrl: 'ananas.jpg', matched: false, selected: false, color: '' },
      { id: 4, text: 'kiwi', imageUrl: 'kiwi.jpg', matched: false, selected: false, color: '' },
      // Add more items as needed
    ];
    this.leftItems = [...items];
    this.rightItems = [...items];
  }

  shuffleItems(): void {
    this.leftItems = this.shuffle(this.leftItems);
    this.rightItems = this.shuffle(this.rightItems);
  }

  shuffle(array: any[]): any[] {
    return array.sort(() => Math.random() - 0.5);
  }

  selectItem(item: MatchItem, isLeft: boolean): void {
    const items = isLeft ? this.leftItems : this.rightItems;
    const otherItems = isLeft ? this.rightItems : this.leftItems;

    if (item.selected) {
      // Unselect the item and remove any associated line
      this.unmatchItem(item, isLeft);
    } else {
      // Select the item
      const selectedItem = items.find(i => i.selected);
      if (selectedItem) {
        selectedItem.selected = false;
        selectedItem.color = '';
      }
      item.selected = true;
      item.color = this.colors[this.currentColorIndex];

      // Check if there's a selected item on the other side to make a match
      const otherSelectedItem = otherItems.find(i => i.selected);
      if (otherSelectedItem) {
        this.matchItems(isLeft ? item : otherSelectedItem, isLeft ? otherSelectedItem : item);
      }
    }
  }

  unmatchItem(item: MatchItem, isLeft: boolean): void {
    item.selected = false;
    item.color = '';
    const lineIndex = this.lines.findIndex(l =>
      (isLeft && l.start === this.leftItems.indexOf(item)) ||
      (!isLeft && l.end === this.rightItems.indexOf(item))
    );
    if (lineIndex !== -1) {
      const line = this.lines[lineIndex];
      const otherItem = isLeft
        ? this.rightItems[line.end]
        : this.leftItems[line.start];
      otherItem.selected = false;
      otherItem.color = '';
      this.lines.splice(lineIndex, 1);
    }
  }

  matchItems(leftItem: MatchItem, rightItem: MatchItem): void {
    leftItem.color = this.colors[this.currentColorIndex];
    rightItem.color = this.colors[this.currentColorIndex];
    this.lines.push({
      start: this.leftItems.indexOf(leftItem),
      end: this.rightItems.indexOf(rightItem),
      color: this.colors[this.currentColorIndex]
    });
    this.currentColorIndex = (this.currentColorIndex + 1) % this.colors.length;
  }

  validate(): void {
    this.leftItems.forEach(item => {
      if (item.selected) {
        const matchedRightItem = this.rightItems.find(r => r.color === item.color);
        if (matchedRightItem) {
          item.matched = item.id === matchedRightItem.id;
          matchedRightItem.matched = item.matched;
        }
      }
    });
  }
}
