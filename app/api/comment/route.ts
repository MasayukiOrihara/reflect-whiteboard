import { PromptTemplate } from "@langchain/core/prompts";
import { LangChainAdapter } from "ai";

import { formatMessage } from "@/lib/utils";
import { COMMENT_PROMPT, UNKNOWN_ERROR } from "@/lib/contents";
import { OpenAi4oMini } from "@/lib/models";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const messages = body.messages ?? [];

    console.log(" --- \n💬 COMMENT API");

    // メッセージ処理
    const currentUserMessage = messages[messages.length - 1].content;
    const formattedPreviousMessages = messages.slice(1).map(formatMessage);
    const prompt = PromptTemplate.fromTemplate(COMMENT_PROMPT);

    const stream = await prompt.pipe(OpenAi4oMini).stream({
      history: formattedPreviousMessages,
      user_message: currentUserMessage,
    });

    console.log("💬 COMPLITE \n --- ");

    return LangChainAdapter.toDataStreamResponse(stream);
  } catch (error) {
    console.log("💬 COMMENT API error :\n" + error);
    if (error instanceof Error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ error: UNKNOWN_ERROR }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
