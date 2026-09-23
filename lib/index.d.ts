import _makeWASocket from './Socket/index.js';
import { UserFacingSocketConfig } from './Types/index.js';
import { enableCallAutoAnswer, getActiveVoipClient } from './Caller/auto-answer.js';
import { printChamaBanner } from './Caller/banner.js';
import { attachProMethods } from './Pro/index.js';

export * from '../WAProto/index.js';
export * from './Utils/index.js';
export * from './Types/index.js';
export * from './Defaults/index.js';
export * from './WABinary/index.js';
export * from './WAM/index.js';
export * from './WAUSync/index.js';
export * from './Caller/auto-answer.js';
export * from './Caller/banner.js';
export { printChamaBanner, enableCallAutoAnswer, getActiveVoipClient, attachProMethods };

export interface CallConfig {
    audio?: string;
    audioSource?: string;
    autoAnswer?: boolean;
    answerDelayMs?: number;
    durationMs?: number;
    onCall?: (call: any) => void;
    onAnswer?: (call: any) => void;
    onEnd?: (call: any, reason?: any) => void;
}

export type EnhancedSocketConfig = UserFacingSocketConfig & {
    callConfig?: CallConfig;
};

export interface ProMethods {
    sendPoll: (jid: string, pollData: any) => Promise<any>;
    sendPollVote: (jid: string, pollKeyOrMsg: any, selectedOptions: string | string[]) => Promise<any>;
    getAggregatePollVotes: (pollMsg: any) => Promise<any>;
    newsletterVoteMessage: (jid: string, serverId: string | number, option: string | number) => Promise<any>;
    newsletterReact: (jid: string, serverId: string | number, reaction: string) => Promise<any>;
    newsletterGetMessages: (jid: string, count?: number, since?: number, after?: number) => Promise<any>;
    newsletterSearch: (query: string) => Promise<any>;
    newsletterList: () => Promise<any>;
    sendStatusText: (text: string, options?: any) => Promise<any>;
    sendStatusMedia: (media: any, options?: any) => Promise<any>;
    readStatus: (key: any) => Promise<any>;
    reactStatus: (key: any, emoji: string) => Promise<any>;
    editMessage: (jid: string, key: any, newText: string) => Promise<any>;
    deleteMessage: (jid: string, key: any) => Promise<any>;
    pinMessage: (jid: string, key: any, durationInSeconds?: number) => Promise<any>;
    unpinMessage: (jid: string, key: any) => Promise<any>;
    starMessage: (jid: string, key: any, star?: boolean) => Promise<any>;
    reactMessage: (jid: string, key: any, emoji: string) => Promise<any>;
    sendPresence: (jid: string, presence: string) => Promise<any>;
    reply: (jid: string, text: string, quotedMessage: any) => Promise<any>;
    groupGetInviteInfo: (code: string) => Promise<any>;
    groupJoinViaInvite: (code: string) => Promise<any>;
    groupSetAnnouncement: (jid: string, onlyAdminsCanSend?: boolean) => Promise<any>;
    groupSetLocked: (jid: string, onlyAdminsCanEdit?: boolean) => Promise<any>;
    groupRequestParticipantsList: (jid: string) => Promise<any>;
    groupApproveParticipants: (jid: string, participants: string[]) => Promise<any>;
    groupRejectParticipants: (jid: string, participants: string[]) => Promise<any>;
    checkNumber: (phoneNumber: string) => Promise<any>;
    setBio: (text: string) => Promise<any>;
    updateProfileName: (name: string) => Promise<any>;
    setProfilePicture: (jid: string, content: any) => Promise<any>;
    removeProfilePicture: (jid: string) => Promise<any>;
    rejectCall: (callId: string, callFrom: string) => Promise<any>;
}

export type WASocket = ReturnType<typeof _makeWASocket> & ProMethods & {
    enableCallAutoAnswer: (opts?: CallConfig) => ReturnType<typeof enableCallAutoAnswer>;
};

declare const makeWASocket: (config?: EnhancedSocketConfig) => WASocket;

export { makeWASocket };
export default makeWASocket;