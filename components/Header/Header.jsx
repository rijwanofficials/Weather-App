import styles from "./Header.module.css";

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <h1 className={styles.title} > 🌦️ Weather App</h1>
                <div className={styles.header2}>
                    <button>Today </button>
                    <button>Tommorow</button>
                    <button>Monthly Forecast</button>
                </div>
            </div >
        </>
    )
}

export default Header;