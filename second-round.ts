export default null;

// 1-1
// 返り値の型は推論可能
function isPositive(num: number): boolean {
    return num >= 0;
}

// 1-2
interface User {
    name: string;
    age: number;
    private: boolean;
}
function showUserInfo(user: User) {}

// 1-3
type IsPositiveFunc = (num: number) => boolean;
const isPositive2: IsPositiveFunc = num => num >= 0;

// 1-4
// 返り値の型は推論可能
function sumOfPos(arr: number[]): number {
    return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 2-1
// 返り値の型は推論可能
function myFilter<T>(arr: T[], predicate: (elem :T) => boolean): T[] {
    const result = [];
    for (const elm of arr) {
        if (predicate(elm)) {
            result.push(elm);
        }
    }
    return result;
}

// 2-2
type Speed = 'slow' | 'medium' | 'fast';
function getSpeed(speed: Speed): number {
    switch(speed) {
        case 'slow':
            return 10;
        case 'medium':
            return 50;
        case 'fast':
            return 200;
    }
}

// 2-3
interface EventObj {
    capture?: boolean;
    once?: boolean;
    passive?: boolean;
}
declare function addEventListener(event: string, func: Function, obj?: EventObj): void;

// 2-4
// 返り値の型は推論可能
function giveId<T>(obj: T): T & {id: string} {
    const id = 'random';
    return {
        ... obj,
        id
    }
}

// 2-5
type UpdateFunc<T> = T | ((update: T) => T);
declare function useState<T>(init: T): [T, (updateFunc: UpdateFunc<T>) => void];
const [numState, setNumState] = useState(0);
setNumState(3);
setNumState(state => state + 10);
const [anotherState, setAnotherState] = useState<number | null>(null);
setAnotherState(100);

// 3-1
function mapFromArray<T extends object, K extends keyof T>(arr: T[], key: K) {
    const result = new Map();
    for (const obj of arr) {
        result.set(obj[key], obj);
    }
    return result;
}
const data = [
    {id: 1, name: "john smith"},
    {id: 2, name: "mary sue"},
    {id: 100, name: "taro yamada"}
];
const dataMap = mapFromArray(data, "id");

// 3-2
type MyPartial<T> = {
    [K in keyof T]?: T[K]
}
type T1 = MyPartial<{
    foo: number;
    bar: string;
}>;
type T2 = MyPartial<{
    hoge: {
        piyo: number
    }
}>;

// 3-3
interface EventPayloads {
    start: {
        user: string;
    };
    stop: {
        user: string;
        after: number;
    };
    end: {};
}
class EventDischarger<E> {
    emit<K extends keyof E>(eventName: K, payload: E[K]) {
    }
}
const ed = new EventDischarger<EventPayloads>();
ed.emit("start", {user: "user1"});
ed.emit("stop", {user: "user1", after: 3});
ed.emit("end", {});

// 3-4
type Action = {type: "increment", amount: number} |
    {type: "decrement", amount: number} |
    {type: "reset", value: number};
const reducer = (state: number, action: Action) => {
    switch (action.type) {
        case "increment":
            return state + action.amount;
        case "decrement":
            return state - action.amount;
        case "reset":
            return action.value;
    }
};
reducer(100, {type: 'increment', amount: 10}) === 110;
reducer(100, {type: 'decrement', amount: 55}) === 45;
reducer(500, {type: 'reset', value: 0}) === 0;

// 3-5
type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;
const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);
const f2: Func<undefined, number> = () => 0;
const v2: number = f2();
const v3: number = f2(undefined);
const f3: Func<number | undefined, number> = num => (num || 0) + 10;
const v4: number = f3(123);
const v5: number = f3();
