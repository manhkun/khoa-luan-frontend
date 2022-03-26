import moment from "moment";

const getTimePosted = (time) => moment.utc(time).local().startOf('seconds').fromNow();

export { getTimePosted };
