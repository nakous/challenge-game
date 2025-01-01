import { isPlatformBrowser } from '@angular/common';
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, PLATFORM_ID, Inject, Renderer2 } from '@angular/core';

interface Pair {
  id: number;
  left: string;
  right: string;
  image_left: string;
  image_right: string
}

@Component({
  selector: 'app-matching-text',
  templateUrl: './matching-text.component.html',
  styleUrl: './matching-text.component.css'
})
export class MatchingTextComponent implements OnInit, AfterViewInit {
  @ViewChild('canvas', { static: true }) canvasRef!: ElementRef<HTMLCanvasElement>;
  public isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private renderer2: Renderer2) {
    this.isBrowser = isPlatformBrowser(platformId);
    console.log('is browser')
  }
  nodeRadius = 8;
  defaultPairs: Pair[] = [
    { id: 1, left: "Apple can be app xnwjnjnbjxw  wxw", right: "Red", image_left: "", image_right: "" },
    { id: 2, left: "Banana", right: "Yellow", image_left: "/banana.jpg", image_right: "" },
    { id: 3, left: "Grapes", right: "Purple", image_left: "", image_right: "" },
    { id: 4, left: "Orange", right: "Orange", image_left: "", image_right: "" },
  ];

  pairs: Pair[] = this.defaultPairs;
  leftArr: Pair[] = [];
  rightArr: Pair[] = [];

  private ctx!: CanvasRenderingContext2D;
  private nodes: { x: number; y: number }[] = [];
  private edges: [{ x: number; y: number }, { x: number; y: number }][] = [];
  private activeNode: { x: number; y: number } | null | undefined = null;
  private mouse: { x: number; y: number } | null = null;
  private isDragging = false;

  ngOnInit() {
    this.leftArr = this.pairs.map(pair => pair).sort(() => Math.random() - 0.5);
    this.rightArr = this.pairs.map(pair => pair).sort(() => Math.random() - 0.5);
  }

  ngAfterViewInit() {
    console.log('is ngAfterViewInit')
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.initializeCanvas();
    this.animate();

    this.canvasRef.nativeElement.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.canvasRef.nativeElement.addEventListener('mousemove', this.onMouseMove.bind(this));
    this.canvasRef.nativeElement.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  private initializeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.canvas.width = 100;
    const { height, width } = canvas;
    const rowHeight = height / this.leftArr.length;
    const margin = this.nodeRadius * 2.5;

    this.nodes = [
      ...this.leftArr.map((_, i) => ({
        x: margin,
        y: i * rowHeight + rowHeight / 2
      })),
      ...this.rightArr.map((_, i) => ({
        x: width - margin,
        y: i * rowHeight + rowHeight / 2
      })),
    ];
  }

  private animate() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.edges.forEach(([start, end]) => {
      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'black';
      this.ctx.moveTo(start.x, start.y);
      this.ctx.lineTo(end.x, end.y);
      this.ctx.stroke();
    });

    this.nodes.forEach((node) => {
      this.ctx.beginPath();
      this.ctx.arc(node.x, node.y, this.nodeRadius, 0, Math.PI * 2);
      this.ctx.fillStyle = this.equalsNode(node, this.activeNode) ? 'black' : 'darkgrey';
      this.ctx.fill();
    });

    if (this.isDragging && this.activeNode && this.mouse) {
      const intentRadius = this.nodeRadius * 1.5;
      const closestNode = this.findClosestNode(this.nodes, this.mouse, intentRadius);
      const intent = closestNode || this.mouse;

      this.ctx.beginPath();
      this.ctx.lineWidth = 2;
      this.ctx.strokeStyle = 'red';
      this.ctx.setLineDash([3, 3]);
      this.ctx.moveTo(this.activeNode.x, this.activeNode.y);
      this.ctx.lineTo(intent.x, intent.y);
      this.ctx.stroke();
      this.ctx.setLineDash([]);
    }

    requestAnimationFrame(this.animate.bind(this));
  }

  private onMouseDown(e: MouseEvent) {
    if (this.mouse) {
      const closestNode = this.findClosestNode(this.nodes, this.mouse);
      this.activeNode = closestNode;
      this.isDragging = true;
    }
  }

  private onMouseMove(e: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    this.mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  }

  private onMouseUp(e: MouseEvent) {
    this.isDragging = false;

    if (this.mouse) {
      const intentRadius = this.nodeRadius * 1.5;
      const closestNode = this.findClosestNode(this.nodes, this.mouse, intentRadius);
      if (
        this.activeNode && closestNode &&
        !this.equalsNode(this.activeNode, closestNode) &&
        !this.sameVertical(this.activeNode, closestNode)
      ) {
        const edge = [this.activeNode, closestNode].sort((a, b) => a.x - b.x);
        this.addEdge(this.edges, edge as [{ x: number; y: number }, { x: number; y: number }]);
        this.activeNode = null;
      }
    }
  }

  private findClosestNode(nodes: { x: number; y: number }[], mouse: { x: number; y: number }, threshold = this.nodeRadius) {
    return nodes.find(node =>
      Math.abs(mouse.x - node.x) < threshold &&
      Math.abs(mouse.y - node.y) < threshold);
  }

  private equalsNode(n1: { x: number; y: number } | null, n2: { x: number; y: number } | null | undefined) {
    return n1 && n2 && n1.x === n2.x && n1.y === n2.y;
  }

  private sameVertical(p1: { x: number; y: number } | null, p2: { x: number; y: number } | null) {
    return p1 && p2 && p1.x === p2.x;
  }

  private addEdge(edges: [{ x: number; y: number }, { x: number; y: number }][], edge: [{ x: number; y: number }, { x: number; y: number }]) {
    if (!this.hasEdge(edges, edge)) {
      this.filterInPlace(edges, edges.filter((o) => this.equalsNode(edge[0], o[0])));
      edges.push(edge);
      return true;
    }
    return false;
  }

  private hasEdge(edges: [{ x: number; y: number }, { x: number; y: number }][], edge: [{ x: number; y: number }, { x: number; y: number }]) {
    return edges.some(otherEdge => this.equalsEdge(edge, otherEdge));
  }

  private equalsEdge(e1: [{ x: number; y: number }, { x: number; y: number }], e2: [{ x: number; y: number }, { x: number; y: number }]) {
    return this.equalsNode(e1[0], e2[0]) && this.equalsNode(e1[1], e2[1]);
  }

  private filterInPlace(arr: any[], rem: any[]) {
    arr
      .reduce((r: number[], e: any, i: number) => rem.includes(e) ? r.concat(i) : r, [] as number[])
      .sort((a: number, b: number) => b - a)
      .forEach((i: number) => arr.splice(i, 1));
  }

}