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

// 2-4
function giveId(obj: any) {
    const id = 'random string';
    return {
        ...obj,
        id
    };
}

// 2-5
type NewState<T> = (newState: T) => void;
type NewStateFunc<T> = (updateFunc: (param: T) => T) => void;
declare function useState<T>(initialState: T): [T, NewState<T>|NewStateFunc<T>];
const [numState, setNumState] = useState(0);
setNumState(3);
setNumState(state => state + 10);
