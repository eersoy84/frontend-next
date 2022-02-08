// react
import {
    useCallback,
    useEffect,
    useRef,
    useState,
} from 'react';

// third-party
import classNames from 'classnames';
import { connect } from 'react-redux';
import Image from 'next/image'
// application
import Suggestions from './Suggestions';
import { mergeArrays } from '../../helpers/merger';

function Search(props) {
    const {
        context,
        className,
        inputRef,
        onClose,
        location,
        adList,
        instantAdsInfo,
    } = props;
    const [mergedList, setMergedList] = useState([]);
    const [suggestionsOpen, setSuggestionsOpen] = useState(false);
    const [hasSuggestions, setHasSuggestions] = useState(false);
    const [suggestedProducts, setSuggestedProducts] = useState([]);
    const [query, setQuery] = useState('');
    const wrapper = useRef(null);
    const close = useCallback(() => {
        if (onClose) {
            console.log("sss")
            onClose();
        }

        setSuggestionsOpen(false);
    }, [onClose]);

    useEffect(() => {
        setMergedList(mergeArrays(adList, instantAdsInfo));
    }, [adList, instantAdsInfo]);
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
            setHasSuggestions(false);

            return undefined;
        }

        // Use ajax request instead of timeout.
        const timeout = setTimeout(() => {
            searchProductsByAdId(query);
            setHasSuggestions(true);
            setSuggestionsOpen(true);
        }, 100);

        return () => clearTimeout(timeout);
    }, [query]);

    const searchProductsByAdId = (query) => {
        const items = (mergedList && mergedList.length > 0) ? mergedList : [];

        const adsById = items.filter((item) => {
            const x = item.adId.toString().includes(query);
            return x;
        });

        const adsByCategory = items.filter((item) => {
            const x = item.categoryName.toLocaleLowerCase().includes(query.toLocaleLowerCase());
            return x;
        });

        const adsByBrand = items.filter((item) => {
            const x = item.brandName.toLocaleLowerCase().includes(query.toLocaleLowerCase());
            return x;
        });

        const adsByModels = items.filter((item) => {
            const x = item.modelName.toLocaleLowerCase().includes(query.toLocaleLowerCase());
            return x;
        });
        if (adsById && adsById.length > 0) {
            setSuggestedProducts(adsById);
        } else if (adsByCategory && adsByCategory.length > 0) {
            setSuggestedProducts(adsByCategory);
        } else if (adsByBrand && adsByBrand.length > 0) {
            setSuggestedProducts(adsByBrand);
        } else if (adsByModels && adsByModels.length > 0) {
            setSuggestedProducts(adsByModels);
        } else setSuggestedProducts(null);
    };
    const handleFocus = () => {
        setSuggestionsOpen(true);
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
        // Escape.
        if (event.which === 27) {
            close();
        }
    };

    const rootClasses = classNames(`search search--location--${context}`, className, {
        'search--suggestions-open': suggestionsOpen,
        'search--has-suggestions': hasSuggestions,
    });

    const closeButton = context !== 'mobile-header' ? '' : (
        <button className="search__button search__button--type--close" type="button" onClick={close}>
            <Image src="/icons/cross-20.svg" height={20} width={20} />
        </button>
    );

    return (
        <div className={rootClasses} ref={wrapper} onBlur={handleBlur}>
            <div className="search__body">
                <form className="search__form" action="">
                    <input
                        ref={inputRef}
                        onChange={handleChange}
                        onFocus={handleFocus}
                        onKeyDown={handleKeyDown}
                        value={query}
                        className="search__input"
                        name="search"
                        placeholder="İlan no, veya marka model ile ara"
                        aria-label="Site search"
                        type="text"
                        autoComplete="off"
                    />
                    <div className="search__button search__button--type--submit">
                        <Image src="/icons/search-20.svg" height={20} width={20} />
                    </div>
                    {closeButton}
                    <div className="search__border" />
                </form>

                <Suggestions className="search__suggestions" context={context} products={suggestedProducts} />
            </div>
        </div>
    );
}
const mapStateToProps = (state) => ({
    adList: state.ad.adList,
    instantAdsInfo: state.ad.instantAdsInfo,
});

const mapDispatchToProps = {
};
export default connect(mapStateToProps, mapDispatchToProps)(Search);
