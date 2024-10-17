
import styles from './Testimonials.module.scss';
import { useState } from 'react';
import healthcareProfessional from '../../../src/assets/healthcareProfessional.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'; 
import profilepic1 from '../../../src/assets/profilePic1.png'
import profilepic2 from '../../../src/assets/profilePic2.jpeg'
import profilepic3 from '../../../src/assets/profilePic3.jpeg'
import profilepic4 from '../../../src/assets/profilePic4.jpeg'

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Thomas Daniel',
      image: profilepic1, 
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They\'ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.',
      rating: 5,
    },
    {
      name: 'Alena Alex',
      image: profilepic2,
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They\'ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.',
      rating: 5,
    },
    {
      name: 'Thomas Edison',
      image: profilepic3,
      review: 'The caregivers from Home Health Services have been absolutely wonderful. They\'ve provided my father with compassionate, personalized care that has allowed him to remain independent in his own home.',
      rating: 5,
    },
    {
      name: 'John Smith',
      image: profilepic4,
      review: 'Amazing care! They provided excellent support for my mother, allowing her to maintain her independence at home.',
      rating: 5,
    },
    {
      name: 'Mary Jones',
      image: profilepic3,
      review: 'The service has been outstanding. The team provided customized care that helped my father regain his independence.',
      rating: 5,
    },
  ];

  const totalTestimonials = testimonials.length;


  const visibleCards = 4;
  const maxIndex = Math.ceil(totalTestimonials / visibleCards) - 1;


  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === maxIndex ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? maxIndex : prevIndex - 1
    );
  };

  return (
    <section className={styles.testimonialsSection}>

      <div className={styles.headerContainer}>
        <div className={styles.mainImage}>
          <img src={healthcareProfessional}alt="Healthcare Professional" /> {/* Replace with the actual image */}
        </div>
        <div className={styles.textContainer}>
          <h3 className={styles.subheading}>Testimonials</h3>
          <h2 className={styles.heading}>What Our Clients Say</h2>
        </div>
      </div>


      <div style={{
        background: 'linear-gradient(90deg, #E2F6FF, #D8E3FB)'

      }}>

      <div className={styles.testimonialsSlider}>
        <div
          className={styles.testimonialsContainer}
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
          {testimonials.map((testimonial, index) => (
              <div className={styles.testimonialCard} key={index}>
              <div className={styles.imageContainer}>
                <img src={testimonial.image} alt={testimonial.name} />
              </div>
              <h4>{testimonial.name}</h4>
              <div className={styles.rating}>
                {'★'.repeat(testimonial.rating)}
              </div>
              <p>{testimonial.review}</p>
            </div>
          ))}
        </div>
      </div>


      <div className={styles.controls}>
        <button onClick={prevSlide} className={styles.controlButton}>
        <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <button onClick={nextSlide} className={styles.controlButton}>
        <FontAwesomeIcon icon={faChevronRight} />
        </button>
      </div>
          </div>
    </section>
  );
};

export default Testimonials;
