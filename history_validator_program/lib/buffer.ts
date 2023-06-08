import { utils } from "@project-serum/anchor";

export function addrToSeeds(buffer: Buffer | Uint8Array) {
  const addr = padBuffer(buffer, 64);
  return [addr.subarray(0, 32), addr.subarray(32, 64)];
}

export function padBuffer(buffer: Buffer | Uint8Array, targetSize: number) {
  if (!(buffer instanceof Buffer)) {
    buffer = Buffer.from(buffer);
  }

  if (buffer.byteLength > targetSize) {
    throw new RangeError(`Buffer is larger than target size: ${targetSize}`);
  }

  return Buffer.concat(
    [buffer, Buffer.alloc(targetSize - buffer.byteLength)],
    targetSize
  );
}

export function bufferFromString(str: string, bufferSize?: number) {
  const utf = utils.bytes.utf8.encode(str);

  if (!bufferSize || utf.byteLength === bufferSize) {
    return Buffer.from(utf);
  }

  if (bufferSize && utf.byteLength > bufferSize) {
    throw RangeError("Buffer size too small to fit the string");
  }

  return padBuffer(utf, bufferSize);
}

export function stringFromArray(array: number[]) {
  return (
    utils.bytes.utf8
      .decode(new Uint8Array(array))
      .replace(/\x00/g, "")
  );
}

