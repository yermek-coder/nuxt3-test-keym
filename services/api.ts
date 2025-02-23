interface APIConfig extends RequestInit {
    headers?: Record<string, string>;
}

interface APIError {
    status: number;
    statusText: string;
    message: string;
    [key: string]: unknown;
}

class API {
    post<T = unknown>(path: string, body?: unknown, config?: APIConfig): Promise<T> {
        return this.exec<T>('post', path, body, config);
    }

    get<T = unknown>(path: string, config?: APIConfig): Promise<T> {
        return this.exec<T>('get', path, undefined, config);
    }

    private async exec<T = unknown>(
        method: RequestInit['method'],
        path: string,
        body?: unknown,
        config: APIConfig = {}
    ): Promise<T> {
        const headers: Record<string, string> = { ...config.headers };

        let processedBody: BodyInit | undefined = undefined;
        if (body !== undefined && body !== null) {
            if (body instanceof FormData) {
                processedBody = body;
            } else if (typeof body === "object") {
                processedBody = JSON.stringify(body);
                headers["Content-Type"] = "application/json";
            } else {
                processedBody = String(body);
            }
        }

        const response = await fetch(`/api/${path}`, {
            ...config,
            method,
            headers,
            body: processedBody
        });

        if (!response.ok) {
            const text = await response.text();
            let payload: Partial<APIError> = { message: text };

            try {
                payload = JSON.parse(text);
            } catch (e) {
                // Keep original text as message if parsing fails
            }

            throw {
                status: response.status,
                statusText: response.statusText,
                ...payload
            } as APIError;
        }

        const text = await response.text();
        if (!text) return {} as T;

        try {
            return JSON.parse(text) as T;
        } catch (err) {
            return text as T;
        }
    }
}

export default new API();