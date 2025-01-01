import { TypeGame } from "./type-game.model";
import { Option } from "./option.model";


export class Game {
  readonly image: { desktop: string; mobile: string };;
  readonly question: string;
  readonly explain: string;
  readonly typeGame: TypeGame;
  readonly options: Option[];

  constructor(data: any) {
    this.image = data?.image || '';
    this.question = data?.question || '';
    this.explain = data?.explain || '';
    this.typeGame = data?.typeGame || TypeGame.MCQ;
    this.options = Array.isArray(data?.options) ? data.options : [];
  }

  async gameDataValidator(): Promise<boolean> {
    const [imageWidth, imageHeight] = await this.getImageSize();
    console.log(this.options);
    const areOptionsValid = this.options.every(option =>
      option.position &&
      option.position.x >= 0 && option.position.x <= imageWidth &&
      option.position.y >= 0 && option.position.y <= imageHeight
    );
    const hasMultipleOptions = this.options.length > 1;

    return areOptionsValid && hasMultipleOptions;
  }
  getImageByDevice(): string {
    // TODO : check device 
    return this.image.desktop
  }
  async getImageSize(): Promise<[number, number]> {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = this.getImageByDevice();
      img.onload = () => resolve([img.width, img.height]);
      img.onerror = () => resolve([0, 0]); // Handle errors by returning default size
    });
  }
}