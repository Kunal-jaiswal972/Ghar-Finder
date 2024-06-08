import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Slider.css";
import { Carousel } from "react-responsive-carousel";

import { Maximize } from "lucide-react";
import Modal from "@/components/modal/Modal";
import useModal from "@/store/ModalStore";

const Slider = ({ images }) => {
  const openModal = useModal((state) => state.openModal);

  const carouselConfig = {
    showArrows: true,
    showStatus: false,
    showThumbs: false,
  };

  return (
    <div className="w-full md:w-[90%] mx-auto md:mr-auto md:ml-0 relative mb-4">
      <Carousel {...carouselConfig} showThumbs={images.length > 1}>
        {images.map((image, idx) => (
          <img src={image} key={idx} className="rounded-md aspect-[16/9]" />
        ))}
      </Carousel>
      <Maximize
        className="absolute right-2 top-2 p-1 bg-white rounded-lg cursor-pointer z-[49]"
        onClick={() => openModal("slider")}
      />
      <Modal id="slider">
        <Carousel {...carouselConfig}>
          {images.map((image, idx) => (
            <img src={image} key={idx} className="rounded-md" />
          ))}
        </Carousel>
      </Modal>
    </div>
  );
};

export default Slider;
