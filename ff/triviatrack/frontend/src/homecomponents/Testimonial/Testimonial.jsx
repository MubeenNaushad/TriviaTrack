import React from "react";
import Slider from "react-slick";

const TestimonialsData = [
  {
    id: 1,
    name: "Arish Amin",
    text: "This is a Great Application for learning and testing your knowledge. I am using this webiste and I am very satisfied with it.",
    img: "https://picsum.photos/101/101",
    delay: 0.2,
  },
  {
    id: 2,
    name: "Mubeen Naushad",
    text: "This website helped me a lot in my studies. I am very thankful to the developers of this website.Great Work",
    img: "https://picsum.photos/102/102",
    delay: 0.5,
  },
  {
    id: 3,
    name: "Dr Adeel Ansari",
    text: "Gave me a platform to teach my students in a fun way. I am very happy with the results. Will posting more content",
    img: "https://picsum.photos/104/104",
    delay: 0.8,
  },
  
];

const Testimonial = () => {
  const setting = {
    dots: true,
    arrow: false,
    infinite: true,
    speed: 500,
    slidesToScroll: 1,

    autoplaySpeed: 2000,
    cssEase: "linear",
    pauseOnHover: true,
    pauseOnFocus: true,
    responsive: [
      {
        breakpoint: 10000,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <div className="py-14 mb-10" >
      <div className="container">
       
        <div className="space-y-4 p-6 text-center max-w-[600px] mx-auto mb-6">
          <h1 className="uppercase font-semibold text-orange-600">
            OUR TESTIMONIALS
          </h1>
          <p className="font-semibold text-3xl ">
            What Our Users Say About Us
          </p>
        </div>
      
        <div>
          <Slider {...setting}>
            {TestimonialsData.map((item) => {
              return (
                <div key={item.id}>
                  <div className="mb-12 flex flex-col gap-4 p-8 shadow-lg mx-4 rounded-xl bg-secondary/10">
                 
                    <div className="flex justify-start items-center gap-5">
                      <img
                        src={item.img}
                        alt=""
                        className="w-16 h-16 rounded-full"
                      />
                      <div>
                        <p className="text-xl font-bold text-black/80">
                          {item.name}
                        </p>
                        <p>{item.name}</p>
                      </div>
                    </div>
              
                    <div className="py-6 space-y-4">
                      <p className="text-sm text-gray-500">{item.text}</p>
                      <p>⭐⭐⭐⭐⭐</p>
                    </div>
                  </div>
                </div>
              );
            })}
     
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Testimonial;