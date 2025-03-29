import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        document.body.scrollTo(0, 0);
    }, [pathname]);

    return null; // No need to return children
};

export default ScrollToTop;