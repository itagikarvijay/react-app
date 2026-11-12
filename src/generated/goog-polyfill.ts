// Minimal Google Closure Library polyfill for gRPC-Web
import protobuf from 'google-protobuf';
import * as grpcWeb from 'grpc-web';

declare global {
  var goog: any;
  var proto: any;
  var jspb: any;
  var require: any;
}

const globalObj = (typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : {}) as any;

if (!globalObj.require) {
  globalObj.require = function(moduleName: string) {
    if (moduleName === 'google-protobuf' || moduleName === 'google-protobuf.js') {
      return protobuf;
    }
    return {};
  };
}

if (!globalObj.exports) {
  globalObj.exports = {};
}

if (!globalObj.module) {
  globalObj.module = {
    exports: globalObj.exports,
  };
}

if (!globalObj.jspb) {
  globalObj.jspb = {
    Message: protobuf.Message,
    BinaryReader: (protobuf as any).BinaryReader,
    BinaryWriter: (protobuf as any).BinaryWriter,
    ByteString: (protobuf as any).ByteString,
  };
}

if (!globalObj.goog) {
  globalObj.goog = {
    modules: {},
    DEBUG: false,
  };

  globalObj.goog.provide = function(name: string) {
    const parts = name.split('.');
    let obj: any = globalObj;
    for (let i = 0; i < parts.length; i++) {
      if (!obj[parts[i]]) {
        obj[parts[i]] = {};
      }
      obj = obj[parts[i]];
    }

    if (parts[0] === 'proto') {
      if (!globalObj.proto) {
        globalObj.proto = {};
      }
      let protoObj: any = globalObj.proto;
      for (let i = 1; i < parts.length; i++) {
        if (!protoObj[parts[i]]) {
          protoObj[parts[i]] = {};
        }
        protoObj = protoObj[parts[i]];
      }
    }
  };

  globalObj.goog.require = function(_name: string) {
    return true;
  };

  globalObj.goog.requireType = function(_name: string) {
    return true;
  };

  globalObj.goog.scope = function(fn: Function) {
    return fn.call(globalObj.goog);
  };

  globalObj.goog.exportSymbol = function(name: string, obj: any) {
    const parts = name.split('.');
    let target: any = globalObj;
    for (let i = 0; i < parts.length - 1; i++) {
      if (!target[parts[i]]) {
        target[parts[i]] = {};
      }
      target = target[parts[i]];
    }
    target[parts[parts.length - 1]] = obj;
  };

  globalObj.goog.inherits = function(child: any, parent: any) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.constructor = child;
  };

  globalObj.goog.object = {
    extend(target: any, source: any) {
      for (const key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
      return target;
    },
  };

  if (!globalObj.grpc) {
    globalObj.grpc = {};
  }

  const grpcWebApi = {
    MethodDescriptor: (grpcWeb as any).MethodDescriptor,
    MethodType: (grpcWeb as any).MethodType,
    GrpcWebClientBase: (grpcWeb as any).GrpcWebClientBase,
    AbstractClientBase: (grpcWeb as any).AbstractClientBase,
    ClientReadableStream: (grpcWeb as any).ClientReadableStream,
    RpcError: (grpcWeb as any).RpcError,
    ClientOptions: (grpcWeb as any).CallOptions,
  };

  globalObj.grpc.web = grpcWebApi;

  if (typeof globalObj.COMPILED === 'undefined') {
    (globalObj as any).COMPILED = false;
  }
}

export {};
