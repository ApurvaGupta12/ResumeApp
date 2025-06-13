import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '../../App.css';

const templates = [
  { id: 1, name: 'Template 1', previewImage: '/Templates/Temp1.jpeg' },
  { id: 2, name: 'Template 2', previewImage: '/Templates/Temp2.jpeg' },
  { id: 3, name: 'Template 3', previewImage: '/Templates/Temp3.jpeg' },
  { id: 4, name: 'Template 4', previewImage: '/Templates/Temp4.jpeg' },
  { id: 5, name: 'Template 5', previewImage: '/Templates/Temp5.jpeg' },
  { id: 6, name: 'Template 6', previewImage: '/Templates/Temp6.jpeg' },
  { id: 7, name: 'Template 7', previewImage: '/Templates/Temp7.jpeg' },
  { id: 8, name: 'Template 8', previewImage: '/Templates/Temp8.jpeg' },
];

// Custom arrows
const PrevArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute left-[10%] top-1/2 transform -translate-y-1/2 text-5xl text-gray-700 hover:text-black z-10"
      onClick={onClick}
      aria-label="Previous Slide"
    >
      ‹
    </button>
  );
};

const NextArrow = (props: any) => {
  const { onClick } = props;
  return (
    <button
      className="absolute right-[10%] top-1/2 transform -translate-y-1/2 text-5xl text-gray-700 hover:text-black z-10"
      onClick={onClick}
      aria-label="Next Slide"
    >
      ›
    </button>
  );
};

const ResumeCrsl: React.FC = () => {
  const sliderRef = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '0px',
    focusOnSelect: true,
    beforeChange: (_: number, next: number) => setCurrentSlide(next),
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full py-20 relative bg-white">
      <h2 className="text-center text-6xl font-bold mb-10">Choose a Template</h2>
      <p className="text-lg text-center font-semibold sm:text-xl text-black-700 max-w-4xl mb-22 mx-auto leading-relaxed">
      Choose a template that suits your style and build a standout resume effortlessly</p>
      <div className="relative max-w-[1800px] mx-auto">
        <Slider ref={sliderRef} {...settings}>
          {templates.map((template, index) => {
            // Distance from center slide
            const distance = Math.abs(currentSlide % templates.length - index % templates.length);
            // Clamp for infinite scrolling fix
            const effectiveDistance = Math.min(distance, templates.length - distance);
            // Scale factor based on distance
            const scale = effectiveDistance === 0 ? 1.2 : effectiveDistance === 1 ? 1 : 0.9;

            return (
              <div key={template.id} className="px-2 transition-transform duration-500 ease-in-out">
                <Link to={`/edit-template/${template.id}`}>
                  <div
                    style={{
                      transform: `scale(${scale})`,
                      transition: 'transform 0.4s ease-in-out',
                    }}
                    className="rounded-xl shadow-xl overflow-hidden"
                  >
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      className="w-[400px] h-[500px] object-cover mx-auto rounded-xl"
                    />
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default ResumeCrsl;
