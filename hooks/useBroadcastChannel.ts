import { useEffect, useRef } from 'react';

interface BroadcastMessage {
  type: string;
  news?: any;
  timestamp?: number;
}

export const useBroadcastChannel = (
  channelName: string,
  onMessage: (data: BroadcastMessage) => void
) => {
  const channelRef = useRef<BroadcastChannel | null>(null);

  useEffect(() => {
    // Only create broadcast channel on client side
    if (typeof window !== 'undefined' && window.BroadcastChannel) {
      const channel = new BroadcastChannel(channelName);
      channelRef.current = channel;

      // Set up message listener
      channel.onmessage = (event) => {
        console.log(`[BroadcastChannel:${channelName}] Received:`, event.data);
        onMessage(event.data);
      };

      // Cleanup on unmount
      return () => {
        channel.close();
        channelRef.current = null;
      };
    }
  }, [channelName, onMessage]);

  // Function to broadcast a message
  const broadcast = (message: BroadcastMessage) => {
    if (channelRef.current) {
      console.log(`[BroadcastChannel:${channelName}] Sending:`, message);
      channelRef.current.postMessage({
        ...message,
        timestamp: Date.now()
      });
    }
  };

  return { broadcast };
};
