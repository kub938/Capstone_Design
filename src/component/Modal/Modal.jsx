import styles from './Modal.module.css';

function Modal(props) {
    return <>

        <div className={styles.backdrop} />
        <dialog open={true} className={styles.modal}>{props.children}</dialog>

    </>
}

export default Modal