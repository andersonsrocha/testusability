// export interface Website {
//   link: string;
//   type: "e-commerce" | "streaming";
//   step: number;
//   laws: Array<Law>;
//   finish: boolean;
// }

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
