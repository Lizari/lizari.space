const parse = (datetime: string) => {
    return new Date(datetime.replace(/-/g, "/"));
}

const compare = (a: Date, b: Date) => {
    return b.getTime() - a.getTime();
}

export default {
    parse,
    compare,
};