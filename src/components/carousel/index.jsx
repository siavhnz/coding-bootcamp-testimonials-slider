import styles from "./index.module.css";
import { data } from "../../store/data";
import { ReactComponent as NextIcon } from "../../assets/images/icon-next.svg";
import { ReactComponent as PrevIcon } from "../../assets/images/icon-prev.svg";
import { AnimatePresence, motion, useMotionValue } from "framer-motion";
import { wrap } from "popmotion"
import { useRef, useState, useEffect } from "react";

//slideshow code: https://codesandbox.io/s/framer-motion-image-gallery-pqvx3

const swipeConfidenceThreshold = 10000;

const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
};

const Carousel = () => {

    // handle pagination
    const [[page, direction], setPage] = useState([0, 0]);
    // don't let page goes beyand of array data 
    const index = wrap(0, data.length, page);
    const paginate = (newDirection) => {
        setPage([page + newDirection, newDirection]);
    };

    // for slide to width(-width) of an item
    const target = useRef(null);
    const [x, setX] = useState({
        slideLeftX: window.innerWidth,
        slideRightX: -(window.innerWidth),
        width: 0,
    })

    // set width of a slide
    useEffect(() => {
        const rect = target.current.getBoundingClientRect();

        if (rect.width !== x.width) {
            setX({
                slideLeftX: (rect.width + 50),
                slideRightX: -(rect.width + 50),
                width: rect.width
            })
        }
    }, [x]);

    // add keydown listener to the document for slide with arrow key
    useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);

        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        }
    })


    // paginate with arrow keys
    const keyDownHandler = (e) => {

        if (e.keyCode === 37) {
            paginate(-1);
        }
        if (e.keyCode === 39) {
            paginate(1);
        }
    }

    // slide left or right based on direction
    const variants = {
        enter: (direction) => {
            return {
                opacity: 0,
                x: direction > 0 ? x.slideLeftX : x.slideRightX,
                zIndex: 1,
            };
        },
        center: {
            zIndex: 1,
            opacity: 1,
            x: 0,
        },
        exit: (direction) => {
            return {
                zIndex: 0,
                opacity: 0,
                x: direction < 0 ? x.slideLeftX : x.slideRightX,
            };
        }
    };

    // properties needed for a slide
    const slideProps = {
        custom: direction,
        variants: variants,
        initial: "enter",
        animate: "center",
        exit: "exit",
        transition: {
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
        },
        drag: "x",
        dragConstraints: { left: 0, right: 0 },
        dragElastic: 1,
        onDragEnd: (e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
                paginate(1);
            } else if (swipe > swipeConfidenceThreshold) {
                paginate(-1);
            }
        }
    }

    return <div className={styles.carousel}>
        <AnimatePresence initial={false} custom={direction}>
            <div className={styles["inner-carousel"]} ref={target} key={page}>
                <div className={styles["img-container"]} style={{ minHeight: "20rem" }}>
                    <div className={styles["inner-img-container"]}>
                        <motion.img
                            {...slideProps}
                            src={data[index].image}
                            alt={data[index].name} />
                        <div className={styles.handlers}>
                            <button aria-label="prev slide" onClick={() => paginate(-1)}>
                                <PrevIcon />
                            </button>
                            <button aria-label="next slide" onClick={() => paginate(1)}>
                                <NextIcon />
                            </button>
                        </div>
                    </div>
                </div>
                <motion.div
                    {...slideProps}
                    className={styles.content}>
                    <p className={styles.testi}>“ {data[index].testimonial} ”</p>
                    <p className={styles.name}>{data[index].name}</p>
                    <p className={styles.role}>{data[index].role}</p>
                </motion.div>
            </div>
        </AnimatePresence>
    </div>


}

export default Carousel;