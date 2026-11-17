class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr) {
    const uniqueArr = arr
      .filter((value, index) => arr.indexOf(value) === index)
      .sort((a, b) => a - b);

    this.root = this.#buildTree(uniqueArr, 0, uniqueArr.length - 1);
  }

  #buildTree(arr, start, end) {
    if (start > end) return null;

    const mid = Math.floor(start + (end - start) / 2);
    const root = new Node(arr[mid]);

    root.left = this.#buildTree(arr, start, mid - 1);
    root.right = this.#buildTree(arr, mid + 1, end);

    return root;
  }

  includes(value) {
    let current = this.root;

    while (current) {
      if (current.data === value) return true;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    return false;
  }

  insert(value) {
    if (this.root === null) {
      this.root = new Node(value);
      return;
    }

    let current = this.root;

    while (current) {
      if (current.data === value) return;

      if (value < current.data) {
        if (current.left === null) {
          current.left = new Node(value);
          return;
        }
        current = current.left;
      } else {
        if (current.right === null) {
          current.right = new Node(value);
          return;
        }
        current = current.right;
      }
    }
  }

  deleteItem(value) {
    let current = this.root;
    let parent = null;

    while (current) {
      if (current.data === value) {
        if (current.left !== null && current.right !== null) {
          parent = current;
          let succ = current.right;

          while (succ.left) {
            parent = succ;
            succ = succ.left;
          }

          current.data = succ.data;

          if (succ === parent.left) {
            parent.left = succ.right;
          } else {
            parent.right = succ.right;
          }
        } else {
          const replacement =
            current.left !== null ? current.left : current.right;

          if (parent === null) {
            this.root = replacement;
          } else if (parent.right === current) {
            parent.right = replacement;
          } else if (parent.left === current) {
            parent.left = replacement;
          }
        }

        return;
      }

      parent = current;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  levelOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }
    if (this.root === null) return;

    const queue = [this.root];

    while (queue.length > 0) {
      const current = queue.shift();

      callback(current.data);

      if (current.left) {
        queue.push(current.left);
      }

      if (current.right) {
        queue.push(current.right);
      }
    }
  }

  inOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      callback(node.data);
      traverse(node.right);
    }

    traverse(this.root);
  }

  preOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    function traverse(node) {
      if (node === null) return;

      callback(node.data);
      traverse(node.left);
      traverse(node.right);
    }

    traverse(this.root);
  }

  postOrderForEach(callback) {
    if (typeof callback !== "function") {
      throw new Error("Callback is required");
    }

    function traverse(node) {
      if (node === null) return;

      traverse(node.left);
      traverse(node.right);
      callback(node.data);
    }

    traverse(this.root);
  }

  height(value) {
    function getHeight(node) {
      if (node === null) return -1;

      const leftHeight = getHeight(node.left);
      const rightHeight = getHeight(node.right);

      return 1 + Math.max(leftHeight, rightHeight);
    }

    let current = this.root;
    while (current) {
      if (value === current.data) return getHeight(current);

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
  }

  depth(value) {
    let current = this.root;
    let counter = 0;

    while (current) {
      if (value === current.data) return counter;

      if (value < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      counter++;
    }

    return undefined;
  }

  isBalanced() {
    function checkBalance(node) {
      if (node === null) return -1;

      const leftHeight = checkBalance(node.left);
      const rightHeight = checkBalance(node.right);

      if (leftHeight === -2 || rightHeight === -2) return -2;

      if (Math.abs(leftHeight - rightHeight) > 1) return -2;

      return 1 + Math.max(leftHeight, rightHeight);
    }

    return checkBalance(this.root) !== -2;
  }

  rebalance() {
    const values = [];
    this.inOrderForEach((value) => values.push(value));

    this.root = this.#buildTree(values, 0, values.length - 1);
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const test = new Tree(arr);

prettyPrint(test.root);
