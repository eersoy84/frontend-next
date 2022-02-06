import theme from '../../data/theme';
import { useEffect, useState } from 'react';
// import CategorySlider from '../blocks/CategorySlider';
import BizlealHotAdsSlider from '../blocks/BizlealHotAdsSlider';
import { useSelector, shallowEqual } from 'react-redux';
import Link from 'next/link'
import Image from 'next/image'
import { mergeArrays } from '../../helpers/merger'
import PageHeader from '../shared/PageHeader';
import BlockSlideShow from '../blocks/BlockSlideShow';
import dynamic from 'next/dynamic'
const CategorySlider = dynamic(() => import('../blocks/CategorySlider'), { ssr: false });

export default function HomePage() {
    const { adList, instantAdsInfo } = useSelector((state) => ({
        adList: state.ad.adList,
        instantAdsInfo: state.ad.instantAdsInfo,
    }), shallowEqual);
    const [mergedList, setMergedList] = useState(adList);

    useEffect(() => {
        setMergedList(mergeArrays(adList, instantAdsInfo));
    }, [adList, instantAdsInfo]);

    return (
        <>
            <div className="container block-features--layout--classic">
                <CategorySlider />
                <div className="home_layout_grid">
                    <BlockSlideShow />
                    <BizlealHotAdsSlider
                        title="Anlık Fırsatlar"
                        layout="grid-1"
                        mergedList={mergedList}
                    />
                </div>
            </div>
            <div className="sticky_top_ads">

                <div className="container my-5">
                    <div className="d-flex justify-content-center">
                        <Link href={'/ilanlar'}>
                            <div
                                className="btn btn-primary btn-lg w-100"
                                style={{ borderRadius: '6px' }}
                            >
                                İlanlara Göz At
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
            <div className="container mt-5">
                <h3 className="text-center m-5">Sistem Nasıl Çalışır?</h3>

                <div className="row">
                    <div className="col-12 col-lg-3">
                        <div className="card h-100">
                            <div className="card-body align-self-center">
                                <Image src="/icons/card1.svg" height={150} width={150} />

                            </div>
                            <div className="card-footer text-center p-3">
                                Ürünler Satış Fiyatından Alınır
                            </div>
                        </div>
                    </div>

                    <div className="col align-self-center justify-content-center">
                        <div className="d-lg-none my-3 d-flex justify-content-center">
                            <Image src="/icons/arrow-down.svg" className="w-100" height={70} width={70} />
                        </div>
                        <div className="d-none d-lg-block">
                            <Image src="/icons/arrow-right.svg" className="w-100" height={100} width={100} />
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card h-100">
                            <div className="card-body align-self-center">
                                <Image src="/icons/card2.svg" height={150} width={150} />
                            </div>
                            <div className="card-footer text-center p-2">
                                Toplam Satış Adedine Göre Fiyat Düşer
                            </div>
                        </div>
                    </div>

                    <div className="col align-self-center justify-content-center">
                        <div className="d-lg-none my-3 d-flex justify-content-center">
                            <Image src="/icons/arrow-down.svg" className="w-100" height={70} width={70} />
                        </div>
                        <div className="d-none d-lg-block">
                            <Image src="/icons/arrow-right.svg" className="w-100" height={100} width={100} />
                        </div>
                    </div>

                    <div className="col-12 col-lg-3">
                        <div className="card h-100">
                            <div className="card-body align-self-center">
                                <Image src="/icons/card3.svg" height={150} width={150} />
                            </div>
                            <div className="card-footer text-center p-2">
                                İlan Süresi Sonunda Fiyat Farkı Kredi Kartınıza İade Edilir
                            </div>
                        </div>
                    </div>
                </div>

                <h3 className="text-center m-5">Bizleal Sistemi Neden Mantıklı?</h3>




                <div className="row my-5">
                    <div className="d-flex justify-content-center col-lg-12 row align-items-center my-5 mb-md-1">
                        <div className="col-sm-6 order-md-2 d-flex justify-content-center">
                            <Image src="/icons/woman.svg" height={350} width={350} />
                        </div>

                        <div className="col-sm-6 p-sm-2 p-lg-5 text-center text-md-left">
                            <h4>Ne Kadar Satış O Kadar İndirim</h4>
                            <p>
                                Ürün fiyatı toplam satış adedine göre düşer. Ürüne ne kadar talep gelirse, ürün fiyatı o kadar indirime girer.
                            </p>
                        </div>
                    </div>

                    <div className="col-lg-12 row align-items-center mb-5 mb-md-1">
                        <div className="col-sm-6 d-flex justify-content-center">
                            <Image src="/icons/birlikteAl.svg" height={350} width={350} />
                        </div>

                        <div className="col-sm-6 p-sm-2 p-lg-5 text-center text-md-left">
                            <h4>Sosyal Satın Alma</h4>
                            <div className="content">
                                <p>
                                    İlanları sosyal medyada, whatsapp  ve telegram gibi uygulamalarda paylaşarak ürün fiyatının düşmesine katkı sağlayabilirsiniz.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="col-lg-12 row align-items-center mb-5 mb-md-1">
                        <div className="col-sm-6 order-md-2 d-flex justify-content-center">
                            <Image src="/icons/manAndWoman.svg" height={350} width={350} />
                        </div>
                        <div className="col-sm-6 p-sm-2 p-lg-5 text-center text-md-left">
                            <h4>Diğer Alışveriş Sitelerinden Farkımız</h4>
                            <div className="content">
                                <p>
                                    Bizleal&apos;da ürünler doğrudan tedarikçiden, toptan fiyatına satılır. Bireyler birleşerek satın alma gücünü artırmış olur.
                                </p>
                            </div>
                        </div>

                    </div>

                    <div className="col-lg-12 row align-items-center mb-5 mb-md-1">
                        <div className="col-sm-6 d-flex justify-content-center">
                            <Image src="/icons/safePay.svg" height={350} width={350} />
                        </div>

                        <div className="col-sm-6 p-sm-2 p-lg-5 text-center text-md-left">
                            <h4>Tamamen Güvenli</h4>
                            <div className="content">
                                <p>
                                    Ürün elinize geçmeden, ödemeniz tedarikçinin hesabına aktarılmaz. Dolayısıyla tamamen güvenli alışveriş  yapmış olursunuz.
                                </p>
                            </div>

                        </div>

                    </div>

                </div>

                <div className="row text-center mb-5">
                    <div className="col-sm-12 col-lg-6">
                        <div className="row mb-2">
                            <div className="col">
                                <Image src="/icons/clock-icon.svg" className="m-auto" height={200} width={200} />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col m-4">
                                <h4>Ürünlerdeki Sayaç Nedir?</h4>
                                <p>
                                    Bizleal&apos;da ürünler ilanlar şeklinde yayınlanır. İlan, bitiş tarihine kadar yayında kalır. Sayaç, son ilan bitimine kalan süreyi gösterir.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-lg-6">
                        <div className="row mb-2">
                            <div className="col">
                                <Image src="/icons/credit-card-icon.svg" className="m-auto" height={200} width={200} />

                            </div>
                        </div>
                        <div className="row">
                            <div className="col m-4">
                                <h4>Fiyatlar Neden Düşük?</h4>
                                <p>
                                    Bizleal&apos;da tedarikçiler, ürünlerini, onlarca, yüzlerce müşteriye toptan fiyatına doğrudan satar. Herhangi bir aracı olmadığı için de çok daha indirimli fiyatlara satın alma gerçekleştirmek mümkündür.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <BizlealAdsSlider
                    gridLayout="home_new_ads_list"
                    numOfSlidesToShow={4}
                    list={mergedList}
                    title="Yeni Ürünler"
                />
                <br />
                <BizlealAdsSlider
                    gridLayout="home_favorite_ads_list"
                    numOfSlidesToShow={4}
                    list={mergedList}
                    title="En Çok Satanlar"
                /> */}
            </div>

        </>
    );
}
