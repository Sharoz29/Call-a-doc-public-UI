import React from 'react';
import styles from './Testimonials.module.scss';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';
import data from '../../data/data.json'

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Testimonials: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const {testimonials}=data.components;

  const settings: Settings = {
    arrows:false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.headerContainer}>
        <div className={styles.mainImage}>
        <img src={testimonials.mainImage} alt="Healthcare Professional" />
        </div>
        <div className={styles.textContainer}>
        <h3 className={styles.subheading}>{testimonials.subHeading}</h3>
        <h2 className={styles.heading}>{testimonials.heading}</h2>
        </div>
      </div>

      <div
        className={styles.testimonialsContainer}
      > 
        <Slider  ref={sliderRef}  {...settings}>
          {testimonials.testimonials.map((testimonial, index) => (
            <div className={styles.testimonialCard} key={index}>
              <div className={styles.imageContainer}   >
                <img src={testimonial.image} alt={testimonial.name}  />
              </div>
              <div>
              <h4 >{testimonial.name}</h4>
              <div className={styles.rating} >{'★'.repeat(testimonial.rating)}</div>
              <p >{testimonial.review}</p>

              </div>
            </div>
          ))}
        </Slider>
      <div >
        <div className={styles.controls}
         >
          <div>
          <PrevArrow onClick={() => sliderRef.current?.slickPrev()} />
          </div>
          <div>

          <NextArrow onClick={() => sliderRef.current?.slickNext()} />
          </div>
        </div>
  </div>
      </div>
    </section>
  );
};

const NextArrow: React.FC<ArrowProps> = ({  onClick }) => {
  return (

    <FontAwesomeIcon
     className={styles.controlButton}
      icon={faChevronRight}
      onClick={onClick}
       />
 
  );
};

const PrevArrow: React.FC<ArrowProps> = ({  onClick }) => {
  return (

       <FontAwesomeIcon 
        className={styles.controlButton} 
        icon={faChevronLeft} 
        onClick={onClick}
        />

  );
};

export default Testimonials;
