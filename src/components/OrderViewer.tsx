import { useState, useEffect, type JSX } from 'react';
// Import proto loader which statically loads all dependencies
import { getProtoClient } from '../generated/proto-loader';

type OrderResponseObject = {
  id: number;
  status: string;
};

function OrderViewer(): JSX.Element {
  const [order, setOrder] = useState<OrderResponseObject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [client, setClient] = useState<any>(null);
  const [orderPb, setOrderPb] = useState<any>(null);

  // Initialize gRPC client on mount
  useEffect(() => {
    try {
      const proto = getProtoClient();
      const newClient = new proto.OrderServiceClient('http://localhost:9092', null, null);
      setClient(newClient);
      setOrderPb(proto);
    } catch (err) {
      console.error('Failed to initialize gRPC client:', err);
      setError(`Failed to initialize gRPC client: ${err instanceof Error ? err.message : String(err)}`);
    }
  }, []);

  const fetchOrder = (id: number): void => {
    if (!client || !orderPb) {
      setError('gRPC modules not loaded yet');
      return;
    }

    try {
      const accessToken = localStorage.getItem('access_token');
      console.log('Access token retrieved from localStorage:', accessToken);
      const request = new orderPb.OrderId();
      request.setId(id);
      const metadata = {
        Authorization: 'Bearer ' + accessToken, // your token
        deadline: (Date.now() + 5000).toString(), // 5 seconds from now
      };
      client.getOrder(request, metadata, (err: any, response?: any) => {
        console.log('gRPC response:', response);
        if (err) {
          setError(err.message);
          return;
        }

        if (!response) {
          setOrder(null);
          setError('No order response received from server');
          return;
        }

        const payload = response.toObject ? response.toObject() : response;
        setError(null);
        setOrder({
          id: Number(payload?.id ?? 0),
          status: String(payload?.status ?? ''),
        });
      });
    } catch (err) {
      setError(`Error fetching order: ${err instanceof Error ? err.message : String(err)}`);
    }
  };

  return (
    <div>
      <button onClick={() => fetchOrder(123)}>Get Order #123</button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {order && (
        <div>
          <h3>Order Details</h3>
          <p>ID: {order.id}</p>
          <p>Status: {order.status}</p>
        </div>
      )}
    </div>
  );
}

export default OrderViewer;