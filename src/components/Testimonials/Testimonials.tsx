import React from 'react';
import styles from './Testimonials.module.scss';
import Slider, { Settings } from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import healthcareProfessional from '../../../src/assets/healthcareProfessional.png';
import profilepic1 from '../../../src/assets/profilePic1.png';
import profilepic2 from '../../../src/assets/profilePic2.jpeg';
import profilepic3 from '../../../src/assets/profilePic3.jpeg';
import profilepic4 from '../../../src/assets/profilePic4.jpeg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useRef } from 'react';

type Testimonial = {
  name: string;
  image: string;
  review: string;
  rating: number;
};

interface ArrowProps {
  className?: string;
  style?: React.CSSProperties;
  onClick?: () => void;
}

const Testimonials: React.FC = () => {
  const sliderRef = useRef<Slider>(null);
  const testimonials: Testimonial[] = [
    {
      name: 'Thomas Daniel',
      image: profilepic1,
      review: "The caregivers from Home Health Services have been absolutely wonderful. They've provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.",
      rating: 5,
    },
    {
      name: 'Alena Alex',
      image: profilepic2,
      review: "The caregivers from Home Health Services have been absolutely wonderful. They've provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.",
      rating: 5,
    },
    {
      name: 'Thomas Edison',
      image: profilepic3,
      review: "The caregivers from Home Health Services have been absolutely wonderful. They've provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.",
      rating: 5,
    },
    {
      name: 'John Smith',
      image: profilepic4,
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.',
      rating: 5,
    },
    {
      name: 'Mary Jones',
      image: profilepic3,
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.',
      rating: 5,
    },
    {
      name: 'John Smith',
      image: profilepic4,
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home..',
      rating: 5,
    },
  ];

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
          <img src={healthcareProfessional} alt="Healthcare Professional" />
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.subheading}>Testimonials</h3>
          <h2 className={styles.heading}>What Our Clients Say</h2>
        </div>
      </div>

      <div
        className={styles.testimonialsContainer}
      > 
        <Slider  ref={sliderRef}  {...settings}>
          {testimonials.map((testimonial, index) => (
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
