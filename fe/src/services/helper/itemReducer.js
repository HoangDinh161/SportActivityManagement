const optionsDate = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
};
const optionsTime = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
};

export const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, ...action.data];
        case 'UPDATE':
            state[action.id] = action.data;
            return state;
        case 'DELETE':
            // state.splice(action.id, 1);
            return state.filter((item, index) => index !== action.id);
        default:
            return state;
    }
};

export const caculateCanlanders = (games) => {
    games.sort((a, b) => {
        let na = new Date(a.startDate);
        let nb = new Date(b.startDate);
        if (na - nb === 0) {
            return a.startTime.localeCompare(b.startTime);
        }
        return na - nb;
    });

    const arrDate = games.reduce((prev, current, index) => {
        let cur = { ...current };
        let curDate = new Date(cur.startDate + ' ' + cur.startTime);
        var endTime, stringEndTime;
        if (cur.endTime) {
            endTime = new Date(cur.startDate + ' ' + cur.endTime);
            stringEndTime = endTime.toLocaleTimeString('en-US', optionsTime);
            cur.endTime = stringEndTime;
        }
        let stringCurDate = curDate.toLocaleDateString('vi-en', optionsDate);
        let stringCurTime = curDate.toLocaleTimeString('en-US', optionsTime);
        cur.startTime = stringCurTime;
        let dayScheduleId = prev.findIndex((item) => {
            return item.day === stringCurDate;
        });
        cur.gameId = index;
        if (dayScheduleId > -1) {
            prev[dayScheduleId].subGames.push(cur);
        } else {
            let newDay = {
                day: stringCurDate,
                subGames: [cur],
            };
            prev.push(newDay);
        }

        return prev;
    }, []);
    // console.log(arrDate);

    return arrDate;
};

export const convertDateTimeToLocaleString = (day, time = '') => {
    let date = day.split('T')[0];
    if (time) {
        let nDate = new Date(date + ' ' + time);
        let stringDate = nDate.toLocaleDateString('vi-en', optionsDate);
        let stringTime = nDate.toLocaleTimeString('en-US', optionsTime);
        return {
            date: stringDate,
            time: stringTime,
        };
    } else {
        let nDate = new Date(day);
        return { date: nDate.toLocaleDateString('vi-en', optionsDate) };
    }
};
export const compareDate = (day1, time1 = '', day2 = '', time2 = '') => {
    let day = Date.now();
    let convertDay1 = day1.split('T')[0];
    let date1, convertDay2, date2;
    if (time1) {
        let nDate1 = new Date(convertDay1 + ' ' + time1);
        date1 = nDate1.getTime();
    }
    if (day2) {
        convertDay2 = day2.split('T')[0];
        if (time2) {
            let nDate2 = new Date(convertDay2 + ' ' + time2);
            date2 = nDate2.getTime();
        }
    }
    if (date2) {
        return day >= date1 && day <= date2;
    }
    return day >= date1;
};
