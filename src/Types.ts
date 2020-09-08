export interface BotResult {
    id: string,
    prefix: string,
    owner: UserResult
    invite: string,
    queue: boolean
}

export interface UserResult {
    id: string,
    username: string,
    avatar: string
}