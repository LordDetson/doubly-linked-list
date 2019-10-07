const Node = require('./node');

class LinkedList {

    constructor(head = null, tail = null, isRevers = false, length = 0) {
        this._head = head;
        this._tail = tail;
        this._isReversed = isRevers;
        this.length = length;
    }

    _currentList() {
        return new LinkedList(this._tail, this._head, this._isReversed, this.length);
    }

    append(data) {
        let node = new Node(data);
        if (this.isEmpty()) {
            this._head = node;
            this._tail = node;
        } else {
            if (!this._isReversed) {
                this._tail.next = node;
                node.prev = this._tail;
                this._tail = node;
            } else {
                this._head.prev = node;
                node.next = this._head;
                this._head = node;
            }
        }
        this.length++;
        return this._currentList();
    }

    head() {
        if (this.isEmpty())
            return null;
        if (!this._isReversed)
            return this._head.data;
        else
            return this._tail.data;
    }

    tail() {
        if (this.isEmpty())
            return null;
        if (!this._isReversed)
            return this._tail.data;
        else
            return this._head.data;
    }

    at(index) {
        let node = this._getNodeByIndex(index);
        return node != null ? node.data : -1;
    }

    insertAt(index, data) {
        if (index <= this.length) {
            if (index === 0) {
                this._insertHead(data);
            } else if (index === this.length) {
                this._insertTail(data);
            } else {
                this._insertInner(index, data);
            }
        }
        return this._currentList();
    }

    _insertHead(data) {
        let node = new Node(data);
        if (this.isEmpty()) {
            this._head = node;
            this._tail = node;
        } else {
            if (!this._isReversed) {
                node.next = this._head;
                this._head.prev = node;
                this._head = node;
            } else {
                node.prev = this._tail;
                this._tail.next = node;
                this._tail = node;
            }
        }
        this.length++;
    }

    _insertTail(data) {
        let node = new Node(data);
        if (!this._isReversed) {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        } else {
            node.next = this._head;
            this._head.prev = node;
            this._head = node;
        }
        this.length++;
    }

    _insertInner(index, data) {
        let node = new Node(data);
        let i = 1;
        if (!this._isReversed) {
            let current = this._head.next;
            do {
                if (i === index) {
                    node.prev = current.prev;
                    node.next = current;
                    node.prev.next = node;
                    current.prev = node;
                    this.length++;
                    return;
                }
                current = current.next;
                i++;
            } while (current === null);
        } else {
            let current = this._tail.prev;
            do {
                if (i === index) {
                    node.prev = current;
                    node.next = current.next;
                    node.next.prev = node;
                    current.next = node;
                    this.length++;
                    return;
                }
                current = current.prev;
                i++;
            } while (current === null);
        }
    }

    isEmpty() {
        return this.length === 0;
    }

    clear() {
        this._head = null;
        this._tail = null;
        this.length = 0;
        return this._currentList();
    }

    deleteAt(index) {
        if (index < this.length) {
            if (index === 0) {
                this._deleteHead();
            } else if (index === this.length - 1) {
                this._deleteTail();
            } else {
                this._deleteInner(index);
            }
        }
        return this._currentList();
    }

    _deleteHead() {
        if (!this._isReversed) {
            if (this.length === 1) {
                this.clear();
                return;
            }
            this._head = this._head.next;
            this._head.prev = null;
        } else {
            if (this.length === 1) {
                this.clear();
                return;
            }
            this._tail = this._tail.prev;
            this._tail.next = null;
        }
        this.length--;
    }

    _deleteTail() {
        if (!this._isReversed) {
            this._tail = this._tail.prev;
            this._tail.next = null;
        } else {
            this._head = this._head.next;
            this._head.prev = null;
        }
        this.length--;
    }

    _deleteInner(index) {
        let i = 1;
        if (!this._isReversed) {
            let current = this._head.next;
            do {
                if (i === index) {
                    let left = current.prev;
                    let right = current.next;
                    left.next = right;
                    right.prev = left;
                    this.length--;
                    return;
                }
                current = current.next;
                i++;
            } while (current != null);
        } else {
            let current = this._tail.prev;
            do {
                if (i === index) {
                    let left = current.next;
                    let right = current.prev;
                    left.prev = right;
                    right.next = left;
                    this.length--;
                    return;
                }
                current = current.prev;
                i++;
            } while (current != null);
        }
    }

    reverse() {
        this._isReversed = this._isReversed === false;
        return this._currentList();
    }

    indexOf(data) {
        if (!this.isEmpty()) {
            let i = 0;
            let current;
            if (!this._isReversed) {
                current = this._head;
                do {
                    if (current.data === data) {
                        return i;
                    }
                    current = current.next;
                    i++;
                } while (current != null);
            } else {
                current = this._tail;
                do {
                    if (current.data === data) {
                        return i;
                    }
                    current = current.prev;
                    i++;
                } while (current != null);
            }
        }
        return -1;
    }

    _getNodeByIndex(index) {
        if (!this.isEmpty() && index < this.length) {
            let i = 0;
            if (!this._isReversed) {
                let current = this._head;
                do {
                    if (i === index) {
                        return current
                    }
                    current = current.next;
                    i++;
                } while (current != null && i <= index);
            } else {
                let current = this._tail;
                do {
                    if (i === index) {
                        return current
                    }
                    current = current.prev;
                    i++;
                } while (current != null && i <= index);
            }
        }
        return null;
    }
}

module.exports = LinkedList;
