memory.grow(2); //2页 64 * 2 kb
//写入内存
store<u8>(0, 22);
store<u8>(1, 88);

function readMemory(n: i32): i32 {
  const valueAtIndex = load<u8>(n);
  return valueAtIndex;
}

export{
    readMemory
}