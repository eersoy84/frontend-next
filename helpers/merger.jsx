export function mergeArrays(arr1, arr2) {
  const tmp = [];
  for (const k in arr2) {
    tmp[arr2[k].adId] = arr2[k];
  }
  const mergedList = [];
  for (const k in arr1) {
    const product = { ...arr1[k], ...tmp[arr1[k].adId] };
    mergedList.push(product);
  }
  return mergedList;
}
