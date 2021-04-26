
# MessAnger API

## Users

User authentication

### POST /login

Login in a user.

`/api/users/login`

#### Request

```typescript
{
    username: string,
    password: string 
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'incomplete' | 'error';
    username?: string,
    userId?: string,
    token?: string
}
```

### POST /logout

Logout a token/user

`/api/users/logout`

#### Request

```typescript
{
    token: string
}
```

#### Response

```typescript
{
    success: boolean
    response: 'success' | 'unknown' | 'incomplete' | 'error'
}
```

### POST /checktoken

Check if token still valid

`/api/users/checktoken`

#### Request

```typescript
{
    token: string 
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'expired' | 'unknown' | 'incomplete' | 'error'
}
```

### POST /register

Register new user

`/api/users/register`

#### Request

```typescript
{
    username: string,
    password: string,
    email: string,
    bio?: string
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'username taken' | 'username inappropriate' | 'email taken' | 'email invalid' | 'incomplete' | 'error',
    userId: string
}
```

### GET /getdata

Get all data relating to user. GPDR Compliance

`/api/user/getdata`

#### Request 

```typescript
{
    token: string
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'incomplete' | 'error',
    userId: string,
    username: string,
    email: string,
    bio: string,
    joinedRooms: string[], // roomId[]
    createdRooms: string[], // roomId[]
    messages: string[], // messageId[]
    lastOnline: Date,
    createdAt: Date
}
```

## Rooms

Handling data fetching, creation, etc.

### GET /getall

Get a list of all rooms.
Without special token: retrivate a list of all public rooms.
With special token: retrieve a list of all rooms, with specified types.

`/api/rooms/getall`

#### Request

```typescript
{
    types?: ['public'?, 'hidden'?, 'private'?],
    specialToken?: string
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'denied' | 'error',
    rooms: [
        {
            roomId: string,
            name: string,
            descript: string,
            creator: string, // userId
            users: string[], // userId[] 
            status: 'public' | 'hidden' | 'private',
            messages: string[], // messageId[]
            messageCount: number,
            createdAt: Date
        }
    ]
}
```

### GET /get

Get details of a specified room.
If private, specify password, or valid user token.

`/api/rooms/get`

#### Request

```typescript
{
    room: string, // roomId
    password?: string,
    token?: string,
}
```

#### Response 

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'denied' | 'incomplete' | 'error',
    roomId: string,
    name: string,
    description: string,
    creator: string, // userId
    users: string[], // userId[] 
    status: 'public' | 'hidden' | 'private',
    messages: string[], // messageId[]
    messageCount: number,
    createdAt: Date
}
```

### GET /search

Get a list of public rooms, complying to search string.

`/api/rooms/search`

#### Request

```typescript
{
    search: string,
    amount?: number
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'no result' | 'incomplete' | 'error',
    rooms: string[], // roomId
}
```

### GET /getconstrained

Get a list of all public rooms, complying with the spefied constrains.

`/api/rooms/getconstrained`

#### Request

```typescript
{
    sortBy: 'default' | 'userCount' | 'messageCount' | 'date',
    sortType: 'default' | 'ascending' | 'descending',
    amount: number,
    name?: string,
    description?: string,
    creator?: string, // userId,
    userCount?: number,
    messageCount?: number,
    createdBefore?: Date,
    createdAfter?: Date
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'no result' | 'incomplete' | 'error',
    rooms: string[], // roomId[]
}
```

### GET /getuser

Get all rooms relating to user

`/api/rooms/getuser`

#### Request

```typescript
{
    token: string,
    relation: ['joined'?, 'created'?],
    types: ['public'?, 'hidden'?, 'private'?]
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'denied' | 'no result' | 'incomplete' | 'error',
    rooms: string[], // roomId
}
```

### GET /getlist

Get a list containing the data, for a specified list of rooms.
Specify token, if rooms are private, and relating to user.
Specify special token, if rooms are private, with no relation.

`/api/rooms/getlist`

#### Request

```typescript
{
    rooms: string[], // roomId 
    token?: string,
    specialToken?: string,
}
```

#### Response

```typescript
[
    {
        roomId: string,
        name: string,
        descript: string,
        creator: string, // userId
        users: string[], // userId[] 
        status: 'public' | 'hidden' | 'private',
        messages: string[], // messageId[]
        messageCount: number,
        createdAt: Date
    }
]
```

### POST /create

Create new room

`/api/rooms/create`

#### Request

```typescript
{
    token: string, // auth token
    name: string,
    description: string,
    status: 'public' | 'hidden' | 'private',
    password: string,
}
```

#### Response

```typescript
{
    success: boolean, 
    response: 'success' | 'name taken' | 'no password' | 'unknown' | 'incomplete' | 'error',
    roomId: string
}
```

### POST /join

Join a room, specify password if private, else leave empty

`/api/rooms/join`

#### Request

```typescript
{
    token: string,
    roomId: string,
    password: string,
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'already joined' | 'unknown token' | 'unknown room' | 'denied' | 'incomplete' | 'error'
}
```

## Messages

Handling messages

### GET /get

Get message data from a specified messageId

`/api/messages/get`

#### Request

```typescript
{
    messageId: string,
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'incomplete' | 'error',
    messageId: string,
    roomId: string,
    message: string,
    author: string, // userId
    timestamp: Date
}
```

### GET /getlist

Get all messages from a list of messageIds,
sorted by timestamp, first to last

`/api/messages/getlist`

#### Request

```typescript
{
    messages: string[] // messageId
}
```

#### Response

```typescript
[
    {
        messageId: string,
        roomId: string,
        message: string,
        author: string, // userId
        timestamp: Date
    }
]
```

### POST /post

Post a message to a room

`/api/messages/post`

#### Request

```typescript
{
    token: string,
    roomId: string,
    message: string
}
```

#### Response

```typescript
{
    success: boolean,
    response: 'success' | 'unknown' | 'denied' | 'incomplete' | 'error',
    messageId: string,
}
```
