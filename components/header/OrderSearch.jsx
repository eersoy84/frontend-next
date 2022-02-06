// react
import React, {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
// third-party
import classNames from 'classnames';
import Image from 'next/image'
// application

export default function OrderSearch(props) {
    const {
        context,
        className,
        inputRef,
        onClose,
        location,
        filterOrders
    } = props;
    const { orders } = useSelector((state) => ({
        orders: state.order.orders,
    }), shallowEqual);

    const [query, setQuery] = useState('');
    const wrapper = useRef(null);

    const close = useCallback(() => {
        if (onClose) {
            onClose();
        }
    }, [onClose]);


    useEffect(() => close(), [close, location]);

    useEffect(() => {
        const onGlobalClick = (event) => {
            if (wrapper.current && !wrapper.current.contains(event.target)) {
                close();
            }
        };

        document.addEventListener('mousedown', onGlobalClick);

        return () => document.removeEventListener('mousedown', onGlobalClick);
    }, [close]);

    useEffect(() => {
        if (query === '') {
            filterOrders(orders.slice(0, 10));
            return undefined;
        }
        // Use ajax request instead of timeout.
        const timeout = setTimeout(() => {
            searchOrdersById(query);
        }, 100);

        return () => clearTimeout(timeout);
    }, [query]);

    const searchOrdersById = (query) => {
        const filter = orders && orders.filter((item) => {
            return item.uuid.substring(0, 8).toLowerCase().includes(query.toLowerCase());
        });
        if (filter && filter.length > 0) {
            filterOrders(filter)
        } else filterOrders(null);
    };

    const handleChange = (event) => {
        setQuery(event.target.value);
    };

    const handleBlur = () => {
        setTimeout(() => {
            if (!document.activeElement || document.activeElement === document.body) {
                return;
            }

            // Close suggestions if the focus received an external element.
            if (wrapper.current && !wrapper.current.contains(document.activeElement)) {
                close();
            }
        }, 10);
    };

    const handleKeyDown = (event) => {
        if (event.which === 27) {
            close();
        }
    };

    const rootClasses = classNames(`search search--location--${context}`, className);

    return (
        <div className={rootClasses} ref={wrapper} onBlur={handleBlur}>
            <div className="search__body">
                <form className="search__form" action="">
                    <input
                        ref={inputRef}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        value={query}
                        className="search__input w-100"
                        name="search"
                        placeholder="Sipariş Numarası"
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    <div className="search__button search__button--type--submit">
                        <Image src={'/icons/search-20.svg'} height={20} width={20} />
                    </div>
                    <div className="search__border" />
                </form>
            </div>
        </div>
    );
}
