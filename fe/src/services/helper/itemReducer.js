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
