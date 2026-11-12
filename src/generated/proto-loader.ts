// Wrapper to statically import proto files
// This ensures they're loaded in the correct order and share global scope
import '../generated/goog-polyfill.js';

// @ts-ignore - Loading CommonJS modules
import '../generated/order_pb.js';
// @ts-ignore - Loading CommonJS modules
import '../generated/order_grpc_web_pb.js';

// Export the global proto namespace
export const getProtoClient = () => {
  const proto = (globalThis as any).proto;
  if (!proto || !proto.OrderServiceClient) {
    throw new Error('Proto modules not loaded');
  }
  return proto;
};
