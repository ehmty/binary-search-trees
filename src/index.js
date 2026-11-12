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
}
