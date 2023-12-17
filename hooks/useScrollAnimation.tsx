"use client";

import { useInView } from "react-intersection-observer";

interface UseScrollAnimationOptions {
    threshold?: number;
}

const useScrollAnimation = ({ threshold = 0.5 }: UseScrollAnimationOptions = {}) => {
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold,
    });

    const animationClass = inView
        ? "opacity-100 translate-y-0 transition-all duration-1000 ease-in-out"
        : "opacity-0 translate-y-8 transition-all duration-1000 ease-in-out";

    return { ref, animationClass };
};

export default useScrollAnimation;
