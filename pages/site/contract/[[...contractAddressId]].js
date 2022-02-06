// react
import React, { useEffect } from 'react';

// third-party
import Head from 'next/head'

// application
import { connect } from 'react-redux';
import PageHeader from '../../../components/shared/PageHeader';
import { useRouter } from 'next/router'
// data stubs
import theme from '../../../data/theme';

function SitePageContracts(props) {
    const { query } = useRouter()
    const { contractAddressId } = query
    const breadcrumb = [
        { title: 'Ana Sayfa', url: '/' },
        { title: 'Mesafeli Satış Sözleşmesi', url: '/site/sozlesmeler' },
    ];
    const { address } = props;
    let addressId = contractAddressId ? parseInt(contractAddressId) : null
    const addressItem = addressId && (address?.find(q => q.id === addressId));
    let user;
    useEffect(() => {
        user = JSON.parse(localStorage.getItem('user'));
    }, [user])

    return (
        <>
            <Head>
                <title>{`Mesafeli Satış Sözleşmesi — ${theme.name}`}</title>
            </Head>

            <PageHeader breadcrumb={breadcrumb} />

            <div className="block">
                <div className="container">
                    <div className="document">
                        <div className="document__header">
                            <h6 className="document__title">MESAFELİ SATIŞ SÖZLEŞMESİ</h6>
                        </div>

                        <div className="document__content typography">
                            <h6>MADDE 1. TARAFLAR</h6>
                            <p className="siteInfo">
                                <strong>Satıcı:</strong>
                                <br />
                                {theme.company.name}
                                <br />
                                {theme.contacts.address}
                                <br />
                                {theme.contacts.email}
                                <br />
                                {theme.contacts.phone}
                                <br />
                                (Bundan böyle &quot;SATICI&quot; olarak anılacak)
                            </p>
                            <div className="siteInfo">
                                <strong>Alıcı:</strong>
                                <br />
                                {user &&
                                    <div className="d-flex flex-column" style={{ wordBreak: 'break-all' }}>
                                        {user.firstName}{' '}{user.lastName} <br />{user.email}
                                        {addressItem ?
                                            <div>
                                                {addressItem.isCorporate === 1 &&
                                                    <div>
                                                        {addressItem.companyName}
                                                        <br />
                                                    </div>
                                                }
                                                {addressItem.town}
                                                {','}
                                                {addressItem.addressText}
                                                <br />
                                                {addressItem.city}
                                                {'/'}
                                                {addressItem.district}
                                                <br />
                                                {addressItem.phone}
                                            </div> : ''}
                                    </div>
                                }
                                <br />
                                (Bundan böyle &quot;ALICI&quot; olarak anılacak)

                            </div>
                            <h6>MADDE 2. KONU</h6>
                            <p className="siteInfo">
                                İş bu sözleşmenin konusu (bundan sonra &quot;SÖZLEŞME&quot; olarak anılacaktır), ALICI&apos;NIN, SATICI&apos;YA ait www.bizleal.com adlı internet
                                sitesinden elektronik ortamda sipariş verdiği, sözleşmede bahsi geçen nitelikleri haiz ve yine
                                sözleşmede bahsi geçen satış fiyatı belirtilen ürün/ürünlerin satışı ve teslimi ile ilgili olarak
                                6502 sayılı Tüketicilerin Korunması Hakkındaki Kanun ve Mesafeli Sözleşmeler Yönetmelik
                                hükümleri gereğince tarafların hak ve yükümlülüklerinin saptanmasıdır.
                            </p>
                            <h6>MADDE 3. SÖZLEŞME KONUSU ÜRÜNÜN TANIMI VE TÜRÜ</h6>
                            <p className="siteInfo">
                                İş bu sözleşme konusu ürün/ürünler SATICI&apos;NIN www.bizleal.com adlı internet sitesi
                                aracılığıyla satış ve teslimini yaptığı her türlü üründür. Ürünün Cinsi ve türü, Miktarı,
                                Marka/Modeli, Rengi ve tüm vergiler dahil satış bedeli www.bizleal.com adlı internet
                                sitesindeki ürün tanıtım sayfasında yer alan bilgilerde ve iş bu sözleşmenin ayrılmaz parçası
                                sayılan faturada belirtildiği gibidir.
                            </p>
                            <p className="siteInfo">
                                ALICI, satışa konu ürün/ürünlerin temel nitelikleri, satış fiyatı, ödeme sekli, teslimat koşulları
                                vs. satışa konu ürün/ürünlerle ile ilgili tüm ön bilgiler ve &quot;cayma&quot; hakkı konusunda bilgi
                                sahibi olduğunu, bu ön bilgileri elektronik ortamda teyit ettiğini ve sonrasında ürün siparişini
                                verdiğini iş bu sözleşme hükümlerince beyan ve kabul eder. &quot;Ön bilgilendirme formu&quot; ve
                                &quot;Fatura&quot; iş bu sözleşmenin ayrılmaz parçalarıdır. Sipariş gerçekleştiği anda ALICI bu
                                sözleşmenin tüm koşullarını kabul etmiş sayılır.
                            </p>
                            <h6>MADDE 4. SÖZLEŞME KONUSU ÜRÜN VE TESLİM BİLGİLERİ</h6>
                            <p className="siteInfo">
                                Ürünlerin cinsi ve türü, miktarı, marka/modeli, rengi, satış bedeli ve teslimat bilgileri fatura
                                üzerinde yer aldığı şekildedir.
                            </p>
                            <p>TESLİMAT BİLGİLERİ</p>
                            <p className="siteInfo">
                                SATICI&apos; ya ait www.bizleal.com ’dan yapılan satın almalar, ilan tarihinin sonuçlanmasını müteakip
                                en geç 5 iş günü içerisinde kargoya verilir.
                                Ürünlerin teslim alınmasına kadar geçen süreç içerisinde tüm sorumluluk SATICI&apos; ya
                                aittir. Ürünlerinizi kargo görevlisi eşliğinde imza karşılığı kontrol ederek teslim almanız
                                gerekmektedir.
                                Siparişleriniz, kalan bakiye ödeme onayı alındıktan sonra ilk 3 iş günü  içerisinde kargoya
                                teslim edilir. Teslimat adresinin İstanbul&apos;a uzaklığına göre de kargo şirketi 1-3 iş gün
                                içerisinde siparişinizi size ulaştıracaktır.
                                Vasıta, ev satışı gibi bazı kategorilerde ürünlerin teslim şekilleri farklılık arz edeceğinden, &quot;SATICI&quot; gerektiğinde değişiklik yapma hakkına sahiptir.
                                Tarafımızdan kaynaklanan bir aksilik olması halinde ise size üyelik bilgilerinizden yola
                                çıkılarak haber verilecektir. Bu yüzden üyelik bilgilerinizin eksiksiz ve doğru olması
                                önemlidir. Bayram ve tatil günlerinde teslimat yapılmamaktadır.
                                Seçtiğiniz ürünlerin tamamı anlaşmalı olduğumuz kargo şirketleri tarafından bizleal.com
                                garantisi ile size teslim edilecektir.
                                Satın aldığınız ürünler bir teyit e-posta&apos;sı ile tarafınıza bildirilecektir. Seçtiğiniz ürünlerden
                                herhangi birinin stokta mevcut olmaması durumunda konu ile ilgili bir e-posta size yollanacak
                                ve ürünün ilk stoklara gireceği tarih tarafınıza bildirilecektir.

                            </p>
                            <h6>MADDE 5. GENEL HÜKÜMLER</h6>

                            <ol className="siteInfo">
                                <li>
                                    SATICI tarafından daha önce imzalanmış bulunan iş bu iki nüsha sözleşme ALICI
                                    tarafından sipariş onay tarihinde onaylanarak ve elektronik ortamda yapılan satışlarda yine
                                    elektronik ortamda imzalanarak kabul edilmiştir. ALICI tarafından Havale/EFT ile ödenecek
                                    olan siparişin işleme alınma tarihi, siparişin verildiği tarih değil, ALICI tarafından yapılan
                                    ödemenin SATICI&apos;nın hesabına yansıma tarihidir.
                                </li>
                                <li>
                                    ALICI www.bizleal.com adlı internet sitesinde ve iş bu sözleşmenin 4. maddesinde
                                    belirtilen sözleşme konusu ürün/ürünlerin temel nitelikleri, tüm vergiler dahil satış fiyatı ve
                                    ödeme şekli ile teslimata ve teslimat masraflarının ALICI tarafından karşılanacağına,
                                    teslimatın gerçekleştirileceği süreye, SATICI&apos;NIN tam ticarî unvanı, açık adresi ve iletişim
                                    bilgilerine ilişkin tüm ön bilgiler konusunda bilgi sahibi olduğunu, bu ön bilgilere elektronik
                                    ortamda yapılan satışlarda elektronik ortamda gerekli teyidi verdiğini beyan ve kabul eder.
                                    ALICI madde 4&apos;te belirtilen tüm bilgileri okuduğunu ve anladığını, bu ürün/ürünlerin satın
                                    alınması için gerekli onayı verdiğini beyan ve kabul eder.
                                </li>
                                <li>
                                    ALICI bu sözleşmeyi elektronik ortamda teyit etmekle, mesafeli sözleşmelerin akdinden
                                    evvel, SATICI tarafından tüketiciye verilmesi gerekli siparişi verilen ürün/ürünlere ilişkin
                                    özellikler, ürünlerin tüm vergiler dahil satış fiyatı, SATICI&apos;NIN açık adresi, ticarî unvanı ve
                                    iletişim bilgileri, ödeme şekli ve teslimat ve teslimat masraflarının ALICI tarafından
                                    karşılanacağını ve miktarına ilişkin bilgileri de eksiksiz ve doğru olarak edindiğini teyit etmiş
                                    olacaktır.
                                </li>
                                <li>
                                    Satıcı sözleşmeye konu ürün/ürünlerin siparişte belirtilen niteliklere uygun, sağlam ve
                                    eksiksiz olarak ve garanti belgeleri ve kullanım kılavuzları ile birlikte teslim etmekle
                                    yükümlüdür. Ürün/ürünlerin garanti belgeleri ve garanti süreleri ürün/ürünlerin markaları
                                    tarafından belirlenen süreler kadardır. İnceleme işlemleri markalar tarafından iş bu süreler
                                    içinde yapılmaktadır. Garanti süresi dolmuş ürün/ürünlere ilişkin inceleme işlemleri markalar
                                    tarafından reddedilmektedir.
                                </li>
                                <li>
                                    ALICI&apos;NIN Havale/EFT yolu ile ödeme yapmak istemesi halinde siparişten itibaren 30
                                    dakika içinde satın alınmak istenen ürün/ürünlere ilişkin bedeli SATICI&apos;NIN hesabına
                                    ödemesi ve ödemenin yapılmış olduğuna ilişkin olarak www.bizleal.com adlı internet
                                    sitesinin ilgili bölümünde &quot;Havale/EFT yaptım&quot; butonu tıklanarak internet site işleticisine
                                    bildirim yapılmalıdır. Aksi takdirde ALICI&apos;NIN siparişi iptal edilecektir.
                                </li>
                                <li>
                                    ALICI&apos;NIN kredi kartı ile ve taksitle alışveriş yapması durumunda internet sitesinden
                                    seçmiş olduğu taksit biçimi geçerlidir. Taksitlendirme işlemlerinde, ALICI ile kart sahibi
                                    banka arasında imzalanmış bulunan sözleşmenin ilgili hükümleri geçerlidir. Kredi kartı
                                    ödeme tarihi banka ile ALICI arasındaki sözleşme hükümlerince belirlenir. ALICI, ayrıca
                                    bankanın gönderdiği hesap özetinden taksit sayısını ve ödemelerini takip edebilir.
                                </li>
                                <li>
                                    ALICI&apos;NIN internet sitesinden sipariş verdiği sözleşme konusu ürün/ürünler, 30 günlük
                                    süreyi aşmamak üzere sipariş verilen her bir ürün için ALICI&apos;NIN yerleşim yerinin uzaklığına
                                    bağlı olarak ve internet sitesinde ön bilgiler içinde açıklanan süre zarfında ALICI&apos;YA veya
                                    ALICI&apos;NIN gösterdiği adresteki kişi/kuruluşa teslim edilecektir. Bu süre ALICI&apos;YA yazılı
                                    olarak bildirilmek koşuluyla en fazla 10 gün uzatılabilir. Teslim anında ALICI&apos;NIN adresinde
                                    bulunmaması durumunda dahi SATICI edimini tam ve eksiksiz olarak yerine getirmiş olarak
                                    kabul edilecektir. Bu nedenle, ALICININ ürünü geç teslim almasından kaynaklanan her türlü
                                    zarar ile ürünün kargo şirketinde beklemiş olması ve/veya kargonun SATICI&apos;YA iade
                                    edilmesinden dolayı oluşan giderlere ALICI katlanacaktır.
                                </li>
                                <li>
                                    Sözleşme konusu ürün/ürünler, ALICI&apos;DAN başka bir kişi/kuruluşa teslim edilecek ise,
                                    teslim edilecek kişi/kuruluşun teslimatı kabul etmemesinden SATICI sorumlu tutulamaz.
                                </li>
                                <li>
                                    Sözleşme konusu ürün/ürünlerin teslimat masrafları ALICI tarafından ödenecek ve
                                    ALICI&apos;NIN siparişine ilişkin faturaya ayrıca yansıtılacaktır. SATICI, internet sitesinde,
                                    belirlenen ürün/ürünlere ilişkin belirlenen tarih diliminde ve/veya belirlenen toplam alışveriş
                                    tutarının üzerinde alışveriş yapılması halinde teslimat ücretinin SATICI tarafından
                                    karşılanacağını beyan etmişse, belirlenen koşullar dahilinde teslimat masrafı SATICI&apos;YA ait
                                    olacaktır.
                                </li>
                                <li>
                                    Teslimat; stok durumunun müsait olması ve mal bedelinin SATICI&apos;NIN hesabına
                                    geçmesinden sonra en kısa sürede yapılır. Ürün/ürünlerin teslim edilebilmesi için Ön
                                    Bilgilendirme Formunun elektronik teyit edilmesi, iş bu sözleşmenin imzalı bir nüshasının
                                    SATICI&apos;YA ulaştırılmış olması ve ürün/ürünler bedelinin ödenmiş olması gerekmektedir.
                                    Herhangi bir nedenle ürün bedeli ödenmez veya banka kayıtlarında iptal edilir ise, Satıcı
                                    ürün/ürünlerin teslimi yükümlülüğünden kurtulmuş kabul edilir ve bu durumda ALICI taşıma
                                    bedelini ödemekle yükümlüdür
                                </li>
                                <li>
                                    Sözleşme konusu ürün/ürünleri ALICI&apos;YA teslim edecek Kargo şirketinin ürün/ürünlerin
                                    teslimi ile ilgili yaşadığı her türlü sorun nedeniyle ürün/ürünleri zamanında teslim edememesi
                                    ve/veya hiç teslim edememesinden SATICI sorumlu tutulamayacaktır.
                                </li>
                                <li>
                                    SATICI, sözleşmedeki ifa yükümlülüğünün süresi dolmadan ALICI&apos;YI bilgilendirmek ve
                                    açıkça onayını almak suretiyle eşit kalite ve fiyatta farklı bir ürün tedarik edebilir.
                                </li>
                                <li>
                                    Ürünün tesliminden sonra ALICI&apos;YA ait kredi kartının ALICI&apos;NIN kusurundan
                                    kaynaklanmayan bir şekilde yetkisiz kişilerce haksız veya hukuka aykırı olarak kullanılması
                                    nedeni ile ilgili banka veya finans kuruluşun ürün bedelini SATICI&apos;YA ödememesi halinde,
                                    ALICI kendisine teslim edilmiş olması kaydıyla ürünü 3 gün içinde SATICI&apos;YA iade etmek
                                    zorundadır. Bu takdirde nakliye giderleri ALICI&apos;YA aittir.
                                </li>
                                <li>
                                    SATICI ürün/ürünlerin ifasının imkânsızlaştığını düşünüyorsa, sözleşme konusu
                                    ürün/ürünler SATICI tarafından mücbir sebepler ve nakliye yapılmasını önleyen olağanüstü
                                    durumlar ve/veya ürünün stokta bulunmaması, tedarik edilememesi nedeniyle süresi içinde
                                    ALICI&apos;YA teslim edilemezse SATICI durumu ALICI&apos;YA bildirecektir. ALICI, SATICI&apos;NIN
                                    bu kapsamda hiçbir sorumluluğu olmadığını, siparişin iptal edilmesini veya teslimat süresinin
                                    engelleyici durumunun ortadan kalkmasına kadar ertelenmesi haklarından birini
                                    kullanabileceğini beyan ve kabul eder.
                                </li>
                                <li>
                                    İş bu sözleşmenin 5.14. maddesinde sayılan hallerde ve/veya ALICI&apos;NIN siparişi iptal
                                    edilmesi halinde SATICI&apos;YA ödediği bedel aynen iade edilecektir. ALICI&apos;NIN kredi kartı ile
                                    ödeme yapmış olması halinde de ürün tutarı bankaya iade edilecektir. ALICI bu tutarın
                                    ALICI&apos;NIN hesabına yansıtılmasının Banka işlemi olduğunu SATICI tarafından kredi kartına
                                    iade edilen tutarın banka tarafından ALICI hesabına yansıtılmasının ortalama 2 ile 3 haftayı
                                    bulabileceğini, bu hususta SATICI&apos;NIN sorumluluğu bulunamayacağını kabul etmektedir.
                                    Tüketicinin ürün/ürünleri kredi kartı ile ve taksitle almışsa, kaç taksitle aldıysa Banka
                                    müşteriye geri ödemesini de o kadar taksitle yapmaktadır. SATICI bankaya ürün bedelinin
                                    tamamını tek seferde ödedikten sonra, Banka poslarından yapılan taksitli harcamaların
                                    ALICI&apos;NIN kredi kartına iadesi durumunda, konuya müdahil tarafların mağdur duruma
                                    düşmemesi için talep edilen iade tutarları, yine taksitli olarak hamil taraf hesaplarına Banka
                                    tarafından aktarılır. ALICI&apos;NIN satış iptaline kadar ödemiş olduğu taksit tutarları eğer iade
                                    tarihi ile kartın hesap kesim tarihleri çakışmazsa her ay karta 1 iade yansıyacak ve müşteri
                                    iade öncesinde ödemiş olduğu taksitleri satışın taksitleri bittikten sonra iade öncesinde ödemiş
                                    olduğu taksitleri sayısı kadar ay daha alacak ve mevcut borçlarından düşmüş olacaktır. Kredi
                                    kartı ile alınmış ürün/ürünlerin iadesi durumunda SATICI Banka ile yapmış olduğu sözleşme
                                    gereği ALICI&apos;YA nakit para ile ödeme yapamaz. İade işlemi söz konusu olduğunda SATICI
                                    ilgili tutarı Bankaya nakden veya mahsuben ödemekle yükümlü olduğundan yukarıda
                                    anlatmış olduğumuz prosedür gereğince ALICI&apos;YA nakit olarak ödeme yapılamamaktadır.
                                    Kredi kartına iade, SATICI&apos;NIN Bankaya bedeli tek seferde ödemesinden sonra, Banka
                                    tarafından yukarıdaki prosedür gereğince yapılacaktır. ALICI&apos;NIN Havale/EFT ile ödeme
                                    yapmış olması halinde iade ALICI&apos;NIN banka hesap bilgilerinin istenmesi akabinde
                                    ALICI&apos;NIN belirttiği hesaba (hesabın fatura adresindeki kişinin adına veya kullanıcı üyenin
                                    adına olması şarttır) havale/EFT şeklinde yapılacaktır. Alıcı, bu prosedürü okuduğunu ve
                                    kabul ettiğini kabul ve taahhüt eder.
                                    {' '}
                                </li>
                                <li>
                                    ALICI, sözleşme konusu ürün/ürünleri teslim almadan önce muayene edecek ezik, kırık,
                                    ambalajı yırtık vs. hasarlı ve ayıplı ürün/ürünleri kargo şirketinden teslim almayacaktır.
                                    ALICI tarafından Kargo şirketinden tutanak tutturulmaksızın teslim alınan ürün/ürünlerin
                                    hasarsız ve sağlam olduğu kabul edilecektir. Teslimden sonra ürün/ürünlerin özenle
                                    korunması borcu, ALICI&apos;NIN yükümlülüğündedir.
                                </li>
                                <li>
                                    İş bu sözleşmenin imzalandığı tarihte mevcut olmayan ve olması öngörülemeyen, her iki
                                    tarafın da kusuru olmaksızın meydana gelen ve tarafların iş bu sözleşme kapsamında
                                    kendilerine yüklenen yükümlülükleri yerine getirmelerini veya zamanında yerine
                                    getirmelerini engelleyen durumlar, örneğin savaş hali, doğal afetler, grev, lokavt, mevzuat
                                    değişikliği kapsamında ürün/ürünlerin ithalatına getirilen engelleme halleri, grev, lokavt vs.
                                    haller mücbir sebep olarak kabul edilecektir. Mücbir sebebe maruz kalan taraf derhal karşı
                                    tarafı yazılı olarak bilgilendirecek ve mücbir sebep devam ettiği müddetçe iş bu sözleşme
                                    kapsamındaki yükümlülüklerini yerine getirmemekten dolayı sorumlu tutulmayacaktır.
                                    Mücbir sebep hali 30 günden fazla devam ederse, tarafların sözleşmeyi tek taraflı fesih hakkı
                                    bulunacaktır.
                                </li>
                                <li>
                                    İnternet sitesi aracılığıyla satışa sunulan ürün/ürünlerin stokta bulunmaması
                                    muhtemeldir. Ürün/ürünler gerekli görüldüğü takdirde üretilmektedir. ALICI tarafından
                                    sipariş edilen ve stokta bulunmayan ürün/ürünlerin birtakım sebeplerle üretiminin mümkün
                                    olmaması halinde iş bu durum SATICI tarafından ALICI&apos;YA e-posta veya telefon aracılığıyla
                                    bildirilecek olup, ürün/ürünler için ALICI tarafından ödenmiş bulunan tüm bedel, siparişe
                                    ilişkin ödemenin kredi kartı ile yapılmış olması halinde kredi kartına, havale/EFT yolu ile
                                    yapılmış olması halinde ilgili banka hesabına yapılacaktır.
                                </li>
                                <li>Siparişleriniz anlaşmalı kargo şirketleri ile sigortalı olarak gönderilmektedir</li>
                                <li>
                                    Taraflar, ALICI&apos;NIN beyanını içeren SATICI kayıtlarının, (bu kayıtlar telefon
                                    görüşmesi, internet kayıtları vs. olacaktır) taraflar için bağlayıcı delil sayılacağı hususunda
                                    mutabıktırlar.
                                </li>
                                <li>
                                    Ürün fiyatlarının sistem veya yazılım kaynaklı oluşabilecek hatalardan ve değerinin çok
                                    altında düşük fiyattan satılması durumunda SATICI siparişin iptal hakkını saklı tutar ve bu
                                    siparişlerde sorumluluğu bulunmayacaktır.
                                </li>
                            </ol>
                            <h6>MADDE 6. ALICININ HAK VE YÜKÜMLÜLÜKLERİ</h6>
                            <ol className="siteInfo">
                                <li>Alıcı, sözleşmede kendisine yüklenen edimleri mücbir sebepler dışında eksiksiz yerine getirmeyi kabul ve taahhüt eder.</li>
                                <li>Alıcı, sipariş vermekle birlikte iş sözleşme hükümlerini kabul etmiş sayıldığını ve sözleşmede belirtilen ödeme şekline uygun ödemeyi yapacağını kabul ve taahhüt eder.</li>
                                <li>Alıcı, www.bizleal.com sitesinden satıcının isim, unvan, açık adres, telefon ve diğer erişim bilgileri , satışa konu malın temel nitelikleri, vergiler dahil olmak üzere satış fiyatı , ödeme sekli, teslimat koşulları ve masrafları vs. satışa konu mal ile ilgili tüm ön bilgiler ve “cayma” hakkının kullanılması ve bu hakkın nasıl kullanılacağı , şikayet ve itirazlarını iletebilecekleri resmi makamlar vs. konusunda açık , anlaşılır ve internet ortamına uygun şekilde bilgi sahibi olduğunu bu ön bilgileri elektronik ortamda teyit ettiğini kabul ve beyan eder.</li>
                                <li>Bir önceki maddeye bağlı olarak Alıcı, ürün sipariş ve ödeme koşullarının, ürün kullanım talimatlarının , olası durumlara karşı alınan tedbirlerin ve yapılan uyarıların olduğu www.bizleal.com  sipariş/ödeme/kullanım prosedürü bilgilerini okuyup bilgi sahibi olduğunu ve elektronik ortamda gerekli teyidi verdiğini beyan eder.</li>
                                <li>Alıcı, aldığı ürünü iade etmek istemesi durumunda ne surette olursa olsun ürüne ve ambalajına zarar vermemeyi, iade anında fatura aslını ve irsaliyesini iade etmeyi kabul ve taahhüt eder.</li>
                            </ol>
                            <h6>MADDE 7. ÜRUN İADE VE CAYMA HAKKINA İLİŞKİN PROSEDÜRÜ</h6>
                            <p>Ürün İade:</p>
                            <p className="siteInfo">
                                Alıcı malı teslim aldıktan sonra yedi gün içerisinde herhangi bir gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına
                                sahiptir.385 sayılı vergi usul kanunu genel tebliği uyarınca iade işlemlerinin yapılabilmesi için alıcının  mal ile birlikte teslim edilen satıcıya
                                ait 2 adet faturanın alt kısmındaki iade bölümlerini eksiksiz ve doğru şekilde doldurduktan sonra imzalayarak bir nüshasını
                                ürün ile birlikte satıcıya göndermesi diğer nüshasını da uhdesinde tutması gerekmektedir.
                                Cayma hakkı süresi alıcıya malın teslim edildiği günden itibaren başlar. İade edilen ürün veya ürünlerin geri gönderim bedeli alıcı tarafından karşılanmalıdır.
                                <br />
                                <br />
                                Alıcının istekleri ve/veya açıkça onun kişisel ihtiyaçları doğrultusunda hazırlanan mallar için cayma hakkı söz konusu değildir.
                                <br />
                                <br />
                                Alıcının cayma hakkını kullanması halinde satıcı, cayma bildirimini içeren faturanın ürünle birlikte kendisine ulaşmasından itibaren en geç on gün içerisinde
                                almış olduğu toplam bedeli ve varsa tüketiciyi borç altına sokan her türlü belgeyi tüketiciye hiçbir masraf yüklemeden iade edecektir.
                                <br />
                                <br />
                                Teslim alınmış olan malın değerinin azalması veya iadeyi imkânsız kılan bir nedenin varlığı cayma hakkının kullanılmasına engel değildir.
                                Ancak değer azalması veya iadenin imkânsızlaşması tüketicinin kusurundan kaynaklanıyorsa satıcıya malın değerini veya değerindeki azalmayı tazmin etmesi gerekir.
                                <br />
                                <br />
                                Sehven alınan her ürün için de genel iade süresi 7 gündür. Bu süre içerisinde, Ambalajı açılmış, kullanılmış, tahrip edilmiş vesaire şekildeki ürünlerin
                                iadesi kabul edilmez. İade, orijinal ambalaj ile yapılmalıdır.
                                <br />
                                <br />
                                Sehven alınan üründe ve ambalajında herhangi bir açılma, bozulma, kırılma, tahrip, yırtılma, kullanılma ve sair durumlar tespit edildiği hallerde ve
                                ürünün alıcıya teslim edildiği andaki hali ile iade edilememesi durumunda ürün iade alınmaz ve bedeli iade edilmez.
                                <br />
                                <br />
                                Ürün iadesi için, durum öncelikli olarak müşteri hizmetlerine iletilmelidir. Ürünün iade olarak gönderilme bilgisi, satıcı tarafından müşteriye iletilir.
                                Bu görüşmeden sonra ürün iade ile ilgili bilgileri içeren fatura ile birlikte alıcı adresine teslimatı yapan Kargo şirketi kanalıyla satıcıya ulaştırmalıdır.
                                Satıcıya ulaşan iade ürün iş bu sözleşmede belirtilen koşulları sağladığı takdirde iade olarak kabul edilir, geri ödemesi de alıcı kredi kartına/hesabına yapılır.
                                Ürün iade edilmeden bedel iadesi yapılmaz. Kredi Kartına yapılan iadelerin kredi kartı hesaplarına yansıma süresi ilgili bankanın tasarrufundadır.
                                <br />
                                <br />
                                Alışveriş kredi kartı ile ve taksitli olarak yapılmışsa, kredi kartına iade prosedürü şu şekilde uygulanacaktır:
                                Alıcı ürünü kaç taksit ile satın alma talebini iletmiş ise, Banka alıcıya geri ödemesini taksitle yapmaktadır.
                                Satıcı,bankaya ürün bedelinin tamamını tek seferde ödedikten sonra, Banka poslarından yapılan taksitli harcamaların alıcının
                                kredi kartına iadesi durumundakonuya müdahil tarafların mağdur duruma düşmemesi için talep edilen iade tutarları,yine taksitli olarak hamil taraf hesaplarına Banka tarafından aktarılır.
                                Alıcının satış iptaline kadar ödemiş olduğu taksit tutarları, eğer iade tarihi ile kartın hesap kesim tarihleri çakışmazsa her ay karta 1(bir) iade yansıyacak ve alıcı iade öncesinde
                                ödemiş olduğu taksitleri satışın taksitleri bittikten sonra, iade öncesinde ödemiş olduğu taksit sayısı kadar ay daha alacak ve mevcut borçlarından düşmüş olacaktır.
                                <br />
                                <br />
                                Kart ile alınmış mal ve hizmetin iadesi durumunda satıcı, Banka ile yapmış olduğu sözleşme gereği alıcıya nakit para ile ödeme yapamaz.
                                Üye işyeri yani satıcı, bir iade işlemi söz konusu olduğunda ilgili yazılım aracılığı ile iadesini yapacak olup, üye işyeri yani satıcı ilgili tutarı
                                Bankaya nakden veya mahsuben ödemekle yükümlü olduğundan yukarıda detayları belirtilen prosedür gereğince alıcıya nakit olarak ödeme yapılamamaktadır.
                                Kredi kartına iade, alıcının Bankaya bedeli tek seferde ödemesinden sonra, Banka tarafından yukarıdaki prosedür gereğince yapılacaktır.
                            </p>

                            <h6>MADDE 8. GARANTİ</h6>
                            <p className="siteInfo">
                                Kullanma talimatına uygun şekilde kullanılan ve temizliği yapılan ürünler her türlü üretim hatasına karşı aşağıda belirtilen şartlar dahilinde 2 yıl garantilidir:  Satıcının garanti sorumluluğu yalnızca 4077 sayılı kanun kapsamına giren tüketiciler için geçerlidir. Ticari nitelikteki işler için Türk Ticaret Kanununu hükümleri geçerli olacaktır.
                            </p>
                            <h6>MADDE 9. GİZLİLİK</h6>
                            <p className="siteInfo">
                                Alıcı tarafından iş bu sözleşmede belirtilen bilgiler ile ödeme yapmak amacı ile satıcıya bildirdiği bilgiler satıcı tarafından 3. şahıslarla paylaşılmayacaktır.
                                Satıcı bu bilgileri sadece idari/ yasal zorunluluğun mevcudiyeti çerçevesinde açıklayabilecektir. Araştırma ehliyeti belgelenmiş her türlü adli soruşturma dahilinde satıcı kendisinden istenen bilgiyi elinde bulunduruyorsa ilgili makama sağlayabilir.
                            </p>
                            <p className="siteInfo">
                                Kredi Kartı bilgileri kesinlikle saklanmaz,Kredi Kartı bilgileri sadece tahsilat işlemi sırasında ilgili bankalara güvenli bir şekilde iletilerek provizyon alınması için kullanılır ve provizyon sonrası sistemden silinir.
                                Alıcıya ait e-posta adresi, posta adresi ve telefon gibi bilgiler yalnızca satıcı tarafından standart ürün teslim ve bilgilendirme prosedürleri için kullanılır. Bazı dönemlerde kampanya bilgileri, yeni ürünler hakkında bilgiler, promosyon bilgileri alıcıya onayı sonrasında gönderilebilir.
                            </p>
                            <h6>MADDE 10. YETKİLİ MAHKEME</h6>
                            <p className="siteInfo">
                                İş bu sözleşmeden kaynaklanabilecek ihtilaflarda, İstanbul mahkemeleri ve icra daireleri
                                yetkilidir.
                                Tüketici sorunları hakem heyetlerinin kararlarının bağlayıcı olacağına ilişkin üst veya tüketici
                                mahkemelerinde delil olacağına ilişkin alt parasal sınır;
                                {' '}
                                <br />
                                6502 SAYILI TÜKETİCİNİN
                                KORUNMASI HAKKINDA KANUNUN 68 İNCİ VE TÜKETİCİ HAKEM HEYETLERİ
                                YÖNETMELİĞİNİN 6 NCI MADDELERİNDE YER ALAN PARASAL SINIRLAR her yıl
                                Gümrük ve Ticaret bakanlığının yayınladığı tebliğ ile belirlenir.
                                <br />
                                1.1.2012 tarihinden itibaren geçerli olmak üzere:
                                <br />
                                * 4077 sayılı Tüketicinin Korunması Hakkında Kanun&apos;un değişik 22. maddesinin 5 ve 6.
                                fıkrasındaki tüketici sorunları hakem heyetlerinin kararlarının bağlayıcı olacağına ilişkin üst
                                veya tüketici mahkemelerinde delil olacağına ilişkin alt parasal sınır 1.161,67 TL,
                                <br />
                                * 1.8.2003 tarihli ve 25186 sayılı Resmî Gazete &apos;de yayımlanan Tüketici Sorunları Hakem
                                Heyetleri Yönetmeliği&apos;nin 5 inci maddesinin üçüncü fıkrasında, büyükşehir statüsünde
                                bulunan illerde faaliyet gösteren il hakem heyetlerinin uyuşmazlıklara bakmakla görevli ve
                                yetkili olmalarına ilişkin alt parasal sınır 3.032,65 TL&apos;dir. İş bu Ön Bilgilendirme ticarî
                                amaçlarla yapılmaktadır.
                            </p>
                            <strong>Satıcı:</strong>
                            <br />
                            {theme.company.name}

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

const mapStateToProps = (state) => ({
    address: state.profile.address,
});

export default connect(mapStateToProps, null)(SitePageContracts);
