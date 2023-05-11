import styles from './Header.module.scss';
import PropTypes from 'prop-types';

export default function Header(props) {

    return (
        <header className={styles.top}>
            <div className={styles.title}>
                <h1>{props.title}</h1>
            </div>
            <div className={styles.buttonsBox}>

                <button
                    id={props.btn1Id}
                    onClick={props.onClickBtn1}
                    type={props.btn1Type}
                    form={props.btn1Form}
                >
                    {props.btn1Title}
                </button>

                <button
                    id={props.btn2Id}
                    onClick={props.onClickBtn2}
                    type={props.btn2Type}
                >
                    {props.btn2Title}
                </button>

            </div>
        </header>
    );
}

Header.propTypes = {
    title: PropTypes.string,
    btn1Type: PropTypes.string,
    btn1Form: PropTypes.string,
    btn2Type: PropTypes.string,
    btn1Id: PropTypes.string,
    btn2Id: PropTypes.string,
    btn1Title: PropTypes.string,
    btn2Title: PropTypes.string,
    onClickBtn1: PropTypes.func,
    onClickBtn2: PropTypes.func,
};