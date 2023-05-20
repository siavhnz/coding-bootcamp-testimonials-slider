import styles from "./index.module.css";
import { data } from "../../store/data";
import { ReactComponent as NextIcon } from "../../assets/images/icon-next.svg";
import { ReactComponent as PrevIcon } from "../../assets/images/icon-prev.svg";

const Carousel = () => {
    return <div className={styles.carousel}>
        {
            data.map((item, index) => {
                return <div key={index} className={styles["inner-carousel"]}>
                    <div className={styles["img-container"]}>
                        <div className={styles["inner-img-container"]}>
                            <img src={item.image} alt={item.name} />
                            <div className={styles.handlers}>
                                <button aria-label="prev slide">
                                    <PrevIcon />
                                </button>
                                <button aria-label="next slide">
                                    <NextIcon />
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className={styles.content}>
                        <p className={styles.testi}>“ {item.testimonial} ”</p>
                        <p className={styles.name}>{item.name}</p>
                        <p className={styles.role}>{item.role}</p>
                    </div>
                </div>
            })
        }
    </div>
}

export default Carousel;