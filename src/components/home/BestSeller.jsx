import React, { useEffect, useState, useRef } from "react";
import { listProductBy } from "../../Api/Main-api-pro.jsx";
import ProductCard from "../card/ProductCard.jsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight, faFire } from "@fortawesome/free-solid-svg-icons";

const BestSeller = () => {
    const [data, setData] = useState([]);
    const sliderRef = useRef(null);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = () => {
        listProductBy("sold", "desc", 10)
            .then((res) => setData(res.data))
            .catch((err) => console.log(err));
    };

    const handleScroll = (direction) => {
        if (sliderRef.current) {
            const scrollAmount = 300;
            sliderRef.current.scrollBy({
                left: direction === "next" ? scrollAmount : -scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <div className="relative max-w-screen-lg mx-auto">
            <div className="relative">
                <button
                    onClick={() => handleScroll("prev")}
                    className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black/70"
                >
                    <FontAwesomeIcon icon={faChevronLeft} size="lg" />
                </button>
                <div
                    ref={sliderRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-6 py-4"
                    style={{ scrollSnapType: "x mandatory" }}
                >
                    {data.map((item, index) => (
                        <div key={index} className="flex-shrink-0 w-64 scroll-snap-align-start">
                            <ProductCard item={item} />
                        </div>
                    ))}
                </div>
                <button
                    onClick={() => handleScroll("next")}
                    className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full z-10 hover:bg-black/70"
                >
                    <FontAwesomeIcon icon={faChevronRight} size="lg" />
                </button>
            </div>
        </div>
    );
};

export default BestSeller;
