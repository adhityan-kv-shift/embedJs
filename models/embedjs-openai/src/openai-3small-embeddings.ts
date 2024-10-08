import { ClientOptions, OpenAIEmbeddings } from '@langchain/openai';
import { BaseEmbeddings } from '@llm-tools/embedjs-interfaces';

export class OpenAi3SmallEmbeddings implements BaseEmbeddings {
    private model: OpenAIEmbeddings;

    constructor(options?: { configuration?: ClientOptions; maxConcurrency: number; maxRetries: number }) {
        this.model = new OpenAIEmbeddings({
            modelName: 'text-embedding-3-small',
            configuration: options?.configuration,
            maxConcurrency: options?.maxConcurrency ?? 3,
            maxRetries: options?.maxRetries ?? 5,
        });
    }

    async getDimensions(): Promise<number> {
        return 1536;
    }

    async embedDocuments(texts: string[]): Promise<number[][]> {
        return this.model.embedDocuments(texts);
    }

    async embedQuery(text: string): Promise<number[]> {
        return this.model.embedQuery(text);
    }
}
