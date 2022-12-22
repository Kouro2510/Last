import styles from './Featured.module.scss';
import classNames from 'classnames/bind';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { NumericFormat } from 'react-number-format';
import 'react-circular-progressbar/dist/styles.css';
import { useEffect, useState } from 'react';
import moment from 'moment';
import { getTurnover, getTurnoverWeek } from '~/services';
const cx = classNames.bind(styles);

function Featured() {
    let [date, setDate] = useState(moment(new Date()).format('YYYY-MM-DD'));
    const currentDate = moment(new Date()).format('YYYY-MM-DD');

    let [totalDay, setTotalDay] = useState('');
    let [totalWeek, setTotalWeek] = useState('');
    let [percent, setPercent] = useState('');

    useEffect(() => {
            const fetchApi = async () => {
                const res = await getTurnover(date);
                const week = await getTurnoverWeek();
                let arr = [];
                let arrWeek = [];
                if (res.errCode === 0) {
                    res.data.forEach((item) => {
                        arr.push(item.sub_total);

                        return;
                    });
                }
                if (week.errCode === 0) {
                    week.data.forEach((item) => {
                        arrWeek.push(item.sub_total);

                        return;
                    });
                }
                if (arrWeek && arrWeek.length > 0) {
                    let sum = arrWeek.reduce((acc, item) => {
                        return acc + item;
                    });
                    setTotalWeek(sum);
                } else {
                    setTotalWeek(0);
                }
                if (arr && arr.length > 0) {
                    let sum = arr.reduce((acc, item) => {
                        return acc + item;
                    });
                    setTotalDay(sum);
                    setPercent((sum * 100) / 15000000);
                } else {
                    setTotalDay(0);
                    setPercent(0);
                }
            };

            fetchApi().then(r => r);
        },
        [date]);

    const handleGetTurnover = async (e) => {
        console.log(typeof e.target.value);
        setDate(e.target.value);

        const res = await getTurnover(e.target.value);
        let arr = [];
        if (res.errCode === 0) {
            res.data.forEach((item) => {
                arr.push(item.sub_total);

                return;
            });
        }

        if (arr && arr.length > 0) {
            let sum = arr.reduce((acc, item) => {
                return acc + item;
            });
            setTotalDay(sum);
            setPercent((sum * 100) / 15000000);
        } else {
            setTotalDay(0);
            setPercent(0);
        }
    };
    return (
        <div className={cx('featured')}>
            <div className={cx('top')}>
                <h1 className={cx('title')}>Total Revenue</h1>
                <input value={date} type="date" onChange={(e) => handleGetTurnover(e)} />
            </div>
            <div className={cx('bottom')}>
                <div className={cx('featuredChart')}>
                    <CircularProgressbar
                        styles={buildStyles({
                            // Rotation of path and trail, in number of turns (0-1)
                            // rotation: 0.25,

                            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                            // strokeLinecap: 'butt',

                            // Text size
                            textSize: '16px',

                            // How long animation takes to go from one percentage to another, in seconds
                            // pathTransitionDuration: 0.5,

                            // Can specify path transition in more detail, or remove it entirely
                            // pathTransition: 'none',

                            // Colors
                            pathColor:
                                percent <= 25
                                    ? `rgba(199, 62, 62, ${percent})`
                                    : percent <= 50
                                    ? `rgba(231, 151, 22, ${percent})`
                                    : percent <= 75
                                    ? `rgba(137, 176, 34, ${percent})`
                                    : `rgba(62, 199, 109, ${percent})`,
                            textColor: 'black',
                            trailColor: '#d6d6d6',
                            backgroundColor: '#3e98c7',
                        })}
                        value={+percent}
                        text={`${Math.floor(percent)}%`}
                        strokeWidth={5}
                    />
                </div>
                <p className={cx('title')}>{`Tổng doanh thu ${
                    date === currentDate ? 'hôm nay' : moment(date).format('dddd - DD/MM/YYYY')
                }`}</p>
                <p className={cx('amount')}>
                    <NumericFormat
                        className="currency"
                        type="text"
                        value={totalDay}
                        displayType="text"
                        thousandSeparator={true}
                        suffix={'đ'}
                    />
                </p>
                <p className={cx('desc')}>
                    Doanh thu từ các đơn hàng trước đó, các đơn hàng gần đây có thể chưa được tính vào!
                </p>

                <div className={cx('summary')}>
                    <div className={cx('item')}>
                        <div className={cx('itemTitle')}>Mục tiêu/Ngày</div>
                        <div className={cx('itemResult')}>
                            <KeyboardArrowDownOutlined fontSize="medium" />
                            <div className={cx('resultAmount')}>
                                <NumericFormat
                                    className="currency"
                                    type="text"
                                    value="15000000"
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('itemTitle')}>7 ngày trước</div>
                        <div className={cx('itemResult')}>
                            <KeyboardArrowDownOutlined fontSize="medium" />
                            <div className={cx('resultAmount')}>
                                <NumericFormat
                                    className="currency"
                                    type="text"
                                    value={totalWeek}
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            </div>
                        </div>
                    </div>
                    <div className={cx('item')}>
                        <div className={cx('itemTitle')}>Tháng Trước</div>
                        <div className={cx('itemResult')}>
                            <KeyboardArrowDownOutlined fontSize="medium" />
                            <div className={cx('resultAmount')}>
                                <NumericFormat
                                    className="currency"
                                    type="text"
                                    value="7500000"
                                    displayType="text"
                                    thousandSeparator={true}
                                    suffix={'đ'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Featured;
