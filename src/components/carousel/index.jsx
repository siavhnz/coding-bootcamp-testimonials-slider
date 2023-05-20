import styles from "./index.module.css";
import { data } from "../../store/data";
import { ReactComponent as NextIcon } from "../../assets/images/icon-next.svg";
import { ReactComponent as PrevIcon } from "../../assets/images/icon-prev.svg";

const Carousel = () => {
    return <div>
        {
            data.map((item, index) => {
                return <div key={index}>
                    <div>
                        <img src={item.image} alt={item.name} />
                        <div>
                            <button aria-label="prev slide">
                                <PrevIcon />
                            </button>
                            <button aria-label="next slide">
                                <NextIcon />
                            </button>
                        </div>
                    </div>
                    <div>
                        <p>{item.testimonial}</p>
                        <p>{item.name}</p>
                        <p>{item.role}</p>
                    </div>

                </div>
            })
        }
    </div>
}

export default Carousel;