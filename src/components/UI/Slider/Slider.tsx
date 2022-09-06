import React, { useEffect, useRef, useState } from "react";
import { SliderInterface } from "./Slider.props";
import styles from './Slider.module.scss';

function Slider({ sliderData }: SliderInterface) {

  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [offset, setOffset] = useState<number>(0);
  const [slideWidth, setSlideWidth] = useState<number>(0);

  const slideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const resizeHandler = () => {
      const _width: number = slideRef.current?.offsetWidth || 0;
      setSlideWidth(_width);

      setOffset(0);
      setCurrentSlide(0);
    }

    resizeHandler()
    window.addEventListener('resize', resizeHandler)

    return () => window.removeEventListener('resize', resizeHandler)
  }, [])

  function handleRightArrowClick() {
    setOffset((currentOffset) => {
      const newOffset = currentOffset - slideWidth;
      return Math.min(newOffset);
    })

    setCurrentSlide(currentSlide + 1);
  }

  function handleLeftArrowClick() {
    setOffset((currentOffset) => {
      const newOffset = currentOffset + slideWidth;
      return Math.min(newOffset);
    })

    setCurrentSlide(currentSlide - 1);
  }

  function handlePaginationClick(index: number) {
    setOffset(() => {
      const newOffset = -(slideWidth * index);
      return Math.min(newOffset);
    })

    setCurrentSlide(index);
  }

  return (
    <div className={styles["slider"]}>

      {currentSlide > 0 &&
        (
          <div className={`${styles["slider__button-container"]} ${styles["slider__button-container_left"]}`}>
            <button className={`${styles["slider__button"]} ${styles["slider__button_left"]}`} onClick={handleLeftArrowClick}>
              <img src="./icons/slider-arrow.png" alt="Стрелка влево" />
            </button>
          </div>
        )
      }
      {currentSlide < sliderData.length - 1 &&
        (
          <div className={`${styles["slider__button-container"]} ${styles["slider__button-container_right"]}`}>
            <button className={`${styles["slider__button"]} ${styles["slider__button_right"]}`} onClick={handleRightArrowClick}>
              <img src="./icons/slider-arrow.png" alt="Стрелка вправо" />
            </button>
          </div>
        )
      }
      <ul className={styles["slider__pagination-list"]}>
        {
          sliderData.map((slide, index) => {
            return (
              <li
                key={index}
                className={`${styles["slider__pagination-item"]} ${currentSlide === index && styles["slider__pagination-item_active"]}`}
                onClick={() => handlePaginationClick(slide.id)}>
              </li>
            )
          })
        }
      </ul>

      <div className={styles["slider__slides-container"]} style={{ transform: `translateX(${offset}px)` }} ref={slideRef}>
        {
          sliderData.map((slide, index) => {
            return (
              <div key={index} className={styles["slider__slide"]}>
                <div className={`${styles["slider__side"]} ${styles["slider__left"]}`}>
                  <h4 className={styles["slider__left-title"]}>{slide.title}</h4>
                  <p className={styles["slider__left-subtitle"]}>{slide.subtitle}</p>
                </div>
                <div className={`${styles["slider__side"]} ${styles["slider__right"]}`}>Здесь будет картинка</div>
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

export default Slider;