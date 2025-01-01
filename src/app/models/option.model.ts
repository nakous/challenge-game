export class Option {
    text: string;
    position: { x: number; y: number };
    answer: string;
  
    constructor(data: any) {
      this.text = data.text || '';
      this.position = data.position || { x: 0, y: 0 };
      this.answer = data.answer || ''
    }
  }