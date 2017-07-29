import { schema } from 'normalizr';

const idAttribute = '_id';

const User = new schema.Entity('users', {}, { idAttribute });
const UsersArray = new schema.Array(User);

const Message = new schema.Entity('messages', { author: User }, { idAttribute });
const MessagesArray = new schema.Array(Message);

const Chat = new schema.Entity(
    'chats',
    {
        creator: User,
        messages: MessagesArray,
        members: UsersArray,
        online: UsersArray
    },
    { idAttribute }
);
const ChatsArray = new schema.Array(Chat);

User.define({ chats: ChatsArray })

export {
    User,
    UsersArray,
    Message,
    MessagesArray,
    Chat,
    ChatsArray
}