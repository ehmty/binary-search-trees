import { Tree } from "./index.js";

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

function createRandomArray(n) {
  const array = [];

  for (let i = 0; i < n; i++) {
    const random = Math.floor(Math.random() * 100);
    array.push(random);
  }
  return array;
}

const array = createRandomArray(20);
const test = new Tree(array);
prettyPrint(test.root);

console.log(test.isBalanced());
test.levelOrderForEach((value) => console.log(value));
test.inOrderForEach((value) => console.log(value));
test.preOrderForEach((value) => console.log(value));
test.postOrderForEach((value) => console.log(value));

test.insert(110);
test.insert(120);
test.insert(130);

prettyPrint(test.root);
console.log(test.isBalanced());

test.rebalance();

prettyPrint(test.root);
console.log(test.isBalanced());

test.levelOrderForEach((value) => console.log(value));
test.inOrderForEach((value) => console.log(value));
test.preOrderForEach((value) => console.log(value));
test.postOrderForEach((value) => console.log(value));
