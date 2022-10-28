export interface Test {
  sites: Array<Website>;
}

export interface Website {
  link: string;
  type: "e-commerce" | "streaming";
  step: number;
  laws: Array<Law>;
  finish: boolean;
}

export interface Law {
  name: string;
  description: string;
  note: number;
}
