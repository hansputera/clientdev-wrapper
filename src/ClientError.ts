export default class ClientError extends Error {
    constructor(public name: string, message?: string) {
        super(message);
    }
}