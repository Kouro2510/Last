import styles from './Chart.module.scss';
import classNames from 'classnames/bind';
const cx = classNames.bind(styles);

function Chart() {
    return <div className={cx('chart')}>Chart</div>;
}

export default Chart;
