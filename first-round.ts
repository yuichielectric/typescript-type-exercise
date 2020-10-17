export default null;

// 1-1
function isPositive(num: number): boolean {
    return num >= 0;
}

// 1-2
type User = {
    name: string,
    age: number,
    private: boolean
}

// 1-3
type IsPositiveFunc = (num: number) => boolean
const isPositive2: IsPositiveFunc = num => num >= 0

// 1-4
function sumOfPos(arr: number[]): number {
    return arr.filter(num => num >= 0).reduce((acc, num) => acc + num, 0);
}

// 2-1
function myFilter<T>(arr: T[], predicate: (elm: T) => boolean) {
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
    switch (speed) {
        case 'slow':
            return 10;
        case 'medium':
            return 50;
        case 'fast':
            return 200;
    }
}

// 2-3
type EventObject = { capture?: boolean, once?: boolean, passive?: boolean };
declare function addEventListener(event: string, handler: () => void, condition?: EventObject | boolean): void;

// 2-4 x
function giveId<T>(obj: T): T & { id: string } {
    const id = 'random string';
    return {
        ...obj,
        id
    };
}

// 2-5 x
type SetStateFunc<T> = T | ((old: T) => T);
declare function useState<T>(initialState: T): [T, (setStateFunc: SetStateFunc<T>) => void];
const [numState, setNumState] = useState(0);
setNumState(3);
setNumState(state => state + 10);

// 3-1 x
// keyof TがTのプロパティ名の集合
function mapFromArray<T, K extends keyof T>(arr: T[], key: K): Map<T[K], T> {
    const result = new Map();
    for (const obj of arr) {
        result.set(obj[key], obj);
    }
    return result;
}

// 3-2 x
type MyPartial<T> = {
    [K in keyof T]?: T[K]
}
type T1 = MyPartial<{
    foo: number;
    bar: string;
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
    emit<T extends keyof E>(eventName: T, payload: E[T]) {
    }
}

const ed = new EventDischarger<EventPayloads>();
ed.emit("start", { user: "user1" });
ed.emit("stop", { user: "user1", after: 3 });

// 3-4 x
type Reducer = {
    type: "increment";
    amount: number;
} | {
    type: "decrement";
    amount: number;
} | {
    type: "reset";
    value: number;
}
const reducer = (state: number, action: Reducer) => {
    switch (action.type) {
        case "increment":
            return state + action.amount;
        case "decrement":
            return state - action.amount;
        case "reset":
            return action.value;
    }
}

// 3-5 x
type Func<A, R> = undefined extends A ? (arg?: A) => R : (arg: A) => R;

const f1: Func<number, number> = num => num + 10;
const v1: number = f1(10);

const f2: Func<undefined, number> = () => 0;
const v2: number = f2();

// 4-1 x
function getFoo<T extends object>(obj: T): T extends { foo: infer E } ? E : unknown {
    return (obj as any).foo;
}

// 4-2 x
// Pick<T, K>はオブジェクトTのうち名前がKに含まれるプロパティのみを持つようなオブジェクトの型。
// Exclude<T, U>はTがユニオン型のとき、Tの構成要素のうちUの部分型であるものを除いた型。
function giveId2<T>(obj: T): Pick<T, Exclude<keyof T, "id">> & { id: string } {
    const id = 'random';
    return {
        ...obj,
        id
    }
}
const obj1 = giveId2({ foo: 123 });
const obj2 = giveId2({ num: 0, id: 100 });
obj2.id = "joge";

// 4-3 x
type Spread<Ev, EvOrig, E> = Ev extends keyof E ? EvOrig[] extends Ev[] ? E[Ev] : never : never;
class EventDischarger2<E> {
    emit<Ev extends keyof E>(eventName: Ev, payload: Spread<Ev, Ev, E>) {

    }
}
const ed2 = new EventDischarger2<EventPayloads>();
ed2.emit<"start" | "stop">("stop", { user: "user1" });

// 4-4 x
interface Data {
    foo: number;
    bar: string;
    baz: string;
}
type hoge = keyof Data;
type PartiallyPartial<T, K extends keyof T> = Partial<Pick<T, K>> & Pick<T, Exclude<keyof T, K>>;
type T2 = PartiallyPartial<Data, "foo" | "bar">;

// 4-5 x
type Spread2<T, K extends keyof T> = K extends keyof T ? PartiallyPartial<T, Exclude<keyof T, K>> : never;
type AtLeastOne<T> = Spread2<T, keyof T>;
interface Options {
    foo: number;
    bar: string;
    baz: boolean;
}
function test(options: AtLeastOne<Options>) {
    const { foo, bar, baz } = options;
}

// 4-6 x
type Page = { page: "top" } |
{ page: "mypage"; userName: string } |
{ page: "ranking"; articles: string[] };
type PageGenerators = {
    [P in Page["page"]]: (param: Extract<Page, {page: P}>) => string
};
const pageGenerators: PageGenerators = {
    top: () => "<p>top page</p>",
    mypage: ({ userName }) => `<p>Hello, ${userName}!</p>`,
    ranking: ({ articles }) => `<h1>ranking</h1><ul>${articles.map(name => `<li>${name}</li>`).join("")}</ul>`
};

// 4-7 x
type KeysOfType<Obj, Val> = {
    [K in keyof Obj]-?: Obj[K] extends Val ? K : never
}[keyof Obj];

// 4-8 x
type PickUndefined<Obj> = {
    [K in keyof Obj]-?: undefined extends Obj[K] ? K : never
}[keyof Obj];
type MapToNever<Obj> = {
    [K in keyof Obj]: never
}
type OptionalKeys<Obj> = PickUndefined<MapToNever<Obj>>;
