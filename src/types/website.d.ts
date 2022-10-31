export interface Website {
  id: string;
  link: string;
  type: "e-commerce" | "streaming";
  laws: Array<Law>;
}

export interface Law {
  name: string;
  description: string;
  exemplo: string;
  note: number;
}
