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

test.insert(2);

test.deleteItem(67);
prettyPrint(test.root);
