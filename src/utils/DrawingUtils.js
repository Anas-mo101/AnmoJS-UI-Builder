const bfsSearchAndDelete = (arr, id) => {
  if (Array.isArray(arr)) {
    for (let index = 0; index < arr.length; index++) {
      const element = arr[index];

      if (element?.content != null) {
        if (Array.isArray(element.content)) {
          element.content = bfsSearchAndDelete(element.content);
        } else if (typeof element.content === "object") {
          element.content = bfsSearchAndDelete(element.content);
          if (element.content.id === id) {
            delete element.content;
            return arr;
          }
        }
      }

      if (element.id === id) {
        arr.splice(index, 1);
        return arr;
      }
    }
  } else if (typeof arr === "object") {
    if (arr.id === id) {
      delete arr.content;
      return arr;
    }
  }

  // If the id wasn't found, return the original array.
  return arr;
};

const dfsSearchAndDelete = (arr, id) => {
  for (let i = 0; i < arr.length; i++) {

    // If the arr[i]ent object has the id we're searching for,
    // remove it from the array and return the updated array.
    if (arr[i].id === id) {
      arr.splice(i, 1);
      return arr;
    }

    // If the arr[i]ent object has an array of nested objects,
    // recursively call the function on the nested array.
    if (Array.isArray(arr[i])) {
      dfsSearchAndDelete(arr[i], id);
    }

    // If the arr[i]ent object has nested objects as properties,
    // recursively call the function on each nested object.
    if (typeof arr[i] === "object" && arr[i] !== null) {
      if (Array.isArray(arr[i].content)) {
        arr[i].content = dfsSearchAndDelete(arr[i].content, id);
      } else if (typeof arr[i].content === "object" && arr[i].content !== null) {
        arr[i].content = dfsSearchAndDelete([arr[i].content], id);
      }
    }
  }

  // If the id wasn't found, return the original array.
  return arr;
};

export { bfsSearchAndDelete, dfsSearchAndDelete };
