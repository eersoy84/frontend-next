import Link from 'next/link'
import Head from 'next/head'
// application
import StroykaSlick from '../../components/shared/StroykaSlick';

// data stubs
import theme from '../../data/theme';
import PageHeader from '../../components/shared/PageHeader';



const slickSettings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
        {
            breakpoint: 767,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        {
            breakpoint: 379,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
            },
        },
    ],
};

function SitePageAboutUs() {
    const breadcrumb = [
        { title: 'Anasayfa', url: '' },
        { title: 'Hakkımızda', url: '' },
    ];
    return (
        <div className="block about-us">
            <Head>
                <title>{`Hakkımızda — ${theme.name}`}</title>
                <meta name="description" content="Bizleal gizlilik politikası" />
                <meta name="keywords" content="bizleal gizlilik politikası" />
            </Head>
            <PageHeader breadcrumb={breadcrumb} />

            <div className="about-us__image" style={{ backgroundImage: 'url("images/aboutus.jpg")' }} />
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-12 col-xl-10">
                        <div className="about-us__body">
                            <h1 className="about-us__title">Hakkımızda</h1>
                            <div className="document__content typography">
                                <p>
                                    Michael Faraday, dinamoyu icat ettiğinde sorarlar; bunun bize ne faydası var?
                                    <br />
                                    O da cevap verir, yeni doğmuş bir bebeğin dünyaya ne faydası var?
                                    <br />
                                    <br />
                                    Peki, bizleal platformu ne işe yarar? Bizleal derken ne demek istiyoruz?
                                    <br />
                                    <br />
                                    Anadoluda herkes bilir ki, herhangi bir alışverişte, satın alınan ürünün adeti ürünün fiyatını belirler. Adet arttıkça, ürün fiyatı düşer.
                                    <br />
                                    <br />
                                    Yüksek hacimli satın alma gücüne sahip toptancılar, üreticilerden, doğrudan, çok uygun fiyata aldıkları ürünleri, son kullanıcıya yüksek karlarla satabilmektedir.
                                    Son kullanıcılar ise, büyük toptancılar karşısında tek başına kaldıkları için büyük balıklara yem olur. Bir tane 2 yüzlerce 1&apos;den büyüktür.
                                    <br />
                                    <br />
                                    İşte, bizleal.com, bireylerin, ortak ihtiyaçları doğrultusunda örgütlenmesine, ortak hareket etmesine, ortak satın alma yapmasına
                                    olanak sağlayan bir platformudur.
                                    <br />
                                    <br />
                                    Bizleal.com&apos;daki uzman satın almacılar, sizlerden gelen talepler doğrultusunda oluşturulan ihtiyaç havuzlarından size özel, uygun fiyatlı ilanlar oluşturur.
                                    Bu ilanlar, belli bir süre yayında kalır. Bu ilanlar, üyelerin her bir siparişinde ürün fiyatının azalacağı şekilde satışa sunulur. İlan bitiş tarihinde de satışlar tamamlanır.
                                    <br />
                                    <br />
                                    Böylelikle, bizleal platformunun her bir üyesi bir araya gelerek, bir toptancı gibi satın alma yapabilecek güce ulaşacaktır. Aracılar ve diğer komisyon giderleri de olmayacağı
                                    için üyeler, toptan fiyatına satın alma gücüne sahip olabileceklerdir.
                                </p>
                                <h1 className="about-us__title">Biz kimiz?</h1>
                                <p>
                                    Her biri, e-ticaret, sosyal e-ticaret, satın alma, reklam, pazarlama alanlarında uzman ekiplerimizle
                                    siz değerli üyelerimizin, en uygun fiyatlarla satın almalarını organize etmek için hizmetinizdeyiz.
                                </p>
                                <h1 className="about-us__title">Vizyonumuz</h1>
                                <p>
                                    Son kullanıcıların bir araya gelerek, doğrudan üreticilerden ortak satın alma yapabileceği, ortak ihtiyaçları doğrultusunda organize olabileceği bir platform yaratmak için yola çıkmış bulunmaktayız.
                                    Bireylerin, organize olarak bir bütün halinde hareket etmeleri doğrultusunda ortaya çıkacak sinerjinin herkesin faydasına olabileceği görüşünü benimsemekteyiz.
                                </p>

                            </div>
                            <div className="about-us__team">
                                <div className="about-us__team-subtitle text-muted">
                                    Bizimle çalışmak isterseniz, ya da ortak satın alma platformunun bir parçası olmak isterseniz lütfen
                                    {' '}
                                    <Link href="/site/iletisim">
                                        <a>
                                            iletişime geçiniz
                                        </a>
                                    </Link>
                                    {' '}
                                </div>
                                <div className="about-us__teammates teammates">
                                    <StroykaSlick {...slickSettings}>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                {/* <img src="images/teammates/teammate-1.jpeg" alt="" /> */}
                                            </div>
                                            <div className="teammate__name">
                                                Eyüp Ersoy
                                            </div>
                                            <div className="teammate__position text-muted">Founder</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                {/* <img src="images/teammates/teammate-2.jpeg" alt="" /> */}
                                            </div>
                                            <div className="teammate__name">Asaf Ardak</div>
                                            <div className="teammate__position text-muted">Co-founder</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                {/* <img src="images/teammates/teammate-2.jpeg" alt="" /> */}
                                            </div>
                                            <div className="teammate__name">Cemalettin Kartal</div>
                                            <div className="teammate__position text-muted">Co-founder & CEO</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                {/* <img src="images/teammates/teammate-2.jpeg" alt="" /> */}
                                            </div>
                                            <div className="teammate__name">Mehmet Emin Kartal</div>
                                            <div className="teammate__position text-muted">Co-founder & CTO</div>
                                        </div>
                                        <div className="teammates__item teammate">
                                            <div className="teammate__avatar">
                                                {/* <img src="images/teammates/teammate-2.jpeg" alt="" /> */}
                                            </div>
                                            <div className="teammate__name">Ömer Batmaz</div>
                                            <div className="teammate__position text-muted">Co-founder</div>
                                        </div>
                                    </StroykaSlick>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SitePageAboutUs;
