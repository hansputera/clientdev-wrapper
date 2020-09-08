import axios from "axios";
import ClientError from "./ClientError";
import { BotResult, UserResult } from "./Types";

class ClientDEV {
    readonly baseURL = "https://bots-clientdev.glitch.me/api/bot/";
    readonly fetchuser = "https://api.frutbits.xyz/fetchUser?id=";
    constructor(){}

    async getBot(idbot: string) {
        const user_pattern = /\d{17, 19}/g;
        if (!user_pattern.test(idbot)) throw new ClientError("Invalid ID");
        const result = await axios.get(this.baseURL + "?q=" + idbot);
        if (result.data.status != 200) throw new ClientError(result.data.details);
        
        const structures: BotResult = {
            id: result.data.bot.id,
            prefix: result.data.bot.prefix,
            owner: await this.fetchUser(result.data.bot.owner),
            invite: result.data.bot.invite,
            queue: result.data.bot.queue
        };
        return structures;
    }

    async fetchUser(id: string) {
        const user_pattern = /\d{17, 19}/g;
        if (!user_pattern.test(id)) throw new ClientError("Invalid ID");
        const result = await axios.get(this.fetchuser + id).catch(e => { throw new ClientError(e.stack); });

        const structures: UserResult = {
            id: result.data.result.id,
            username: result.data.result.tag,
            avatar: result.data.result.displayAvatarURL
        }
        return structures;
    }
}

export { ClientDEV };