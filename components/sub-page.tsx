"use client";

import { MessageProvider } from "./messages/message-provider";
import { MessageList } from "./messages/message-list";
import { MessageInput } from "./messages/message-input";

export const SubPage: React.FC = () => (
  <MessageProvider>
    <div className="w-full h-full px-4 py-2 bg-white dark:bg-zinc-900 bg-[length:20px_20px] bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)]">
      <MessageList />
      <MessageInput />
    </div>
  </MessageProvider>
);
