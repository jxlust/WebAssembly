// import loader from "@assemblyscript/loader"; // or require
const defaultImportsObj = {
  env: {
    abort() {
      throw new Error("wasm error abort...");
    },
    abortLog: (_msg, _file, line, column) =>
      console.error(`Abort at ${line}:${column}`),
  },
};

class WasmLoader {
  constructor(imports = defaultImportsObj) {
    this._imports = imports;
  }
  async wasm(path, imports = this._imports) {
    if (!loader.instantiateStreaming) {
      //not support compileStreaming
      return await this.wasmFallback(path, imports);
    }
    const instance = await loader.instantiateStreaming(
      fetch(path),
      imports
    );
    return instance?.exports;
  }
  async wasmFallback(path, imports) {
    const response = await fetch(path);
    const bytes = response?.arrayBuffer();
    const  instance = await loader.instantiate(bytes, imports);
    return instance?.exports;
  }
}
